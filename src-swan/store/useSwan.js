import { create } from 'zustand'

export const useSwan = create((set) => {
  return {
    baseURL: '',
    setBaseURL: ({ baseURL }) => {
      baseURL[baseURL.length - 1] === '/' ? baseURL.slice(0, baseURL.length - 1) : baseURL

      set({ baseURL })
    },

    //
    openOverlay: false,

    //
    text: 'Click Box',
  }
})
