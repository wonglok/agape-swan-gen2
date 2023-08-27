import { create } from "zustand";

export const useSwan = create((set) => {
  return {
    openOverlay: false,
    baseURL: "",
    text: "Click Box",
    setBaseURL: ({ baseURL }) => {
      baseURL[baseURL.length - 1] === "/"
        ? baseURL.slice(0, baseURL.length - 1)
        : baseURL;

      set({ baseURL });
    },
  };
});
