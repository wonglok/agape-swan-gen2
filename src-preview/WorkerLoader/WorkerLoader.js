import { useEffect, useRef, useState } from 'react'
import Worker from './general.worker.js'
import EventEmitter from 'events'

export function WorkerLoader({ baseURL, swanPath, socketURL }) {
  //
  let [o3d, setO3D] = useState(null)
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
          //
          action: 'initLoad',
          baseURL: baseURL,
          workerURL: workerURL,
          preloadURL: preloadURL,
        })

        let onDone = () => {
          bus.removeListener('doneInitLoad', onDone)
          setAPIs({ worker: newWorker, bus })
        }
        bus.addListener('doneInitLoad', onDone)

        cleanUpStuff()
        cleanUpStuff = () => {
          bus.removeAllListeners()
          newWorker.terminate()
          cleanUpStuff = () => {}
        }
      })
    }
    load()

    if (socketURL) {
      Promise.resolve().then(async () => {
        let io = await import('socket.io-client').then((r) => r.io)
        let socket = io(`${socketURL}`, {})

        socket.on('reload', (ev) => {
          load()
        })
      })
    }

    //
    return () => {
      cleanUpStuff()
    }
  }, [])

  useEffect(() => {
    if ([bus, worker, swanPath, baseURL].some((r) => !r)) {
      return
    }

    let WalkNode = ({ node }) => {
      let kids = () => {
        return node?.children?.map((r) => {
          return <WalkNode key={r.props.key} node={r}></WalkNode>
        })
      }

      let ref = useRef()

      useEffect(() => {
        //
        let hm = ({ data: { action, result } }) => {
          if (action === 'renderer-commit-update' && result?.props?.key === node?.props?.key) {
            if (ref.current && ref.current.rotation && result?.props?.rotation) {
              ref.current.rotation.fromArray(result?.props?.rotation)
            }
            if (ref.current && ref.current.position && result?.props?.position) {
              ref.current.position.fromArray(result?.props?.position)
            }
            if (ref.current && ref.current.scale && result?.props?.scale) {
              ref.current.scale.fromArray(result?.props?.scale)
            }
          }
        }
        worker.addEventListener('message', hm)

        return () => {
          worker.removeEventListener('message', hm)
        }
      }, [])
      console.log(node.type)
      return (
        <>
          {node?.type === 'root' && (
            <group ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'group' && (
            <group ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'object3d' && (
            <group ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'mesh' && (
            <mesh ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </mesh>
          )}
          {node?.type === 'sphereGeometry' && (
            <sphereGeometry ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </sphereGeometry>
          )}

          {node?.type === 'boxGeometry' && (
            <boxGeometry ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </boxGeometry>
          )}

          {node?.type === 'meshBasicMaterial' && (
            <meshBasicMaterial ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </meshBasicMaterial>
          )}
          {node?.type === 'meshStandardMaterial' && (
            <meshStandardMaterial ref={ref} userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </meshStandardMaterial>
          )}
        </>
      )
    }

    bus.on('tree', ({ result }) => {
      console.log(result)
      setO3D(<WalkNode key={'myroot'} node={result}></WalkNode>)
    })

    //
    return () => {
      //
    }
  }, [bus, worker, swanPath, baseURL])

  return (
    <>
      <group
        onPointerDown={(ev) => {
          worker.postMessage({
            action: 'onPointerDown',
            result: {
              point: ev.point,
              key: ev?.object?.userData?.key,
            },
          })
        }}
      >
        {o3d}
      </group>
    </>
  )
}
