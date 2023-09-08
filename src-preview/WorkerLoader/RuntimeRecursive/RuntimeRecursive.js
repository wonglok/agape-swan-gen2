import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { MyAnimations } from '../MyAnimations/MyAnimations.js'
import { MyGLB } from '../MyGLB/MyGLB.js'
import { AISpeakFace } from '../AISpeakFace/AISpeakFace.js'

export const RuntimeRecursive = ({ bus, node }) => {
  let [nodeProps, setNodeProps] = useState(node.props)
  let kids = () => {
    return node?.children?.map((r) => {
      return <RuntimeRecursive key={r.props.key} node={r}></RuntimeRecursive>
    })
  }

  useEffect(() => {
    if (!bus) {
      return
    }
    let hh = ({ result }) => {
      result.forEach((item) => {
        if (item.props.key === node.props.key) {
          setNodeProps(item.props)
        }
      })
    }
    bus.on('renderer-commit-update-batch', hh)
    return () => {
      bus.off('renderer-commit-update-batch', hh)
    }
  }, [node, bus])

  let ref = useRef()
  return (
    <>
      {node?.type === 'gltf' && (
        <MyGLB key={nodeProps.key} userData={{ key: nodeProps.key, gltfCompos: true }} {...(nodeProps || {})}>
          {kids()}
        </MyGLB>
      )}

      {node?.type === 'aiface' && (
        <AISpeakFace key={nodeProps.key} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </AISpeakFace>
      )}

      {node?.type === 'animations' && (
        <MyAnimations key={nodeProps.key} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </MyAnimations>
      )}

      {node?.type === 'root' && (
        <group ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </group>
      )}

      {node?.type === 'group' && (
        <group ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </group>
      )}

      {node?.type === 'object3d' && (
        <group ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </group>
      )}

      {node?.type === 'mesh' && (
        <mesh ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </mesh>
      )}
      {node?.type === 'sphereGeometry' && (
        <sphereGeometry ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </sphereGeometry>
      )}

      {node?.type === 'boxGeometry' && (
        <boxGeometry ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </boxGeometry>
      )}

      {node?.type === 'meshBasicMaterial' && (
        <meshBasicMaterial ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </meshBasicMaterial>
      )}

      {node?.type === 'meshStandardMaterial' && (
        <meshStandardMaterial ref={ref} userData={{ key: nodeProps.key }} {...(nodeProps || {})}>
          {kids()}
        </meshStandardMaterial>
      )}
    </>
  )
}
