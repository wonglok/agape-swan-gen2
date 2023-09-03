import { Blender } from "src-blender/Blender";

export default function Page() {
  if (process.env.NODE_ENV !== "development") {
    return <div>Blender Livelink is ready on local development server</div>;
  }
  return <Blender></Blender>;
}
//
/*


*/
