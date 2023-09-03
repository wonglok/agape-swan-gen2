module.exports.generate = ({ libs }) => {
  libs.forEach((lib) => {
    if (lib.name === "three") {
      const three = require("three");
      const fs = require("fs");

      let str = `const G = window.Globals['three']; \n`;
      Object.keys(three).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }

    if (lib.name === "react") {
      const react = require("react");
      const fs = require("fs");

      let str = `const G = window.Globals['react']; \n`;
      Object.keys(react).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }

    if (lib.name === "zustand") {
      const zustand = require("zustand");
      const fs = require("fs");

      let str = `const G = window.Globals['zustand']; \n`;
      Object.keys(zustand).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }
    if (lib.name === "@react-three/fiber") {
      const r3f = require("@react-three/fiber");
      const fs = require("fs");

      let str = `const G = window.Globals["@react-three/fiber"]; \n`;
      Object.keys(r3f).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }
    if (lib.name === "@react-three/drei") {
      const mod = require("@react-three/drei");
      const fs = require("fs");

      let str = `const G = window.Globals["@react-three/drei"]; \n`;
      Object.keys(mod).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }
    if (lib.name === "@react-three/xr") {
      const mod = require("@react-three/xr");
      const fs = require("fs");

      let str = `const G = window.Globals["@react-three/xr"]; \n`;
      Object.keys(mod).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }

    if (lib.name === "three-stdlib") {
      const mod = require("three-stdlib");
      const fs = require("fs");

      let str = `const G = window.Globals["three-stdlib"]; \n`;
      Object.keys(mod).forEach((key) => {
        str += `export const ${key} = G.${key};\n`;
      });

      fs.writeFileSync(lib.writeTo, str);
      console.log(lib.name, lib.writeTo);
    }
  });
};
