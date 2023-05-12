import type { Categories } from "../store/quiz"

export interface InputProps {
    title: string
    info: string
    name: string
    errorMessage: string
    regex: RegExp
}

export interface TextInputProps extends InputProps {
}

export interface ImageInputProps extends InputProps {
    kbSize: number
}

export interface ToastData {
    type: "loading" | "error" | "warning" | "info" | "success",
    text: string
}

export interface Metadata {
    title: string
    description: string
    categories: Categories,
    cover: string
}

export interface Author {
    id: number
    name: string
    biography: string
    profile: string
}


export interface Question {
    question: string,
    image?: string,
    options: string[],
    answer: string,
    feedback?: string
}



export type Category = Categories;