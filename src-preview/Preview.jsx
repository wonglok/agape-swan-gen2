import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { SwanLocalHTML, SwanLocalRuntime } from './SwanLoader/SwanLocalRuntime'
import { Suspense, useEffect, useState } from 'react'
import { SwanRemoteHTMLGen2, SwanRemoteRuntimeGen2 } from './SwanLoader/SwanRemoteRuntimeGen2'
import { WorkerLoader } from './WorkerLoader/WorkerLoader'
// import { TheVortex } from 'src-swan/components/TheVortex/TheVortex'

function Preview() {
  let [origin, setOrigin] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <>
      <Canvas>
        {/* Test */}

        {/* Test Component Livelink */}
        {/* for loading collab code */}
        <Suspense fallback={null}>
          <group position={[1, 0, 0]}>
            {origin && (
              <SwanRemoteRuntimeGen2
                baseURL={`${origin}`}
                swanPath={`swan-build`}
                socketURL={'http://localhost:8521'}
              ></SwanRemoteRuntimeGen2>
            )}
          </group>
        </Suspense>

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
        </group>

        {/* <Suspense fallback={null}>
            <SwanLocalRuntime></SwanLocalRuntime>
          </Suspense> */}

        {/* Remote Loading... */}
        {/* For loading production code */}
        {/* <group position={[0, 0, 0]}>
          <Suspense fallback={null}>
            <SwanRemoteRuntimeGen2
              baseURL={`https://agape-swan-gen2.vercel.app`}
              swanPath={`swan-build`}
              socketURL={false}
            ></SwanRemoteRuntimeGen2>
          </Suspense>
        </group> */}

        <Suspense fallback={null}>
          <Environment files={`/hdr/grass.hdr`} background></Environment>
        </Suspense>

        <OrbitControls object-position={[0, 1.65, 3.5]} target={[0, 1.65, 0]}></OrbitControls>
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
