import { useSwan } from '../../store/useSwan.js'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'

export function DiamondBox() {
  let baseURL = useSwan((r) => r.baseURL)
  let glb = useGLTF(`${baseURL}/geometry/box.glb`)
  glb.scene = glb.scene.clone(true)

  let geo = false
  glb.scene.traverse((it) => {
    if (it.geometry && !geo) {
      geo = it.geometry
    }
  })

  let ball = useRef()
  useFrame((st, dt) => {
    //
    ball.current.rotation.y += 1.1 * dt

    //
    ball.current.scale.setScalar(1.0 + 0.25 * Math.sin(st.clock.elapsedTime * 3.0))
  })

  return (
    <>
      <group
        onClick={() => {
          useSwan.setState({ openOverlay: !useSwan.getState().openOverlay })
        }}
      >
        <mesh ref={ball} geometry={geo}>
          {/* <MeshTransmissionMaterial
            transmission={1}
            thickness={1.0}
            roughness={0.3}
            color={"#ffffff"}
            attenuationDistance={5}
            attenuationColor={"#ff00ff"}
            metalness={0.0}
            reflectivity={0.5}
            chromaticAberration={0.0}
            transmissionSampler
            temporalDistortion={0.5}
          ></MeshTransmissionMaterial> */}

          <meshStandardMaterial
            // transmission={1}
            // thickness={1.0}
            roughness={0.15}
            color={'#0000ff'}
            // attenuationDistance={5}
            // attenuationColor={"#0000ff"}
            metalness={1}
            // reflectivity={0.5}
            // chromaticAberration={0.0}
            // transmissionSampler
            // temporalDistortion={0.5}
          ></meshStandardMaterial>

          {/*  */}
        </mesh>
      </group>
    </>
  )
}

//

//

//

//

//
