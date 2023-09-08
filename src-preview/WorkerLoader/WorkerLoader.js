import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Worker from './general.worker.js'
import { getEventEmitter } from './getEventEmitter.js'
import { RuntimeRecursive } from './RuntimeRecursive/RuntimeRecursive.js'

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
        let bus = getEventEmitter()
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
          newWorker.terminate()
          cleanUpStuff = () => {}
        }
      })
    }
    load()

    let cleanSocket = () => {}
    if (socketURL && process?.env?.NODE_ENV === 'development') {
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

    bus.on('tree', ({ result }) => {
      setO3D(
        <Suspense fallback={null}>
          <RuntimeRecursive key={'myroot'} bus={bus} node={result}></RuntimeRecursive>
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
