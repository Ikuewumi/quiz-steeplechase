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