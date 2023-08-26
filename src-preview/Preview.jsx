// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Canvas } from "@react-three/fiber";
// import { SwanRuntime } from "./Swan/SwanRuntime";
import { Environment, OrbitControls } from "@react-three/drei";
import { CommonSwanHTML, SwanLibRuntime } from "./Swan/SwanLibRuntime";
import { Suspense, useEffect, useState } from "react";
import {
  RemoteCommonSwanHTML,
  SwanRemoteRuntime,
} from "./Swan/SwanRemoteRuntime";

function Preview() {
  let [origin, setOrigin] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return (
    <>
      <Canvas>
        <group position={[0, 3, 0]}>
          {origin && (
            <SwanRemoteRuntime
              mode={"development"}
              baseURL={`${origin}`}
              scriptURL={`/swan`}
              socketURL={"http://localhost:8521"}
            ></SwanRemoteRuntime>
          )}
        </group>
        <group position={[0, -3, 0]}>
          <Suspense fallback={null}>
            <SwanLibRuntime></SwanLibRuntime>
          </Suspense>
        </group>

        <Suspense fallback={null}>
          <Environment files={`/hdr/grass.hdr`} background></Environment>
        </Suspense>

        <OrbitControls object-position={[0, 0, 13]}></OrbitControls>
      </Canvas>

      <CommonSwanHTML></CommonSwanHTML>
      <RemoteCommonSwanHTML></RemoteCommonSwanHTML>
    </>
  );
}

export { Preview };

//

//
