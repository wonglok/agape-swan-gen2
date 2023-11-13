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
          setAPIs({ worker: newWorker, bus })
          bus.off('doneInitLoad', onDone)
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
      setO3D(<AppTree bus={bus} nodeRoot={result}></AppTree>)
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

function AppTree({ bus, nodeRoot }) {
  let [root, setRoot] = useState(nodeRoot)
  useEffect(() => {
    if (!bus) {
      return
    }

    let walk = (me, fnc) => {
      fnc(me)
      if (me.children) {
        me.children.forEach((child) => {
          walk(child, fnc)
        })
      }
    }
    let hh = ({ result }) => {
      walk(nodeRoot, (node) => {
        result.forEach((item) => {
          if (item.props.key === node.props.key) {
            node.props = item.props
          }
        })
      })

      setRoot({
        ...nodeRoot,
      })
    }
    bus.on('renderer-commit-update-batch', hh)
    return () => {
      bus.off('renderer-commit-update-batch', hh)
    }
  }, [nodeRoot, bus])

  return (
    <Suspense fallback={null}>
      <RuntimeRecursive key={'myroot'} node={root}></RuntimeRecursive>
    </Suspense>
  )
}
