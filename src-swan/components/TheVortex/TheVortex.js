import { CustomGPU } from "./CustomGPU.js";
import { vortexComputeShader } from "./computeShader.js";
import { NoodleO3 } from "./NoodleO3.js";
import { Core } from "./Core.js";
import { useEffect, useRef } from "react";
import {
  Color,
  DataTexture,
  FloatType,
  Object3D,
  RGBAFormat,
  ShaderMaterial,
  Vector3,
  Mesh,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  IcosahedronGeometry,
} from "three";
import { useThree } from "@react-three/fiber";

export function TheVortex() {
  let ref = useRef();

  let gl = useThree((r) => r.gl);
  useEffect(() => {
    if (!gl) {
      return;
    }
    let o3 = new TheVortexInside({ gl: gl });

    ref.current.clear();
    ref.current.add(o3);

    return () => {
      o3.removeFromParent();
      o3.core.clean();
    };
  }, [gl]);

  return <group ref={ref}></group>;
}

class TheVortexInside extends Object3D {
  constructor({ gl } = {}) {
    super();
    this.gl = gl;
    this.setup();
  }
  setup() {
    this.core = Core.makeDisposableNode({ name: "vortex" }).sub;
    let gl = this.gl;

    let SIZE_X = 128;
    let SIZE_Y = 128;

    let gpuCompute = new CustomGPU(SIZE_X, SIZE_Y, gl);
    //
    gpuCompute.setDataType(FloatType);

    // let ptLight = new PointLight(0x8490c6, 2.5, 25)
    // this.add(ptLight)

    // pos IDX
    let posIdx_data = new Float32Array(SIZE_X * SIZE_Y * 4);
    let posIdx = new DataTexture(
      posIdx_data,
      SIZE_X,
      SIZE_Y,
      RGBAFormat,
      FloatType
    );
    let p;

    p = 0;
    for (let j = 0; j < SIZE_X; j++) {
      for (let i = 0; i < SIZE_Y; i++) {
        let id = p / 4;
        posIdx_data[p + 0] = id % 6; // square 1 / 6 index
        posIdx_data[p + 1] = Math.floor(id / 6); // square
        posIdx_data[p + 2] = (SIZE_Y * SIZE_X) / 6.0; // total
        posIdx_data[p + 3] = id;
        p += 4;
      }
    }

    // pos IDX
    let posDynamic_data = new Float32Array(SIZE_X * SIZE_Y * 4);
    let posDynamic = new DataTexture(
      posDynamic_data,
      SIZE_X,
      SIZE_Y,
      RGBAFormat,
      FloatType
    );

    p = 0;
    for (let j = 0; j < SIZE_Y; j++) {
      for (let i = 0; i < SIZE_X; i++) {
        posDynamic_data[p + 0] = 0;
        posDynamic_data[p + 1] = 0;
        posDynamic_data[p + 2] = 0;
        posDynamic_data[p + 3] = 1.0;
        p += 4;
      }
    }

    let tPos = vortexComputeShader;

    //   tPos = `
    //   // uniform sampler2D tPos;
    //   ${tPos}
    // `

    let posVar = gpuCompute.addVariable("tPos", tPos, posDynamic);
    posVar.material.uniforms.tIdx = { value: posIdx };
    posVar.material.uniforms.iTime = { value: 0 };
    posVar.material.uniforms.mousePos = { value: new Vector3(0, 0, 0) };
    posVar.material.uniforms.screen = {
      value: new Vector3(window.innerWidth, window.innerHeight, 0.0),
    };
    posVar.material.uniforms.enterCirlce = { value: 0 };

    let vp = new Vector3();

    // if (enableDetection) {
    //   this.core.onLoop(() => {
    //     this.getWorldPosition(vp)
    //     if (Core.now?.walker) {
    //       let dist = Core.now.walker.params.player.position.distanceTo(vp)
    //       if (dist <= 14.0) {
    //         posVar.material.uniforms.enterCirlce.value = 1
    //       } else {
    //         posVar.material.uniforms.enterCirlce.value = 0
    //       }
    //     }
    //   })
    // }

    gpuCompute.setVariableDependencies(posVar, [posVar]);

    let error = gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
    let boxGeo = new IcosahedronGeometry(1, 0);

    let geo = new InstancedBufferGeometry();
    geo.setAttribute("position", boxGeo.attributes.position);
    geo.instanceCount = SIZE_X * SIZE_Y;

    let getUVInfo = () => {
      let newArr = [];
      let na = 0;
      for (let j = 0; j < SIZE_Y; j++) {
        for (let i = 0; i < SIZE_X; i++) {
          newArr[na + 0] = i / SIZE_X;
          newArr[na + 1] = j / SIZE_Y;
          newArr[na + 2] = 0;
          na += 3;
        }
      }

      //
      return newArr;
    };

    geo.setAttribute(
      "uvinfo",
      new InstancedBufferAttribute(new Float32Array(getUVInfo()), 3, true, 1)
    );
    // geo.setAttribute(
    //   'posIdx',
    //   new BufferAttribute(new Float32Array(posIdx.image.data), 4)
    // )

    // enableDetection

    let uniforms = {
      color: { value: new Color("#58519B").offsetHSL(0, 0.0, 0.0) },
      time: { value: 0 },
      tPos: { value: null },
    };
    let material = new ShaderMaterial({
      transparent: true,
      uniforms,
      defines: {
        resolution: `vec2(${SIZE_X.toFixed(1)}, ${SIZE_Y.toFixed(1)})`,
      },
      vertexShader: /* glsl */ `
    uniform  sampler2D tPos;
    #include <common>
    // uniform sampler2D tIdx;

    varying vec3 v_tt;

    attribute vec3 uvinfo;

    void main() {
      // vec3 newPos = vec3(1.0);

      // position is changed to host uv vals
      vec4 tt = texture2D(tPos, uvinfo.xy);
      // vec4 idx = texture2D(tIdx, position.xy);

      v_tt = normalize(tt.xyz);

      vec4 mvPosition = modelViewMatrix * (vec4(tt.rgb + position * 3.0, 1.0));
      vec4 outputPos = projectionMatrix * mvPosition;

      gl_Position = outputPos;
    }
    `,
      fragmentShader: /* glsl */ `
    #include <common>

    varying vec3 v_tt;

    uniform vec3 color;

    void main () {
      gl_FragColor = vec4(
        vec3(color.x + 0.2 * (v_tt.x),
        color.y + 0.2 * (v_tt.y),
        color.z + 0.2 * (v_tt.z))  *3.0  + 0.3
        ,
        0.35
      );

      // if (length(gl_PointCoord.xy - 0.5) <= 0.5) {

      // } else {
      //   discard;
      // }
    }

    `,
    });

    //
    //
    // let matt = new MeshPhysicalMaterial({
    //   transparent: true,
    //   color: new Color('#ffffff'),
    //   roughness: 1.0,
    //   metalness: 0.0,
    //   emissive: new Color('#ffffff'),
    // })
    // matt.onBeforeCompile = (shader, gl) => {
    //   //
    //
    //   shader.uniforms.tPos = { value: null }
    //   this.core.onLoop(() => {
    //     shader.uniforms.tPos.value =
    //       gpuCompute.getCurrentRenderTarget(posVar).texture
    //   })
    //
    //   shader.vertexShader = shader.vertexShader.replace(
    //     `void main() {`,
    //     /* glsl */ `
    //   uniform sampler2D tPos;
    //   attribute vec3 uvinfo;
    //   void main() {`
    //   )
    //
    //   //
    //   shader.vertexShader = shader.vertexShader.replace(
    //     `#include <begin_vertex>`,
    //     /* glsl */ `
    //     vec4 tt = texture2D(tPos, uvinfo.xy);
    //     vec3 transformed = vec3( tt.rgb + position * 2.0);
    //   `
    //   )
    // }
    //

    let renderable = new Mesh(geo, material);
    renderable.frustumCulled = false;
    renderable.scale.setScalar((1 / 350) * 50);
    renderable.userData.enableBloom = true;

    // let renderable2 = new Mesh(geo, material2)
    // renderable2.frustumCulled = false
    // renderable2.userData.enableBloom = true
    //

    renderable.visible = true;
    this.add(renderable);
    this.core.onClean(() => {
      renderable.removeFromParent();
    });

    let current = {
      texture: gpuCompute.getCurrentRenderTarget(posVar).texture,
    };

    this.core.onClean(() => {
      gpuCompute.getCurrentRenderTarget(posVar).texture.dispose();
      gpuCompute.getAlternateRenderTarget(posVar).texture.dispose();
    });

    this.core.onLoop((dt) => {
      let time = window.performance.now() / 1000;
      posVar.material.uniforms.iTime.value = time;

      uniforms.tPos.value = gpuCompute.getCurrentRenderTarget(posVar).texture;
      uniforms.time.value = time;
      current.texture = uniforms.tPos.value;
      gpuCompute.compute();
    });

    let noodleO3 = new NoodleO3({
      gl: this.gl,
      node: this.core,
      getHeadList: () => current.texture,
      howManyTrackers: 128,
      tailLength: 64,
    });

    noodleO3.o3d.scale.setScalar((1 / 350) * 50);

    this.add(noodleO3.o3d);
    this.core.onClean(() => {
      this.remove(noodleO3.o3d);
    });
    this.core.onLoop((dt) => {
      noodleO3.track({ trackers: [], lerp: 1, dt });
    });
  }
}
