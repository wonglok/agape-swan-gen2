import {
  Backdrop,
  Gltf,
  OrbitControls,
  PresentationControls,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import copyToClipboard from "copy-to-clipboard";
export function Blender() {
  let [files, setFiles] = useState([]);
  let [activeIndex, setIndex] = useState(0);

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
            let name = it.basename.split(".");
            let ext = name.pop().toUpperCase();
            let md5note = name.pop();
            name = name.join(".");

            return (
              <div
                className={
                  activeIndex === idx
                    ? `overflow-x-scroll m-2 bg-purple-100 p-2 hover:bg-purple-200 cursor-pointer relative rounded-lg`
                    : `overflow-x-scroll m-2 bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer relative rounded-lg`
                }
                key={it.file}
                onClick={() => {
                  setIndex(idx);
                  copyToClipboard(files[idx].file);
                }}
              >
                <div>{name}</div>
                <div className="text-sm text-gray-500">
                  [{ext}] {it.date}
                </div>
                <div
                  className="text-gray-400 overflow-x-hidden"
                  style={{ fontSize: "8px" }}
                >
                  [{it.basename}]
                </div>
                <div className=" absolute top-1 right-1 m-1 w-5 h-5">
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="gray"
                      d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ width: `calc(100% - 280px)`, height: `100%` }}>
          {files[activeIndex]?.file && (
            <>
              <Canvas shadows>
                <Stage
                  key={`stage${files[activeIndex].file}?v=${performance.now()}`}
                  adjustCamera={1.5}
                  shadows="contact"
                >
                  <GLB
                    key={`glb${files[activeIndex].file}?v=${performance.now()}`}
                    src={`${files[activeIndex].file}?v=${performance.now()}`}
                  ></GLB>
                </Stage>
                <OrbitControls
                  key={`cam${files[activeIndex].file}?v=${performance.now()}`}
                  object-position={[0, 4, 8]}
                  makeDefault
                ></OrbitControls>
              </Canvas>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function GLB({ src }) {
  let glb = useGLTF(`${src}`);
  const { ref, mixer, names, actions, clips } = useAnimations(glb.animations);
  useEffect(() => {
    (names || []).forEach((name) => {
      if (name) {
        actions[name].reset();
        actions[name].play();
      }
    });
  }, [actions, names]);

  glb.scene.traverse((it) => {
    it.castShadow = true;
    it.receiveShadow = true;
  });

  return (
    <group ref={ref}>
      <primitive object={glb.scene}></primitive>
    </group>
  );
}

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
