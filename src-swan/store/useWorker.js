import { Clock } from 'three'
import { create } from 'zustand'

export const useWorker = create((set, get) => {
  let clock = new Clock()

  let tasks = []

  let rafID = 0
  let hh = () => {
    rafID = requestAnimationFrame(hh)
    tasks.forEach((fnc) => {
      fnc(null, clock.getDelta())
    })
  }
  rafID = requestAnimationFrame(hh)

  return {
    onLoop: (fnc) => {
      tasks.push(fnc)
    },
    // rotation: [0, 0, 0],
  }
})
