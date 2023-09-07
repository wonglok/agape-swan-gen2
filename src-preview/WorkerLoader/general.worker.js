import 'es-module-shims'
import * as React from 'react'
import ReactReconciler from 'react-reconciler'

self['react'] = React
self['React'] = React
self.Globals = self.Globals || {}

// function traceWrap(hostConfig) {
//   let traceWrappedHostConfig = {}
//   Object.keys(hostConfig).map((key) => {
//     const func = hostConfig[key]
//     traceWrappedHostConfig[key] = (...args) => {
//       console.trace(key)
//       return func(...args)
//     }
//   })
//   return traceWrappedHostConfig
// }

const rootHostContext = {}
const childHostContext = {}

const getID = () => {
  return '_' + Math.random().toString(36).slice(2, 9)
}

let elMap = new Map()
export const getEl = ({ type = 'empty', newProps = {} }) => {
  let key = getID()

  const enigma = {
    id: key,
    type,
    props: {
      ...newProps,
      key: key,
    },
    children: [],
    removeChild: (child) => {
      enigma.children.findIndex((r) => r === child)
      enigma.children.splice(index, 1)
    },
    appendChild: (child) => {
      enigma.children.push(child)
    },
    getJSON: () => {
      let props = {}
      for (let kn in enigma.props) {
        if (kn === 'children') {
          props[kn] = enigma.children.map((r) => r.getJSON())
        } else {
          props[kn] = enigma.props[kn]

          if (!props[kn] && kn === 'args') {
            delete props[kn]
          }
          if (props[kn] && typeof props[kn] === 'function') {
            delete props[kn]
          }
        }
      }

      return {
        type,
        props,
        children: enigma.children.map((r) => r.getJSON()),
      }
    },
  }

  elMap.set(key, enigma)
  return enigma
}

const hostConfig = {
  now: performance.now,
  getRootHostContext: () => {
    return rootHostContext
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext
  },
  getPublicInstance: (instance) => {
    return instance
  },
  detachDeletedInstance: () => {},
  shouldSetTextContent: (type, props) => {
    // return typeof props.children === 'string' || typeof props.children === 'number'
  },
  /**
    This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    let domElement = getEl({ type, newProps })
    return domElement
  },
  createTextInstance: (text) => {
    return getEl({ type: 'text', newProps: { text } })
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child)
  },
  appendChild(parent, child) {
    parent.appendChild(child)
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child)
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName]

      domElement.props[propName] = propValue

      console.log(propName, propValue)
    })
    //
    dispatchEvent(new CustomEvent('renderer-commit-update', { detail: domElement.getJSON() }))
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.props.text = newText
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  },
  clearContainer: () => {},
}

const ReactReconcilerInst = ReactReconciler(hostConfig) //traceWrap(hostConfig))

const renderSwan = (reactElement, domElement, callback) => {
  // Create a root Container if it doesnt exist
  if (!domElement._rootContainer) {
    domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false)
  }

  // update the root Container
  return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback)
}

addEventListener('message', async ({ data }) => {
  if (data.action === 'initLoad') {
    let loadGlobals = async ({ globals: array }) => {
      let res = array
        .filter((r) => {
          return r.needs
        })
        .map(async (r) => {
          let name = r.name

          // if (!window.Globals[name] && name === "agape-sdk") {
          //   window.Globals["agape-sdk"] = await import("agape-sdk");
          // }
          if (!self.Globals[name] && name === 'react') {
            self.Globals['react'] = await import('react')
          }
          if (!self.Globals[name] && name === 'three') {
            self.Globals['three'] = await import('three')
          }
          if (!self.Globals[name] && name === 'zustand') {
            self.Globals['zustand'] = await import('zustand')
          }
          if (!self.Globals[name] && name === '@react-three/fiber') {
            self.Globals['@react-three/fiber'] = await import('@react-three/fiber')
          }
          if (!self.Globals[name] && name === '@react-three/drei') {
            self.Globals['@react-three/drei'] = await import('@react-three/drei')
          }
          if (!self.Globals[name] && name === '@react-three/postprocessing') {
            self.Globals['@react-three/postprocessing'] = await import('@react-three/postprocessing')
          }
          if (!self.Globals[name] && name === '@react-three/xr') {
            self.Globals['@react-three/xr'] = await import('@react-three/xr')
          }
          if (!self.Globals[name] && name === 'three-stdlib') {
            self.Globals['three-stdlib'] = await import('three-stdlib')
          }
        })

        .map((r) => {
          r.catch((err) => {
            console.log(err)
          })
          return r
        })

      await Promise.all(res)
    }

    await self.importShim(`${data.preloadURL}`).then(async (Engine) => {
      return await Engine.preload({ loadGlobals })
    })

    //
    await self.importShim(`${data.workerURL}`).then(async (WorkerEngine) => {
      let rootElement = getEl({ type: 'root', newProps: {} })

      postMessage({ action: 'doneInitLoad' })

      let eventNames = [
        'onPointerDown',
        'onPointerUp',
        'onPointerMove',
        'onPointerCancel',
        'onPointerEnter',
        'onPointerLeave',
        'onPointerOut',
        'onPointerOver',
      ]
      addEventListener('message', ({ data }) => {
        let { action, result } = data

        eventNames.forEach((name) => {
          if (action === name) {
            let el = elMap.get(result.key)
            if (el?.props[name]) {
              el?.props[name](result)
            }
          }
        })
      })

      addEventListener('renderer-commit-update', ({ detail }) => {
        postMessage({ action: 'renderer-commit-update', result: detail })
      })

      //

      let rAFID = 0
      let rAF = () => {
        rAFID = requestAnimationFrame(rAF)
        let arrLength = 0
        elMap.forEach((r) => {
          if (r.needsSync) {
            arrLength += 1
          }
        })

        // arr.forEach((it) => {
        //   postMessage({ action: 'renderer-commit-update', result: it.getJSON() })
        // })

        if (arrLength > 0) {
          let tree = rootElement.getJSON()
          postMessage({ action: 'leaf', result: tree })
        }
      }
      rAFID = requestAnimationFrame(rAF)

      let sync = () => {
        renderSwan(WorkerEngine.getRoot(), rootElement, () => {
          let tree = rootElement.getJSON()
          postMessage({ action: 'tree', result: tree })
        })
      }
      sync()
    })
  }
})

// importScripts()
