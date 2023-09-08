import { meshBounds, useGLTF } from '@react-three/drei'

export function MyGLB({ src, children, ...props }) {
  let glb = useGLTF(src)

  glb.scene.traverse((it) => {
    if (it.geometry) {
      it.geometry.computeBoundingSphere()

      let sphereCenter = it.geometry.boundingSphere.center.clone()

      it.geometry.center()
      it.geometry.translate(sphereCenter.x, sphereCenter.y, sphereCenter.z)

      // console.log(sphereCenter)
    }
  })

  return (
    <>
      <group {...props} raycast={meshBounds} userData={{ animationTargetParent: true }}>
        <primitive object={glb.scene}></primitive>
        {children}
      </group>
    </>
  )
}
