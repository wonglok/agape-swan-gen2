import { useEffect, useMemo, useRef, useState } from 'react'
import { FBXLoader } from 'three-stdlib'
import { AnimationMixer } from 'three'
import { useFrame } from '@react-three/fiber'

export function MyAnimations({ libs, activeAction, children }) {
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
    if (!activeAction) {
      return
    }

    Promise.resolve().then(async () => {
      ref.current.traverse((it) => {
        console.log(it)
      })

      let mixer = new AnimationMixer(ref.current)
      setMixer(mixer)

      actionsLib
        .map((lib) => {
          lib.clippedActions = lib.clips.map((clip) => {
            return mixer.clipAction(clip, ref.current)
          })
          return lib
        })
        .forEach((lib) => {
          if (lib.name === activeAction) {
            lib.clippedActions.forEach((act) => {
              act.reset().play()
            })
          } else {
            lib.clippedActions.forEach((act) => {
              act.reset().stop()
            })
          }
        })
    })

    return () => {}
  }, [actionsLib, activeAction])
  return <group ref={ref}>{children}</group>
}
