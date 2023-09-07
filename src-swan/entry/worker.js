import { useEffect, useRef, useState } from 'react'
import { Clock } from 'three'

export const useMyFrame = (fnc) => {
  useEffect(() => {
    let clock = new Clock()
    let rafID = 0

    let hh = () => {
      rafID = requestAnimationFrame(hh)
      fnc(clock.getDelta())
    }
    rafID = requestAnimationFrame(hh)

    return () => {
      cancelAnimationFrame(rafID)
    }
  }, [])
}

export const BoxRoot = () => {
  let ref = useRef()

  useMyFrame((dt) => {
    if (ref.current) {
      ref.current.needsSync = true
      ref.current.props.rotation = ref.current.props.rotation || [0, 0, 0]
      ref.current.props.rotation[1] += 0.5 * dt
    }
  })

  return (
    <>
      <group ref={ref} position={[0, 0, 0]}>
        <mesh
          onPointerDown={(ev) => {
            //
            console.log(ev)
          }}
          onPointerEnter={(ev) => {
            //
            console.log(ev)
          }}
          rotation={[0, 0, 0]}
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
  return (
    <group>
      <group
        onPointerDown={(ev) => {
          //
          console.log(ev)
        }}
        onPointerEnter={(ev) => {
          //
          console.log(ev)
        }}
      >
        <gltf src={`/avatar/loklok-modern.glb`}></gltf>
      </group>
      <group position={[1, 0, 0]}>
        <BoxRoot />
      </group>
      <group position={[-1, 0, 0]}>
        <BoxRoot />
      </group>
    </group>
  )
}
