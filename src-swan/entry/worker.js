import { useState } from 'react'

export const AppRoot = () => {
  let [rot1, setRot1] = useState(0)

  return (
    <>
      <group position={[0, 0, 0]}>
        <mesh
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
