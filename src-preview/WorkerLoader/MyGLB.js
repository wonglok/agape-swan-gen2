import { useGLTF } from '@react-three/drei'

export function MyGLB({ src }) {
  let glb = useGLTF(src)

  return (
    <>
      <primitive object={glb.scene}></primitive>
    </>
  )
}
