import { Drei, Fiber, React, Zustand } from "./LibraryCache";

/** @type {import("react").then((r) => r.useEffect)} */
export const useEffect = React.useEffect;

/** @type {import("react").then((r) => r.useState)} */
export const useState = React.useState;

/** @type {import("react").then((r) => r.useMemo)} */
export const useMemo = React.useMemo;

/** @type {import("react").then((r) => r.useRef)} */
export const useRef = React.useRef;

/** @type {import("react").then((r) => r.useCallback)} */
export const useCallback = React.useCallback;

/** @type {import("zustand").then((r) => r.create)} */
export const create = Zustand.create;

/** @type {import("@react-three/fiber").then((r) => r.Canvas)} */
export const Canvas = Fiber.Canvas;

/** @type {import("@react-three/fiber").then((r) => r.createPortal)} */
export const createPortal = Fiber.createPortal;

/** @type {import("@react-three/fiber").then((r) => r.useFrame)} */
export const useFrame = Fiber.useFrame;

/** @type {import("@react-three/drei").then((r) => r.Environment)} */
export const Environment = Drei.Environment;

/** @type {import("@react-three/drei").then((r) => r.OrbitControls)} */
export const OrbitControls = Drei.OrbitControls;

/** @type {import("@react-three/drei").then((r) => r.useGLTF)} */
export const useGLTF = Drei.useGLTF;

/** @type {import("@react-three/drei").then((r) => r.MeshRefractionMaterial)} */
export const MeshRefractionMaterial = Drei.MeshRefractionMaterial;

export { Drei, Fiber, React, Zustand };
