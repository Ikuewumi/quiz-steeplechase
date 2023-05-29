import type {Question} from "../types/index";
import { writable } from "svelte/store";

export const quizScore = writable(0)
export const quizLives = writable(3)
export const quizOptions = writable([""])
export const quizQuestion = writable("")
export const quizImage = writable("")
export const quizCorrect = writable("")
export const quizFeedback = writable("")
export const quizIsRunning = writable(false)




//qC- for creation of a quiz
export const qCQuestion = writable({ question: "", answer: "", options: [], feedback: "", image: "" } as Question)
export const qCQuestions = writable([] as Question[])
export const qCEditQuestion = writable(-1)



interface Choice {
  question: number,
  option: number,
  id: number,
  correct: boolean,
  wrong: boolean
}

export const question = writable({
  question: "",
  options: [] as string[],
  image: "",
  id: 0
})

export const learnOptions = writable({
  score: 0,
  lives: 3
})

export const gameOptions = writable({
  disabled: false,
  feedback: ""
})

export const testOptions = writable({
  choices: [] as Choice[]
})


export const chosenOptions = writable({
  selected: -1,
  wrong: -1,
  right: -1,
  correction: false,
})



export const categories = [
    "Endocrinology",
    "Gastrointestinal System",
    "Urogenital System",
    "Reproductive System",
    "Respiratory System",
    "Nervous System",
    "Upper Limbs",
    "Lower Limbs",
    "Cell Body and Defense",
    "Hematology",
    "Physiology",
    "Oncology",
    "Head and Neck",
    "Pathology",
    "Other....",
    "Cardiovascular System",
    "Urinary System",
    "Clinical Applications",
] as const

export type Categories = typeof categories[number]
