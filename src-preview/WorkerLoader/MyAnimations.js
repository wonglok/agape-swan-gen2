import { useEffect, useMemo, useRef, useState } from 'react'
import { FBXLoader } from 'three-stdlib'
import { AnimationMixer } from 'three'
import { useFrame } from '@react-three/fiber'

export function MyAnimations({ libs, activeAction, children, ...props }) {
  let ref = useRef()

  // console.log(activeAction)

  let loader = useMemo(() => new FBXLoader(), [])

  let [actionsLib, setActs] = useState([])

  useEffect(() => {
    let proms = libs.map((lib) => {
      return new Promise((resolve) => {
        loader.load(lib.src, (r) => {
          //

          resolve({
            ...lib,
            clips: r.animations,
          })
        })
      })
    })

    Promise.all(proms).then(async (r) => {
      let res = r
      setActs(res)
    })
  }, [])

  let [mixer, setMixer] = useState(false)
  useFrame((st, dt) => {
    if (mixer) {
      mixer.update(dt)
    }
  })

  useEffect(() => {
    let mixer = new AnimationMixer()
    setMixer(mixer)
  }, [])

  useEffect(() => {
    if (!activeAction) {
      return
    }

    let getParent = ({ o3d }) => {
      return new Promise((resolve) => {
        let tt = 0
        tt = setInterval(() => {
          let target = false
          o3d.traverseAncestors((it) => {
            if (it?.userData?.animationTargetParent) {
              target = it
            }
          })

          if (target) {
            clearInterval(tt)
            resolve(target)
          }
        })
      })
    }

    Promise.resolve().then(async () => {
      let target = await getParent({ o3d: ref?.current })

      actionsLib
        .map((lib) => {
          lib.clippedActions = lib.clips.map((clip) => {
            return mixer.clipAction(clip, target)
          })
          return lib
        })
        .forEach((lib) => {
          if (lib.name === activeAction) {
            lib.clippedActions.forEach((act) => {
              act.reset().fadeIn(0.3).play()
            })
          } else {
            lib.clippedActions.forEach((act) => {
              act.reset().fadeOut(0.3)
            })
          }
        })
    })

    return () => {}
  }, [actionsLib, activeAction])
  return (
    <group {...props} ref={ref}>
      {children}
    </group>
  )
}

//
