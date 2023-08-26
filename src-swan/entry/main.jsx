import { useSwan } from "../store/useSwan";

import { YoSphere } from "../components/YoSphere";
import { DiamondBox } from "../components/DiamondBox";
import { Runtime } from "../store/Runtime";

export { Runtime };

export function SmartObject() {
  //
  return (
    <>
      <group>
        <group position={[0, 1.3, 0]}>
          <YoSphere></YoSphere>
        </group>
        <group position={[0, -1.3, 0]}>
          <DiamondBox></DiamondBox>
        </group>
      </group>
    </>
  );
}

export function HTMLOverlay() {
  let openOverlay = useSwan((r) => r.openOverlay);
  let text = useSwan((r) => r.text);
  return (
    <>
      {openOverlay && (
        <>
          <div
            style={{
              position: "absolute",
              top: `0%`,
              right: `0%`,
              width: `100%`,
              height: `100%`,
            }}
            onClick={() => {
              useSwan.setState({ openOverlay: false });
            }}
          ></div>

          <div
            className={`shadow-2xl backdrop-blur-lg p-1 text-white rounded-2xl`}
            style={{
              position: "absolute",
              top: `5%`,
              right: `25%`,
              width: `calc(50% + 0.75rem * 2)`,
              height: `calc(10% + 0.75rem * 2)`,
              border: "1px solid #888",
              boxShadow: "0px 0px 30px 0px #888",
            }}
          >
            {/*  */}
            <input
              className="bg-transparent p-3 w-full block text-white appearance-none bg-opacity-0 border-none outline-none focus:outline-none "
              defaultValue={text}
              style={{
                background: "transparent",
                appearance: "none",
                resize: "none",
                outline: "none",
              }}
              onChange={(ev) => {
                useSwan.setState({ text: ev.target.value });
              }}
            ></input>
            {/*  */}
          </div>
        </>
      )}
    </>
  );
}
