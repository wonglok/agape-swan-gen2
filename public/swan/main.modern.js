const e=window.Globals,t=e.react,n=e.three,a=e["@react-three/drei"],o=t.useEffect,r=t.useState,l=t.useRef,i=e["@react-three/fiber"].useFrame,c=a.useGLTF,s=(0,e.zustand.create)(()=>({openOverlay:!1,baseURL:"",text:"Click Box"}));let{Clock:w}=n,{MeshTransmissionMaterial:u,Text3D:d,Center:m}=a;function f(){let e=s(e=>e.baseURL),t=s(e=>e.text),n=l();return o(()=>{let e=new w,t=({detail:t})=>{e.getDelta();let a=t.animatedScroll,o=t.dimensions.scrollHeight-t.dimensions.height;console.log(a/o),n.current&&(n.current.rotation.y=a/o*Math.PI*2)};return window.addEventListener("lenis-scroll",t),()=>{window.removeEventListener("lenis-scroll",t)}},[]),window.React.createElement(window.React.Fragment,null,window.React.createElement("group",{ref:n},window.React.createElement(m,null,window.React.createElement(d,{height:.0125,bevelSize:.025,bevelSegments:5,bevelThickness:.1,scale:1,bevelEnabled:!0,font:`${e}/fonts/days-font/Days_Regular.json`},`${t}`,window.React.createElement(u,{transmission:1,thickness:1,roughness:.3,color:"#ffffff",attenuationDistance:5,attenuationColor:"#ffff00",metalness:0,reflectivity:.5,chromaticAberration:0,transmissionSampler:!0,temporalDistortion:.5})))))}let{MeshTransmissionMaterial:p,Center:g}=a,{useRef:h}=t;function R(){let e=s(e=>e.baseURL),t=c(`${e}/geometry/box.glb`);t.scene=t.scene.clone(!0);let n=!1;t.scene.traverse(e=>{e.geometry&&!n&&(n=e.geometry)});let a=h();return i((e,t)=>{a.current.rotation.y+=1.1*t,a.current.scale.setScalar(1+.25*Math.sin(3*e.clock.elapsedTime))}),window.React.createElement(window.React.Fragment,null,window.React.createElement("group",{onClick:()=>{s.setState({openOverlay:!s.getState().openOverlay})}},window.React.createElement(g,null,window.React.createElement("mesh",{ref:a,geometry:n},window.React.createElement(p,{transmission:1,thickness:1,roughness:.3,color:"#ffffff",attenuationDistance:5,attenuationColor:"#00ffff",metalness:0,reflectivity:.5,chromaticAberration:0,transmissionSampler:!0,temporalDistortion:.5})))))}function b({children:e,baseURL:t,preloader:n=null,onReady:a=(()=>{})}){let[l,i]=r(!1);return o(()=>{"/"===t[t.length-1]&&t.slice(0,-1),s.setState({baseURL:t}),new Promise(e=>{e()}).then(()=>{a(),i(!0)})},[t,a]),l?e:n}function E(){return window.React.createElement(window.React.Fragment,null,window.React.createElement("group",null,window.React.createElement("group",{position:[0,1.3,0]},window.React.createElement(f,null)),window.React.createElement("group",{position:[0,-1.3,0]},window.React.createElement(R,null))))}function y(){let e=s(e=>e.openOverlay),t=s(e=>e.text);return window.React.createElement(window.React.Fragment,null,e&&window.React.createElement(window.React.Fragment,null,window.React.createElement("div",{style:{position:"absolute",top:"0%",right:"0%",width:"100%",height:"100%"},onClick:()=>{s.setState({openOverlay:!1})}}),window.React.createElement("div",{className:"shadow-2xl backdrop-blur-lg p-1 text-white rounded-2xl",style:{position:"absolute",top:"5%",right:"25%",width:"calc(50% + 0.75rem * 2)",height:"calc(10% + 0.75rem * 2)",border:"1px solid #888",boxShadow:"0px 0px 30px 0px #888"}},window.React.createElement("input",{className:"bg-transparent p-3 w-full block text-white appearance-none bg-opacity-0 border-none outline-none focus:outline-none ",defaultValue:t,style:{background:"transparent",appearance:"none",resize:"none",outline:"none"},onChange:e=>{s.setState({text:e.target.value})}}))))}export{y as HTMLOverlay,b as Runtime,E as SmartObject};
