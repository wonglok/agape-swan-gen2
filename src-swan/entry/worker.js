import { useRef, useState } from 'react'
import { useWorker } from '../store/useWorker'

export const BoxRoot = () => {
  let [yo, setYo] = useState(0)
  let onLoop = useWorker((r) => r.onLoop)

  onLoop((_, dt) => {
    setYo((r) => r + 1 * dt)
  })

  return (
    <>
      <group rotation={[0, yo, 0]} position={[0, 0, 0]}>
        <mesh
          onPointerDown={(ev) => {
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

function App() {
  let [action, setAction] = useState('float')

  return (
    <>
      <group
        onPointerDown={(ev) => {
          console.log(ev)
        }}
        // onPointerLeave={(ev) => {
        //   console.log(ev)
        // }}
      >
        <gltf src={`/avatar/loklok-modern.glb`}>
          <animations
            activeAction={action}
            libs={[
              {
                name: 'float',
                src: `/avatar/rpm/rpm-actions-locomotion/swim-forward.fbx`,
                playClips: [0],
              },
              {
                name: 'salute',
                src: `/avatar/rpm/rpm-actions-emoji/salute.fbx`,
                playClips: [0],
              },
            ]}
          ></animations>
          <aiface></aiface>
        </gltf>
      </group>

      <group
        onPointerDown={(ev) => {
          //
          if (action === 'float') {
            setAction('salute')
          } else if (action === 'salute') {
            setAction('float')
          }
        }}
        position={[-1, 0, 0]}
      >
        <BoxRoot />
      </group>
    </>
  )
}
export const getRoot = () => {
  return (
    <group>
      <App></App>
    </group>
  )
}
