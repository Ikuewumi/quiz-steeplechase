import {writable} from "svelte/store"


export const quizMode = writable({
  options: ["test", "learn"],
  selected: 0
})


export const quizTime = writable({
  options: [5, 10, 15],
  selected: 0
})
