!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).swan={})}(this,function(e){var t=window.Globals,n=t.react,o=t.three,a=t["@react-three/drei"],r=n.useEffect,i=n.useState,c=n.useRef,l=t["@react-three/fiber"].useFrame,s=a.useGLTF,u=(0,t.zustand.create)(function(e){return{openOverlay:!1,baseURL:"",text:"Click Box",setBaseURL:function(t){var n=t.baseURL;"/"===n[n.length-1]&&n.slice(0,n.length-1),e({baseURL:n})}}}),f=o.Clock,d=a.MeshTransmissionMaterial,w=a.Text3D,m=a.Center;function h(){var e=u(function(e){return e.baseURL}),t=u(function(e){return e.text}),n=c();return r(function(){var e=new f,t=function(t){var o=t.detail;e.getDelta();var a=o.animatedScroll,r=o.dimensions.scrollHeight-o.dimensions.height;console.log(a/r),n.current&&(n.current.rotation.y=a/r*Math.PI*2)};return window.addEventListener("lenis-scroll",t),function(){window.removeEventListener("lenis-scroll",t)}},[]),r(function(){e&&fetch(e+"/api/hi").then(function(e){return e.ok?e.json():{}}).then(function(e){return e.rand}).then(function(e){u.setState({text:"click da box \n"+e.toFixed(3)})})},[e]),window.React.createElement(window.React.Fragment,null,window.React.createElement("group",{ref:n},window.React.createElement(m,null,window.React.createElement(w,{height:.0125,bevelSize:.025,bevelSegments:5,bevelThickness:.1,scale:1,bevelEnabled:!0,font:e+"/fonts/days-font/Days_Regular.json"},""+t,window.React.createElement(d,{transmission:1,thickness:1,roughness:.3,color:"#ffffff",attenuationDistance:5,attenuationColor:"#0000ff",metalness:0,reflectivity:.5,chromaticAberration:0,transmissionSampler:!0,temporalDistortion:.5})))))}var p=a.MeshTransmissionMaterial,g=a.Center,R=n.useRef;function b(){var e=u(function(e){return e.baseURL}),t=s(e+"/geometry/box.glb");t.scene=t.scene.clone(!0);var n=!1;t.scene.traverse(function(e){e.geometry&&!n&&(n=e.geometry)});var o=R();return l(function(e,t){o.current.rotation.y+=1.1*t,o.current.scale.setScalar(1+.25*Math.sin(3*e.clock.elapsedTime))}),window.React.createElement(window.React.Fragment,null,window.React.createElement("group",{onClick:function(){u.setState({openOverlay:!u.getState().openOverlay})}},window.React.createElement(g,null,window.React.createElement("mesh",{ref:o,geometry:n},window.React.createElement(p,{transmission:1,thickness:1,roughness:.3,color:"#ffffff",attenuationDistance:5,attenuationColor:"#ff00ff",metalness:0,reflectivity:.5,chromaticAberration:0,transmissionSampler:!0,temporalDistortion:.5})))))}e.HTMLOverlay=function(){var e=u(function(e){return e.openOverlay}),t=u(function(e){return e.text});return window.React.createElement(window.React.Fragment,null,e&&window.React.createElement(window.React.Fragment,null,window.React.createElement("div",{style:{position:"absolute",top:"0%",right:"0%",width:"100%",height:"100%"},onClick:function(){u.setState({openOverlay:!1})}}),window.React.createElement("div",{className:"shadow-2xl backdrop-blur-lg p-1 text-white rounded-2xl",style:{position:"absolute",top:"5%",right:"25%",width:"calc(50% + 0.75rem * 2)",height:"calc(10% + 0.75rem * 2)",border:"1px solid #888",boxShadow:"0px 0px 30px 0px #888"}},window.React.createElement("textarea",{className:"bg-transparent h-full p-3 w-full block text-white appearance-none bg-opacity-0 border-none outline-none focus:outline-none ",defaultValue:t,style:{background:"transparent",appearance:"none",resize:"none",outline:"none"},onChange:function(e){u.setState({text:e.target.value})}}))))},e.Runtime=function(e){var t=e.children,n=e.baseURL,o=e.preloader,a=void 0===o?null:o,c=e.onReady,l=void 0===c?function(){}:c,s=i(!1),f=s[0],d=s[1];return r(function(){n&&u.getState().setBaseURL({baseURL:n}),new Promise(function(e){e()}).then(function(){l(),d(!0)})},[n,l]),f?t:a},e.SmartObject=function(){return window.React.createElement(window.React.Fragment,null,window.React.createElement("group",null,window.React.createElement("group",{position:[0,2,0]},window.React.createElement(h,null)),window.React.createElement("group",{position:[0,-2,0]},window.React.createElement(b,null))))}});
