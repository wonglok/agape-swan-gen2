import { useEffect, useState } from 'react'
import Worker from './general.worker.js'
import EventEmitter from 'events'

export function WorkerLoader({ baseURL, swanPath }) {
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

      cleanUpStuff = () => {
        bus.removeAllListeners()
        newWorker.terminate()
      }
    })

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

      console.log(node.type)
      return (
        <>
          {node?.type === 'root' && (
            <group userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'group' && (
            <group userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'object3d' && (
            <group userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </group>
          )}

          {node?.type === 'mesh' && (
            <mesh userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </mesh>
          )}
          {node?.type === 'sphereGeometry' && (
            <sphereGeometry userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </sphereGeometry>
          )}

          {node?.type === 'boxGeometry' && (
            <boxGeometry userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </boxGeometry>
          )}

          {node?.type === 'meshBasicMaterial' && (
            <meshBasicMaterial userData={{ key: node.props.key }} {...(node.props || {})}>
              {kids()}
            </meshBasicMaterial>
          )}
          {node?.type === 'meshStandardMaterial' && (
            <meshStandardMaterial userData={{ key: node.props.key }} {...(node.props || {})}>
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
