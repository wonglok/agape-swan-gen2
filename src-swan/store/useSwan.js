import { create } from 'zustand'

export const useSwan = create((set) => {
  console.log(process.env.VERCEL_URL)
  return {
    baseURL: '',
    setBaseURL: ({ baseURL }) => {
      baseURL[baseURL.length - 1] === '/' ? baseURL.slice(0, baseURL.length - 1) : baseURL

      set({ baseURL })
    },
    vercelDeployedURL: process.env.VERCEL_URL,

    //
    openOverlay: false,

    //
    text: 'Click Box',
  }
})
