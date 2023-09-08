import { meshBounds, useGLTF } from '@react-three/drei'

export function MyGLB({ src, children, ...props }) {
  let glb = useGLTF(src)

  glb.scene.traverse((it) => {
    console.log(it)
  })

  return (
    <>
      <group {...props} raycast={meshBounds} userData={{ animationTargetParent: true }}>
        {children}
        <primitive object={glb.scene}></primitive>
      </group>
    </>
  )
}
