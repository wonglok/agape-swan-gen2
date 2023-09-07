import { useGLTF } from '@react-three/drei'
import { createPortal } from '@react-three/fiber'

export function MyGLB({ src, children }) {
  let glb = useGLTF(src)
  glb.scene.userData.gltfCompos = true
  return (
    <>
      {createPortal(children, glb.scene)}
      <primitive object={glb.scene}></primitive>
    </>
  )
}
