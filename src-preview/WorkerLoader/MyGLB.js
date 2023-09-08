import { useGLTF } from '@react-three/drei'
import { createPortal } from '@react-three/fiber'

export function MyGLB({ src, children }) {
  let glb = useGLTF(src)
  //
  return (
    <>
      <group userData={{ animationTargetParent: true }}>
        {createPortal(children, glb.scene)}
        <primitive object={glb.scene}></primitive>
      </group>
    </>
  )
}
