import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { CommonSwanHTML, SwanLibRuntime } from "./Swan/SwanLibRuntime";
import { Suspense, useEffect, useState } from "react";
import {
  RemoteCommonSwanHTMLGen2,
  SwanRemoteRuntimeGen2,
} from "./Swan/SwanRemoteRuntimeGen2";

function Preview() {
  let [origin, setOrigin] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  //
  return (
    <>
      <Canvas>
        {/*  */}
        {/* Test Component Livelink */}
        {/* for loading collab code */}
        {/* <Suspense fallback={null}>
          <group position={[0, 10, 0]}>
            {origin && (
              <SwanRemoteRuntimeGen2
                baseURL={`${origin}`}
                swanPath={`swan-build`}
                socketURL={"http://localhost:8521"}
              ></SwanRemoteRuntimeGen2>
            )}
          </group>
        </Suspense> */}

        {/* Remote Loading... */}
        {/* For loading production code */}
        {/* <Suspense fallback={null}>
          <SwanRemoteRuntimeGen2
            baseURL={`https://agape-swan-gen2.vercel.app`}
            swanPath={`swan-build`}
            socketURL={false}
          ></SwanRemoteRuntimeGen2>
        </Suspense> */}

        {/* Swan lib runtime */}
        {/* for testing on your own */}
        <group position={[0, -0, 0]}>
          <Suspense fallback={null}>
            <SwanLibRuntime></SwanLibRuntime>
          </Suspense>
        </group>

        <Suspense fallback={null}>
          <Environment files={`/hdr/grass.hdr`} background></Environment>
        </Suspense>

        <OrbitControls object-position={[0, 0, 20]}></OrbitControls>
      </Canvas>

      <CommonSwanHTML></CommonSwanHTML>

      <RemoteCommonSwanHTMLGen2></RemoteCommonSwanHTMLGen2>
    </>
  );
}

export { Preview };

//

//

//

//
