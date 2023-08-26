import { useSwan } from "../store/useSwan";
import { useRef, useEffect } from "../dx/ShortCut";
import { THREE, Drei } from "../dx/LibraryCache";

let { Clock } = THREE;
let { MeshTransmissionMaterial, Text3D, Center } = Drei;

export function TextRow() {
  let baseURL = useSwan((r) => r.baseURL);
  let text = useSwan((r) => r.text);
  let tjRef = useRef();

  useEffect(() => {
    let clock = new Clock();
    let lenisScroll = ({ detail }) => {
      // console.log(detail);
      let dt = clock.getDelta();
      let current = detail.animatedScroll;
      let total = detail.dimensions.scrollHeight - detail.dimensions.height;

      let pageHeight = detail.dimensions.height;

      console.log(current / total);

      // console.log(
      //   detail.animatedScroll,
      //   detail.dimensions.scrollHeight - detail.dimensions.height
      // );

      if (tjRef.current) {
        tjRef.current.rotation.y = (current / total) * Math.PI * 2.0;
      }
    };

    window.addEventListener("lenis-scroll", lenisScroll);
    return () => {
      window.removeEventListener("lenis-scroll", lenisScroll);
    };
  }, []);

  useEffect(() => {
    if (!baseURL) {
      return;
    }
    fetch(`${baseURL}/api/hi`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((r) => r.rand)
      .then((v) => {
        useSwan.setState({
          text: `hi from server.\nrandom number - ${(v * 100).toFixed(0)}`,
        });
      });
  }, [baseURL]);

  return (
    <>
      <group ref={tjRef}>
        <Center>
          <Text3D
            height={0.0125}
            bevelSize={0.025}
            bevelSegments={5}
            bevelThickness={0.1}
            scale={1}
            bevelEnabled={true}
            font={`${baseURL}/fonts/days-font/Days_Regular.json`}
          >
            {`${text}`}
            <MeshTransmissionMaterial
              transmission={1}
              thickness={1.0}
              roughness={0.3}
              color={"#ffffff"}
              attenuationDistance={5}
              attenuationColor={"#0000ff"}
              metalness={0.0}
              reflectivity={0.5}
              chromaticAberration={0.0}
              transmissionSampler
              temporalDistortion={0.5}
            ></MeshTransmissionMaterial>
          </Text3D>
        </Center>
      </group>
    </>
  );
}

//

//
