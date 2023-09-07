export const AppRoot = () => {
  return (
    <>
      <group position={[0, 0, 0]}>
        <mesh
          onPointerDown={(ev) => {
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

export const getRoot = () => {
  return <AppRoot />
}
