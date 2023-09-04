import * as React from "react";
// import * as Main from "../../src-swan/entry/main.jsx";
import * as Preload from "../../src-swan/entry/preload.js";

import tunnel from "tunnel-rat";

const t = tunnel();

export function SwanLocalHTML() {
  return <t.Out></t.Out>;
}

export function SwanLocalRuntime() {
  let [o3d, set3D] = React.useState(false);
  // let [html, setHTML] = React.useState(false);
  React.useEffect(() => {
    window["React"] = React;

    window.Globals = window.Globals || {};

    // window.Globals['agape-sdk'] = AgapeSDK
    // window.Globals['react'] = React
    // window.Globals['three'] = THREE
    // window.Globals['zustand'] = Zustand
    // window.Globals['@react-three/fiber'] = ReactThreeFiber
    // window.Globals['@react-three/drei'] = ReactThreeDrei
    // window.Globals['@react-three/postprocessing'] = ReactThreePostProc
    // window.Globals['@react-three/xr'] = ReactThreeXR
    // window.Globals['three-stdlib'] = THREESTDLIB

    let loadGlobals = async ({ globals: array }) => {
      let res = array
        .filter((r) => {
          return r.needs;
        })
        .map(async (r) => {
          let name = r.name;

          // if (!window.Globals[name] && name === "agape-sdk") {
          //   window.Globals["agape-sdk"] = await import("agape-sdk");
          // }
          if (!window.Globals[name] && name === "react") {
            window.Globals["react"] = await import("react");
          }
          if (!window.Globals[name] && name === "three") {
            window.Globals["three"] = await import("three");
          }
          if (!window.Globals[name] && name === "zustand") {
            window.Globals["zustand"] = await import("zustand");
          }
          if (!window.Globals[name] && name === "@react-three/fiber") {
            window.Globals["@react-three/fiber"] = await import(
              "@react-three/fiber"
            );
          }
          if (!window.Globals[name] && name === "@react-three/drei") {
            window.Globals["@react-three/drei"] = await import(
              "@react-three/drei"
            );
          }
          if (!window.Globals[name] && name === "@react-three/postprocessing") {
            window.Globals["@react-three/postprocessing"] = await import(
              "@react-three/postprocessing"
            );
          }
          if (!window.Globals[name] && name === "@react-three/xr") {
            window.Globals["@react-three/xr"] = await import("@react-three/xr");
          }
          if (!window.Globals[name] && name === "three-stdlib") {
            window.Globals["three-stdlib"] = await import("three-stdlib");
          }
        })
        .map((r) => {
          r.catch((err) => {
            console.log(err);
          });
          return r;
        });

      await Promise.all(res);
    };

    Preload.preload({ loadGlobals }).then(() => {
      //!SECTION
      //
      import("../../src-swan/entry/main.jsx").then((M) => {
        // console.log(M);

        set3D(
          <>
            <M.Runtime baseURL={origin} onReady={() => {}}>
              <M.SmartObject></M.SmartObject>
              <t.In>
                <M.HTMLOverlay></M.HTMLOverlay>
              </t.In>
            </M.Runtime>
          </>
        );

        //
      });
    });
  }, []);
  return (
    <>
      {/*  */}

      {o3d && (
        <>
          {/*  */}
          {o3d}
          {/*  */}
        </>
      )}

      {/*  */}
    </>
  );
}
