import { useSwan } from "../store/useSwan.js";
import { TextRow } from "../components/TextRow.jsx";
import { DiamondBox } from "../components/DiamondBox.jsx";
import { useEffect, useState } from "../dx/ShortCut.js";
import { TheVortex } from "../components/TheVortex/TheVortex.js";

export function Runtime({
  children,
  baseURL,
  preloader = null,
  onReady = () => {},
}) {
  let [ready, setReady] = useState(false);
  useEffect(() => {
    if (baseURL) {
      useSwan.getState().setBaseURL({ baseURL });
    }

    new Promise((resolve) => {
      resolve();
    }).then(() => {
      onReady();
      setReady(true);
    });
  }, [baseURL, onReady]);

  return ready ? children : preloader;
}

export function SmartObject() {
  return (
    <>
      <group>
        <group position={[0, 0.0, 0]} scale={0.02 * 10}>
          <TheVortex></TheVortex>
        </group>

        <group position={[0, 2, 0]}>
          <TextRow></TextRow>
        </group>
        <group position={[0, -2, 0]}>
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
            <textarea
              className="bg-transparent h-full p-3 w-full block text-white appearance-none bg-opacity-0 border-none outline-none focus:outline-none "
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
            ></textarea>
            {/*  */}
          </div>
        </>
      )}
    </>
  );
}
