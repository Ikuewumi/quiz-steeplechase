import { writable } from "svelte/store";

export const quizScore = writable(0)
export const quizLives = writable(3)
export const quizOptions = writable(["Option A", "Option B", "Option C", "Option D"])
export const quizQuestion = writable("A single life")
export const quizImage = writable("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Abdominal_Quadrant_Regions.jpg/800px-Abdominal_Quadrant_Regions.jpg")
