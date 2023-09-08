import { meshBounds, useGLTF } from '@react-three/drei'
import { useSwan } from 'src-swan/store/useSwan'

export function MyGLB({ src, children, ...props }) {
  let baseURL = useSwan((r) => r.baseURL) || ''
  let glb = useGLTF(baseURL + src)

  glb.scene.traverse((it) => {
    if (it.geometry) {
      it.geometry.computeBoundingSphere()

      let sphereCenter = it.geometry.boundingSphere.center.clone()

      it.geometry.center()
      it.geometry.translate(sphereCenter.x, sphereCenter.y, sphereCenter.z)
    }
  })

  return (
    <>
      <group {...props} raycast={meshBounds} userData={{ groupTargetParent: true }}>
        <primitive object={glb.scene}></primitive>
        {children}
      </group>
    </>
  )
}
