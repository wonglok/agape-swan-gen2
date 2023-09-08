import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Worker from './general.worker.js'
import EventEmitter from 'events'
import { MyAnimations } from './MyAnimations.js'
import { MyGLB } from './MyGLB.js'
import { AISpeakFace } from './AISpeakFace/AISpeakFace.js'

export function WorkerLoader({ baseURL, swanPath, socketURL }) {
  //
  let [o3d, setO3D] = useState(null)
  //
  let [{ worker, bus }, setAPIs] = useState({ worker: false, bus: false })

  useEffect(() => {
    if (!baseURL) {
      console.error('need baseURL')
      return
    }
    if (!swanPath) {
      console.error('need swanPath')
      return
    }
    let workerURL = `${baseURL}/${swanPath}/worker.module.js`
    let preloadURL = `${baseURL}/${swanPath}/preload.module.js`

    let cleanUpStuff = () => {}
    let load = () => {
      Promise.resolve().then(async () => {
        let newWorker = new Worker()
        let bus = new EventEmitter()
        newWorker.onmessage = ({ data }) => {
          bus.emit(data.action, data)
        }

        newWorker.postMessage({
          action: 'initLoad',
          baseURL: baseURL,
          workerURL: workerURL,
          preloadURL: preloadURL,
        })

        let onDone = () => {
          bus.off('doneInitLoad', onDone)
          setAPIs({ worker: newWorker, bus })
        }
        bus.on('doneInitLoad', onDone)

        cleanUpStuff()
        cleanUpStuff = () => {
          bus.removeAllListeners()
          newWorker.terminate()
          cleanUpStuff = () => {}
        }
      })
    }
    load()

    let cleanSocket = () => {}
    if (socketURL) {
      Promise.resolve().then(async () => {
        let io = await import('socket.io-client').then((r) => r.io)
        let socket = io(`${socketURL}`, {})

        socket.on('reload', (ev) => {
          load()
        })
        cleanSocket = () => {
          socket.close()
        }
      })
    }

    return () => {
      cleanSocket()
      cleanUpStuff()
    }
  }, [])

  useEffect(() => {
    if ([bus, worker, swanPath, baseURL].some((r) => !r)) {
      return
    }

    let WalkNode = ({ node }) => {
      let [nodeProps, setNodeProps] = useState(node.props)
      let kids = () => {
        return node?.children?.map((r) => {
          return <WalkNode key={r.props.key} node={r}></WalkNode>
        })
      }

      useEffect(() => {
        if (!bus) {
          return
        }
        let hh = ({ result }) => {
          result.forEach((item) => {
            if (item.props.key === node.props.key) {
              setNodeProps(item.props)
            }
          })
        }
        bus.on('renderer-commit-update-batch', hh)
        return () => {
          bus.off('renderer-commit-update-batch', hh)
        }
      }, [node, bus])

      let ref = useRef()
      return (
        <>
          {node?.type === 'gltf' && (
            <MyGLB key={nodeProps.key} userData={{ key: nodeProps.key, gltfCompos: true }} {...(nodeProps || {})}>
              {kids()}
            </MyGLB>
          )}

          {node?.type === 'aiface' && (
            <AISpeakFace key={nodeProps.key} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </AISpeakFace>
          )}

          {node?.type === 'animations' && (
            <MyAnimations key={nodeProps.key} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </MyAnimations>
          )}

          {node?.type === 'root' && (
            <group ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'group' && (
            <group ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'object3d' && (
            <group ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'mesh' && (
            <mesh ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </mesh>
          )}
          {node?.type === 'sphereGeometry' && (
            <sphereGeometry ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </sphereGeometry>
          )}

          {node?.type === 'boxGeometry' && (
            <boxGeometry ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </boxGeometry>
          )}

          {node?.type === 'meshBasicMaterial' && (
            <meshBasicMaterial ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </meshBasicMaterial>
          )}

          {node?.type === 'meshStandardMaterial' && (
            <meshStandardMaterial ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
              {kids()}
            </meshStandardMaterial>
          )}
        </>
      )
    }

    bus.on('tree', ({ result }) => {
      setO3D(
        <Suspense fallback={null}>
          <WalkNode key={'myroot'} node={result}></WalkNode>
        </Suspense>,
      )
    })

    return () => {
      //
    }
  }, [bus, worker, swanPath, baseURL])

  let eventHandlers = useMemo(() => {
    let eventHandlers = {}

    {
      ;[
        'onClick',
        'onPointerDown',
        'onPointerUp',
        'onPointerMove',
        'onPointerCancel',
        'onPointerEnter',
        'onPointerLeave',
        'onPointerOut',
        'onPointerOver',
      ].forEach((name) => {
        eventHandlers[name] = (ev) => {
          let keys = []

          ev?.object?.traverseAncestors((it) => {
            if (it?.userData?.key) {
              keys.push(it.userData.key)
            }
          })

          worker.postMessage({
            action: name,
            result: {
              type: name,
              key: ev?.object?.userData?.key,
              keys,
              name: ev?.object?.name,
              uuid: ev?.object?.uuid,
              point: ev.point,
            },
          })
        }
      })
    }

    return eventHandlers
  })
  return (
    <>
      <group {...eventHandlers}>{o3d}</group>
    </>
  )
}
