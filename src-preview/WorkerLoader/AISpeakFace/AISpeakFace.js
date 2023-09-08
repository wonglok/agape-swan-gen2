import { useGLTF, Html } from '@react-three/drei'
import { useCallback, useRef, useState } from 'react'
import createAnimation from './dataToClip'
import { AnimationMixer, LoopOnce, Object3D } from 'three'
import { useFrame } from '@react-three/fiber'
// import { useSwan } from '../../../src-swan/store/useSwan'

export function AISpeakFace({ children, ...props }) {
  // let baseURL = useSwan((r) => r.baseURL) || ''
  let loop = useRef({})

  let ref = useRef()
  useFrame((st, dt) => {
    Object.values(loop.current).forEach((it) => {
      it(st, dt)
    })
  })

  let sayDear = useCallback(({ text = 'hi im loklok' }) => {
    fetch(`/api/dear/say`, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((r) => {
        return r.json()
      })
      .then((r) => {
        let audio = document.createElement('audio')
        audio.autoplay = true
        audio.oncanplaythrough = () => {}
        audio.src = r.audioData
        audio.play()

        console.log(r)

        let loadPart = ({ partName = 'Head' }) => {
          let PartFound = false

          let avatarGroup = new Object3D()

          ref.current.traverseAncestors((it) => {
            if (it?.userData?.groupTargetParent) {
              avatarGroup = it
            }
          })

          avatarGroup.traverse((it) => {
            it.frustumCulled = false
            if (it.name.includes(partName) && it.geometry) {
              PartFound = it
            }
          })

          if (!PartFound) {
            console.log(!partName, 'not found')
            return
          }

          if (!PartFound.morphTargetDictionary) {
            return
          }

          let clip = createAnimation(r.blendData, PartFound.morphTargetDictionary, PartFound.name, r.durationMS)

          if (clip && PartFound) {
            let mixer = new AnimationMixer(PartFound.parent)

            loop.current['mixer' + PartFound.name] = (st, dt) => {
              mixer.update(dt)
            }

            let action2 = mixer.clipAction(clip, PartFound)
            action2.setLoop(LoopOnce)
            action2.clampWhenFinished = true
            action2.reset()
            action2.play()
          }
        }

        loadPart({ partName: 'Head' })
        loadPart({ partName: 'Teeth' })
        loadPart({ partName: 'EyeLeft' })
        loadPart({ partName: 'EyeRight' })
      })
  }, [])

  let [text, setSt] = useState(`Good day. How are you? Welcome to Reunite Limited Avatar AI Speech`)

  return (
    <>
      <Html center position={[-1, 1.75, 0]}>
        <div className='bg-white'>
          <textarea
            onInput={(event) => {
              setSt(event.target.value)
            }}
            defaultValue={text}
          ></textarea>
          <button
            onClick={() => {
              sayDear({ text: text })
            }}
            className='bg-gray-200'
          >
            Say!
          </button>
        </div>
      </Html>

      <group {...props} ref={ref}>
        {children}
      </group>
    </>
  )
}
