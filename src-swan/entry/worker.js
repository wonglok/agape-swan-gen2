import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Clock } from 'three'

export const AppRoot = () => {
  let [rot1, setRot1] = useState(0)
  let ref = useRef()

  useEffect(() => {
    //

    let clock = new Clock()
    let rafID = 0

    let hh = () => {
      rafID = requestAnimationFrame(hh)
      if (ref.current) {
        ref.current.needsSync = true
        ref.current.props.rotation[1] += 0.5 * clock.getDelta()
      }
    }
    rafID = requestAnimationFrame(hh)
  }, [])
  return (
    <>
      <group position={[0, 0, 0]}>
        <mesh
          ref={ref}
          onPointerDown={(ev) => {
            // console.log(ev)
            setRot1((s) => s + 0.11)
          }}
          rotation={[0, rot1, 0]}
          position={[0, 0, 0]}
        >
          <boxGeometry args={[1, 1, 1]}></boxGeometry>
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </mesh>
      </group>
    </>
  )
}

export const getRoot = () => {
  return <AppRoot />
}
