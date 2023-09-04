import {
  Backdrop,
  Gltf,
  OrbitControls,
  PresentationControls,
  Stage,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
export function Blender() {
  let [files, setFiles] = useState([]);
  let [activeIndex, setIndex] = useState(0);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  useEffect(() => {
    let newFiles = getFiles();
    setFiles(newFiles);

    return () => {
      //
    };
  }, [activeIndex]);

  return (
    <>
      <div className="flex w-full h-full">
        <div className="" style={{ width: `280px`, height: "100%" }}>
          {files.map((it, idx) => {
            return (
              <div
                className={
                  activeIndex === idx
                    ? `overflow-x-scroll m-2 bg-purple-100 p-2 hover:bg-purple-200 cursor-pointer`
                    : `overflow-x-scroll m-2 bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer`
                }
                key={it.file}
                onClick={() => {
                  setIndex(idx);
                }}
              >
                <div> {it.basename}</div>
                <div className="text-sm text-gray-500"> {it.date}</div>
              </div>
            );
          })}
        </div>
        <div style={{ width: `calc(100% - 280px)`, height: `100%` }}>
          {files[activeIndex]?.file && (
            <>
              <Canvas shadows>
                <Stage adjustCamera={2} shadows="contact">
                  <GLB
                    src={`${files[activeIndex].file}?v=${performance.now()}`}
                  ></GLB>
                </Stage>
                <OrbitControls
                  key={`${files[activeIndex].file}?v=${performance.now()}`}
                  object-position={[0, 4, 8]}
                  makeDefault
                ></OrbitControls>
              </Canvas>
              {/* <model-viewer
                camera-controls
                class="w-full h-full"
                src={}
              ></model-viewer> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function GLB({ src }) {
  let glb = useGLTF(`${src}`);

  return <primitive object={glb.scene}></primitive>;
}

/*

// Load globally into all modules.
require("require-context/register");


*/

// Load locally as a function.

function basename(path) {
  return path.replace(/\\/g, "/").replace(/.*\//, "");
}
function getFiles() {
  function requireAll(r) {
    let files = [];
    r.keys().forEach((key) => {
      // r(key);
      // console.log(key);

      if (key.includes("public")) {
        let item = {};
        item.basename = basename(key);
        item.file = key.replace("public/", "/");

        let segs = item.file.split("/");

        item.date = segs[2];
        files.push(item);
      }
    });

    console.log(files);

    return files;
  }

  let files = requireAll(
    require.context(
      "file-loader!../public/blender-livelink-dropzone/",
      true,
      /\.glb$/
    )
  );

  return files;
}
