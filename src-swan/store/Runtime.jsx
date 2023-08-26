import { useSwan } from "../store/useSwan";
import { useEffect, useState } from "../dx/ShortCut";

export function Runtime({
  children,
  baseURL,
  preloader = null,
  onReady = () => {},
}) {
  let [ok, setOK] = useState(false);
  useEffect(() => {
    // remove trailing slash
    baseURL[baseURL.length - 1] === "/" ? baseURL.slice(0, -1) : baseURL;

    useSwan.setState({ baseURL: baseURL });

    new Promise((resolve) => {
      resolve();
    }).then(() => {
      onReady();
      setOK(true);
    });
  }, [baseURL, onReady]);

  return ok ? children : preloader;
}
