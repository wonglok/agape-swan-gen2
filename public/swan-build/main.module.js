var e=window.Globals,t=e.react,n=e.three,a=e["@react-three/drei"],o=t.useEffect,r=t.useState,i=t.useRef,c=e["@react-three/fiber"].useFrame,l=a.useGLTF,s=(0,e.zustand.create)(function(e){return{openOverlay:!1,baseURL:"",text:"Click Box",setBaseURL:function(t){var n=t.baseURL;"/"===n[n.length-1]&&n.slice(0,n.length-1),e({baseURL:n})}}}),u=n.Clock,w=a.MeshTransmissionMaterial,f=a.Text3D,d=a.Center;function m(){var e=s(function(e){return e.baseURL}),t=s(function(e){return e.text}),n=i();return o(function(){var e=new u,t=function(t){var a=t.detail;e.getDelta();var o=a.animatedScroll,r=a.dimensions.scrollHeight-a.dimensions.height;console.log(o/r),n.current&&(n.current.rotation.y=o/r*Math.PI*2)};return window.addEventListener("lenis-scroll",t),function(){window.removeEventListener("lenis-scroll",t)}},[]),o(function(){fetch(e+"/api/hi").then(function(e){return e.ok?e.json():{}}).then(function(e){return e.rand}).then(function(e){console.log(e),s.setState({text:"click da box \n"+e.toFixed(3)})})},[e]),window.React.createElement(window.React.Fragment,null,window.React.createElement("group",{ref:n},window.React.createElement(d,null,window.React.createElement(f,{height:.0125,bevelSize:.025,bevelSegments:5,bevelThickness:.1,scale:1,bevelEnabled:!0,font:e+"/fonts/days-font/Days_Regular.json"},""+t,window.React.createElement(w,{transmission:1,thickness:1,roughness:.3,color:"#ffffff",attenuationDistance:5,attenuationColor:"#ffff00",metalness:0,reflectivity:.5,chromaticAberration:0,transmissionSampler:!0,temporalDistortion:.5})))))}var h=a.MeshTransmissionMaterial,g=a.Center,p=t.useRef;function R(){var e=s(function(e){return e.baseURL}),t=l(e+"/geometry/box.glb");t.scene=t.scene.clone(!0);var n=!1;t.scene.traverse(function(e){e.geometry&&!n&&(n=e.geometry)});var a=p();return c(function(e,t){a.current.rotation.y+=1.1*t,a.current.scale.setScalar(1+.25*Math.sin(3*e.clock.elapsedTime))}),window.React.createElement(window.React.Fragment,null,window.React.createElement("group",{onClick:function(){s.setState({openOverlay:!s.getState().openOverlay})}},window.React.createElement(g,null,window.React.createElement("mesh",{ref:a,geometry:n},window.React.createElement(h,{transmission:1,thickness:1,roughness:.3,color:"#ffffff",attenuationDistance:5,attenuationColor:"#00ffff",metalness:0,reflectivity:.5,chromaticAberration:0,transmissionSampler:!0,temporalDistortion:.5})))))}function v(e){var t=e.children,n=e.baseURL,a=e.preloader,i=void 0===a?null:a,c=e.onReady,l=void 0===c?function(){}:c,u=r(!1),w=u[0],f=u[1];return o(function(){s.getState().setBaseURL({baseURL:n}),new Promise(function(e){e()}).then(function(){l(),f(!0)})},[n,l]),w?t:i}function b(){return window.React.createElement(window.React.Fragment,null,window.React.createElement("group",null,window.React.createElement("group",{position:[0,2,0]},window.React.createElement(m,null)),window.React.createElement("group",{position:[0,-2,0]},window.React.createElement(R,null))))}function E(){var e=s(function(e){return e.openOverlay}),t=s(function(e){return e.text});return window.React.createElement(window.React.Fragment,null,e&&window.React.createElement(window.React.Fragment,null,window.React.createElement("div",{style:{position:"absolute",top:"0%",right:"0%",width:"100%",height:"100%"},onClick:function(){s.setState({openOverlay:!1})}}),window.React.createElement("div",{className:"shadow-2xl backdrop-blur-lg p-1 text-white rounded-2xl",style:{position:"absolute",top:"5%",right:"25%",width:"calc(50% + 0.75rem * 2)",height:"calc(10% + 0.75rem * 2)",border:"1px solid #888",boxShadow:"0px 0px 30px 0px #888"}},window.React.createElement("textarea",{className:"bg-transparent h-full p-3 w-full block text-white appearance-none bg-opacity-0 border-none outline-none focus:outline-none ",defaultValue:t,style:{background:"transparent",appearance:"none",resize:"none",outline:"none"},onChange:function(e){s.setState({text:e.target.value})}}))))}export{E as HTMLOverlay,v as Runtime,b as SmartObject};
