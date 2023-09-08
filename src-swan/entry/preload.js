export async function preload({ loadGlobals }) {
  await loadGlobals({
    globals: [
      /// essentials
      { name: 'react', needs: true },
      { name: 'three', needs: true },
      { name: 'zustand', needs: true },
      { name: '@react-three/fiber', needs: true },
      { name: '@react-three/drei', needs: true },

      // advanced
      { name: '@react-three/xr', needs: false },
      { name: 'three-stdlib', needs: false },
      { name: 'agape-sdk', needs: false },
    ],
  })
}
