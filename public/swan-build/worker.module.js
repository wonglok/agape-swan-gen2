var e={d:(r,t)=>{for(var a in t)e.o(t,a)&&!e.o(r,a)&&Object.defineProperty(r,a,{enumerable:!0,get:t[a]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r)},r={};e.d(r,{v:()=>m,y:()=>d});var t=(self||window).Globals.react,a=(t.Children,t.Component,t.Fragment,t.Profiler,t.PureComponent,t.StrictMode,t.Suspense,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,t.cloneElement,t.createContext,t.createElement,t.createFactory,t.createRef,t.forwardRef,t.isValidElement,t.lazy,t.memo,t.startTransition,t.unstable_act,t.useCallback,t.useContext,t.useDebugValue,t.useDeferredValue,t.useEffect,t.useId,t.useImperativeHandle,t.useInsertionEffect,t.useLayoutEffect,t.useMemo,t.useReducer,t.useRef,t.useState),n=(t.useSyncExternalStore,t.useTransition,t.version,(self||window).Globals.three),o=(n.ACESFilmicToneMapping,n.AddEquation,n.AddOperation,n.AdditiveAnimationBlendMode,n.AdditiveBlending,n.AlphaFormat,n.AlwaysCompare,n.AlwaysDepth,n.AlwaysStencilFunc,n.AmbientLight,n.AmbientLightProbe,n.AnimationAction,n.AnimationClip,n.AnimationLoader,n.AnimationMixer,n.AnimationObjectGroup,n.AnimationUtils,n.ArcCurve,n.ArrayCamera,n.ArrowHelper,n.Audio,n.AudioAnalyser,n.AudioContext,n.AudioListener,n.AudioLoader,n.AxesHelper,n.BackSide,n.BasicDepthPacking,n.BasicShadowMap,n.Bone,n.BooleanKeyframeTrack,n.Box2,n.Box3,n.Box3Helper,n.BoxGeometry,n.BoxHelper,n.BufferAttribute,n.BufferGeometry,n.BufferGeometryLoader,n.ByteType,n.Cache,n.Camera,n.CameraHelper,n.CanvasTexture,n.CapsuleGeometry,n.CatmullRomCurve3,n.CineonToneMapping,n.CircleGeometry,n.ClampToEdgeWrapping,n.Clock),i=(n.Color,n.ColorKeyframeTrack,n.ColorManagement,n.CompressedArrayTexture,n.CompressedCubeTexture,n.CompressedTexture,n.CompressedTextureLoader,n.ConeGeometry,n.CubeCamera,n.CubeReflectionMapping,n.CubeRefractionMapping,n.CubeTexture,n.CubeTextureLoader,n.CubeUVReflectionMapping,n.CubicBezierCurve,n.CubicBezierCurve3,n.CubicInterpolant,n.CullFaceBack,n.CullFaceFront,n.CullFaceFrontBack,n.CullFaceNone,n.Curve,n.CurvePath,n.CustomBlending,n.CustomToneMapping,n.CylinderGeometry,n.Cylindrical,n.Data3DTexture,n.DataArrayTexture,n.DataTexture,n.DataTextureLoader,n.DataUtils,n.DecrementStencilOp,n.DecrementWrapStencilOp,n.DefaultLoadingManager,n.DepthFormat,n.DepthStencilFormat,n.DepthTexture,n.DirectionalLight,n.DirectionalLightHelper,n.DiscreteInterpolant,n.DisplayP3ColorSpace,n.DodecahedronGeometry,n.DoubleSide,n.DstAlphaFactor,n.DstColorFactor,n.DynamicCopyUsage,n.DynamicDrawUsage,n.DynamicReadUsage,n.EdgesGeometry,n.EllipseCurve,n.EqualCompare,n.EqualDepth,n.EqualStencilFunc,n.EquirectangularReflectionMapping,n.EquirectangularRefractionMapping,n.Euler,n.EventDispatcher,n.ExtrudeGeometry,n.FileLoader,n.Float16BufferAttribute,n.Float32BufferAttribute,n.Float64BufferAttribute,n.FloatType,n.Fog,n.FogExp2,n.FramebufferTexture,n.FrontSide,n.Frustum,n.GLBufferAttribute,n.GLSL1,n.GLSL3,n.GreaterCompare,n.GreaterDepth,n.GreaterEqualCompare,n.GreaterEqualDepth,n.GreaterEqualStencilFunc,n.GreaterStencilFunc,n.GridHelper,n.Group,n.HalfFloatType,n.HemisphereLight,n.HemisphereLightHelper,n.HemisphereLightProbe,n.IcosahedronGeometry,n.ImageBitmapLoader,n.ImageLoader,n.ImageUtils,n.IncrementStencilOp,n.IncrementWrapStencilOp,n.InstancedBufferAttribute,n.InstancedBufferGeometry,n.InstancedInterleavedBuffer,n.InstancedMesh,n.Int16BufferAttribute,n.Int32BufferAttribute,n.Int8BufferAttribute,n.IntType,n.InterleavedBuffer,n.InterleavedBufferAttribute,n.Interpolant,n.InterpolateDiscrete,n.InterpolateLinear,n.InterpolateSmooth,n.InvertStencilOp,n.KeepStencilOp,n.KeyframeTrack,n.LOD,n.LatheGeometry,n.Layers,n.LessCompare,n.LessDepth,n.LessEqualCompare,n.LessEqualDepth,n.LessEqualStencilFunc,n.LessStencilFunc,n.Light,n.LightProbe,n.Line,n.Line3,n.LineBasicMaterial,n.LineCurve,n.LineCurve3,n.LineDashedMaterial,n.LineLoop,n.LineSegments,n.LinearEncoding,n.LinearFilter,n.LinearInterpolant,n.LinearMipMapLinearFilter,n.LinearMipMapNearestFilter,n.LinearMipmapLinearFilter,n.LinearMipmapNearestFilter,n.LinearSRGBColorSpace,n.LinearToneMapping,n.Loader,n.LoaderUtils,n.LoadingManager,n.LoopOnce,n.LoopPingPong,n.LoopRepeat,n.LuminanceAlphaFormat,n.LuminanceFormat,n.MOUSE,n.Material,n.MaterialLoader,n.MathUtils,n.Matrix3,n.Matrix4,n.MaxEquation,n.Mesh,n.MeshBasicMaterial,n.MeshDepthMaterial,n.MeshDistanceMaterial,n.MeshLambertMaterial,n.MeshMatcapMaterial,n.MeshNormalMaterial,n.MeshPhongMaterial,n.MeshPhysicalMaterial,n.MeshStandardMaterial,n.MeshToonMaterial,n.MinEquation,n.MirroredRepeatWrapping,n.MixOperation,n.MultiplyBlending,n.MultiplyOperation,n.NearestFilter,n.NearestMipMapLinearFilter,n.NearestMipMapNearestFilter,n.NearestMipmapLinearFilter,n.NearestMipmapNearestFilter,n.NeverCompare,n.NeverDepth,n.NeverStencilFunc,n.NoBlending,n.NoColorSpace,n.NoToneMapping,n.NormalAnimationBlendMode,n.NormalBlending,n.NotEqualCompare,n.NotEqualDepth,n.NotEqualStencilFunc,n.NumberKeyframeTrack,n.Object3D,n.ObjectLoader,n.ObjectSpaceNormalMap,n.OctahedronGeometry,n.OneFactor,n.OneMinusDstAlphaFactor,n.OneMinusDstColorFactor,n.OneMinusSrcAlphaFactor,n.OneMinusSrcColorFactor,n.OrthographicCamera,n.PCFShadowMap,n.PCFSoftShadowMap,n.PMREMGenerator,n.Path,n.PerspectiveCamera,n.Plane,n.PlaneGeometry,n.PlaneHelper,n.PointLight,n.PointLightHelper,n.Points,n.PointsMaterial,n.PolarGridHelper,n.PolyhedronGeometry,n.PositionalAudio,n.PropertyBinding,n.PropertyMixer,n.QuadraticBezierCurve,n.QuadraticBezierCurve3,n.Quaternion,n.QuaternionKeyframeTrack,n.QuaternionLinearInterpolant,n.RED_GREEN_RGTC2_Format,n.RED_RGTC1_Format,n.REVISION,n.RGBADepthPacking,n.RGBAFormat,n.RGBAIntegerFormat,n.RGBA_ASTC_10x10_Format,n.RGBA_ASTC_10x5_Format,n.RGBA_ASTC_10x6_Format,n.RGBA_ASTC_10x8_Format,n.RGBA_ASTC_12x10_Format,n.RGBA_ASTC_12x12_Format,n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_5x4_Format,n.RGBA_ASTC_5x5_Format,n.RGBA_ASTC_6x5_Format,n.RGBA_ASTC_6x6_Format,n.RGBA_ASTC_8x5_Format,n.RGBA_ASTC_8x6_Format,n.RGBA_ASTC_8x8_Format,n.RGBA_BPTC_Format,n.RGBA_ETC2_EAC_Format,n.RGBA_PVRTC_2BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format,n.RGBA_S3TC_DXT1_Format,n.RGBA_S3TC_DXT3_Format,n.RGBA_S3TC_DXT5_Format,n.RGB_ETC1_Format,n.RGB_ETC2_Format,n.RGB_PVRTC_2BPPV1_Format,n.RGB_PVRTC_4BPPV1_Format,n.RGB_S3TC_DXT1_Format,n.RGFormat,n.RGIntegerFormat,n.RawShaderMaterial,n.Ray,n.Raycaster,n.RectAreaLight,n.RedFormat,n.RedIntegerFormat,n.ReinhardToneMapping,n.RenderTarget,n.RepeatWrapping,n.ReplaceStencilOp,n.ReverseSubtractEquation,n.RingGeometry,n.SIGNED_RED_GREEN_RGTC2_Format,n.SIGNED_RED_RGTC1_Format,n.SRGBColorSpace,n.Scene,n.ShaderChunk,n.ShaderLib,n.ShaderMaterial,n.ShadowMaterial,n.Shape,n.ShapeGeometry,n.ShapePath,n.ShapeUtils,n.ShortType,n.Skeleton,n.SkeletonHelper,n.SkinnedMesh,n.Source,n.Sphere,n.SphereGeometry,n.Spherical,n.SphericalHarmonics3,n.SplineCurve,n.SpotLight,n.SpotLightHelper,n.Sprite,n.SpriteMaterial,n.SrcAlphaFactor,n.SrcAlphaSaturateFactor,n.SrcColorFactor,n.StaticCopyUsage,n.StaticDrawUsage,n.StaticReadUsage,n.StereoCamera,n.StreamCopyUsage,n.StreamDrawUsage,n.StreamReadUsage,n.StringKeyframeTrack,n.SubtractEquation,n.SubtractiveBlending,n.TOUCH,n.TangentSpaceNormalMap,n.TetrahedronGeometry,n.Texture,n.TextureLoader,n.TorusGeometry,n.TorusKnotGeometry,n.Triangle,n.TriangleFanDrawMode,n.TriangleStripDrawMode,n.TrianglesDrawMode,n.TubeGeometry,n.TwoPassDoubleSide,n.UVMapping,n.Uint16BufferAttribute,n.Uint32BufferAttribute,n.Uint8BufferAttribute,n.Uint8ClampedBufferAttribute,n.Uniform,n.UniformsGroup,n.UniformsLib,n.UniformsUtils,n.UnsignedByteType,n.UnsignedInt248Type,n.UnsignedIntType,n.UnsignedShort4444Type,n.UnsignedShort5551Type,n.UnsignedShortType,n.VSMShadowMap,n.Vector2,n.Vector3,n.Vector4,n.VectorKeyframeTrack,n.VideoTexture,n.WebGL1Renderer,n.WebGL3DRenderTarget,n.WebGLArrayRenderTarget,n.WebGLCoordinateSystem,n.WebGLCubeRenderTarget,n.WebGLMultipleRenderTargets,n.WebGLRenderTarget,n.WebGLRenderer,n.WebGLUtils,n.WebGPUCoordinateSystem,n.WireframeGeometry,n.WrapAroundEnding,n.ZeroCurvatureEnding,n.ZeroFactor,n.ZeroSlopeEnding,n.ZeroStencilOp,n._SRGBAFormat,n.sRGBEncoding,(self||window).Globals.zustand),l=i.create,u=(i.useStore,i.createStore,l((function(e,r){var t=new o,a=[];return requestAnimationFrame((function e(){requestAnimationFrame(e),a.forEach((function(e){e(null,t.getDelta())}))})),{onLoop:function(e){a.push(e)}}})));function c(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,n,o,i,l=[],u=!0,c=!1;try{if(o=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;u=!1}else for(;!(u=(a=o.call(t)).done)&&(l.push(a.value),l.length!==r);u=!0);}catch(e){c=!0,n=e}finally{try{if(!u&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(c)throw n}}return l}}(e,r)||function(e,r){if(e){if("string"==typeof e)return p(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?p(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a}var m=function(){var e=c(a(0),2),r=e[0],t=e[1];return u((function(e){return e.onLoop}))((function(e,r){t((function(e){return e+1*r}))})),React.createElement(React.Fragment,null,React.createElement("group",{rotation:[0,r,0],position:[0,0,0]},React.createElement("mesh",{onPointerDown:function(e){console.log(e)},onPointerEnter:function(e){console.log(e)},rotation:[0,0,0],position:[0,0,0]},React.createElement("boxGeometry",{args:[1,1,1]}),React.createElement("meshStandardMaterial",{color:"#ff0000"}))))};function s(){var e=c(a("float"),2),r=e[0],t=e[1];return React.createElement(React.Fragment,null,React.createElement("group",{onPointerDown:function(e){console.log(e)}},React.createElement("gltf",{src:"/avatar/loklok-modern.glb"},React.createElement("animations",{activeAction:r,libs:[{name:"float",src:"/avatar/rpm/rpm-actions-locomotion/swim-forward.fbx",playClips:[0]},{name:"salute",src:"/avatar/rpm/rpm-actions-emoji/salute.fbx",playClips:[0]}]}),React.createElement("aiface",null))),React.createElement("group",{onPointerDown:function(e){"float"===r?t("salute"):"salute"===r&&t("float")},position:[-1,0,0]},React.createElement(m,null)))}var d=function(){return React.createElement("group",null,React.createElement(s,null))},S=r.v,f=r.y;export{S as BoxRoot,f as getRoot};