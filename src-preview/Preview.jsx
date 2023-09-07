import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { SwanLocalHTML, SwanLocalRuntime } from './SwanLoader/SwanLocalRuntime'
import { Suspense, useEffect, useState } from 'react'
import { SwanRemoteHTMLGen2, SwanRemoteRuntimeGen2 } from './SwanLoader/SwanRemoteRuntimeGen2'
import { WorkerLoader } from './WorkerLoader/WorkerLoader'

function Preview() {
  let [origin, setOrigin] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  //
  return (
    <>
      <Canvas>
        {/* Test Component Livelink */}
        {/* for loading collab code */}
        {/* <Suspense fallback={null}>
          <group position={[0, 15, 0]}>
            {origin && (
              <SwanRemoteRuntimeGen2
                baseURL={`${origin}`}
                swanPath={`swan-build`}
                socketURL={"http://localhost:8521"}
              ></SwanRemoteRuntimeGen2>
            )}
          </group>
        </Suspense> */}

        {/* Swan lib runtime */}
        {/* for testing on your own */}
        <group position={[0, 0, 0]}>
          <Suspense fallback={null}>
            <WorkerLoader
              baseURL={`${origin}`}
              swanPath={`swan-build`}
              socketURL={'http://localhost:8521'}
            ></WorkerLoader>
          </Suspense>

          {/* <Suspense fallback={null}>
            <SwanLocalRuntime></SwanLocalRuntime>
          </Suspense> */}
        </group>

        {/* Remote Loading... */}
        {/* For loading production code */}
        <group position={[0, -15, 0]}>
          {/* <Suspense fallback={null}>
            <SwanRemoteRuntimeGen2
              baseURL={`https://agape-swan-gen2.vercel.app`}
              swanPath={`swan-build`}
              socketURL={false}
            ></SwanRemoteRuntimeGen2>
          </Suspense> */}
        </group>

        <Suspense fallback={null}>
          <Environment files={`/hdr/grass.hdr`} background></Environment>
        </Suspense>

        <OrbitControls object-position={[0, 1.75 * 0.0, 5]} target={[0, 1.75 * 0.0, 0]}></OrbitControls>
      </Canvas>

      <SwanLocalHTML></SwanLocalHTML>

      <SwanRemoteHTMLGen2></SwanRemoteHTMLGen2>
    </>
  )
}

export { Preview }

//

//

//
