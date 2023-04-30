import { quizLives, quizQuestion, quizOptions, quizImage, quizScore } from "../store/quiz";
import type { Unsubscriber } from "svelte/store";

export class Quiz {
    unSubObject: {
        quizLives: Unsubscriber,
        quizScore: Unsubscriber,
        quizOptions: Unsubscriber,
        quizQuestion: Unsubscriber,
        quizImage: Unsubscriber,
    }


    constructor() {
        this.unSubObject = {
            quizLives: null as unknown as Unsubscriber,
            quizScore: null as unknown as Unsubscriber,
            quizOptions: null as unknown as Unsubscriber,
            quizQuestion: null as unknown as Unsubscriber,
            quizImage: null as unknown as Unsubscriber,
        }
    }





    listen(){
        this.unSubObject.quizLives = quizLives.subscribe(() => {})
        this.unSubObject.quizScore = quizScore.subscribe(() => {})
        this.unSubObject.quizOptions = quizOptions.subscribe(() => {})
        this.unSubObject.quizImage = quizImage.subscribe(() => {})
        this.unSubObject.quizQuestion = quizQuestion.subscribe(() => {})
    }


    



    unsubscribe() {
        this.unSubObject.quizLives()
        this.unSubObject.quizScore()
        this.unSubObject.quizOptions()
        this.unSubObject.quizImage()
        this.unSubObject.quizQuestion()
    }






}