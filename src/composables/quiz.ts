import { quizLives, quizQuestion, quizOptions, quizImage, quizScore, quizCorrect, quizIsRunning, quizFeedback } from "../store/quiz";
import { writable, get } from "svelte/store";
import type {  Unsubscriber, Writable } from "svelte/store";
import type { StrapiItem, StrapiQuiz } from "../types/api";


interface Question {
    question: string,
    image?: string,
    options: string[],
    feedback?: string
}



export class Quiz {
    unSubObject: {
        quizLives: Unsubscriber,
        quizScore: Unsubscriber,
        quizOptions: Unsubscriber,
        quizQuestion: Unsubscriber,
        quizImage: Unsubscriber,
        quizCorrect: Unsubscriber,
        quizIndex: Unsubscriber,
        quizIsRunning: Unsubscriber,
        quizFeedback: Unsubscriber,
        
    }

    quiz: StrapiItem<StrapiQuiz>["data"]
    private questions: Question[];
    private index: Writable<number>;


    private static instance: Quiz;

    
    private constructor(quiz: StrapiItem<StrapiQuiz>["data"]) {
        this.unSubObject = {
            quizLives: null as unknown as Unsubscriber,
            quizScore: null as unknown as Unsubscriber,
            quizOptions: null as unknown as Unsubscriber,
            quizQuestion: null as unknown as Unsubscriber,
            quizImage: null as unknown as Unsubscriber,
            quizCorrect: null as unknown as Unsubscriber,
            quizIndex: null as unknown as Unsubscriber,
            quizIsRunning: null as unknown as Unsubscriber,
            quizFeedback: null as unknown as Unsubscriber,
        },




        this.quiz = quiz
        this.index = writable(-1)
        this.questions = quiz.attributes.questions.map(question => {
            const q:Question = {
                question: question.question,
                options: [...question.options, question.answer].sort(_ => Math.random() - 0.5),
                feedback: question?.feedback ?? "",
                image: question?.image ?? "",
            } 

            return q
        }).sort(() => Math.random() -0.5)

        
    }



    public static getInstance(props?: StrapiItem<StrapiQuiz>["data"]): Quiz {
        if (!Quiz.instance) {
            if (!props) throw Error("Cannot create quiz with no props");
            Quiz.instance = new Quiz(props);
        }
        return Quiz.instance;
    }
    


    resetAll() {
        quizCorrect.set("")
        quizImage.set("")
        quizLives.set(0)
        quizOptions.set([""])
        quizQuestion.set("")
        quizFeedback.set("")
    }



    listen(){
        this.unSubObject.quizLives = quizLives.subscribe(() => {})
        this.unSubObject.quizScore = quizScore.subscribe(() => {})
        this.unSubObject.quizOptions = quizOptions.subscribe(() => {})
        this.unSubObject.quizImage = quizImage.subscribe(() => {})
        this.unSubObject.quizQuestion = quizQuestion.subscribe(() => {})
        this.unSubObject.quizCorrect = quizCorrect.subscribe(() => {})
        this.unSubObject.quizFeedback = quizFeedback.subscribe(() => {})
        this.unSubObject.quizIsRunning = quizIsRunning.subscribe((val) => {
            if (!val) {this.resetAll()}
        })
        this.unSubObject.quizIndex = this.index.subscribe((index) => {
            const isValid = index >= 0 && index <= this.questions.length
            if (!isValid) {
                quizIsRunning.set(false)
                return isValid
            }


            quizIsRunning.set(true)

            this.setQuestion()



        })
    }


    kill() { Quiz.instance = null }


    



    unsubscribe() {
        this.unSubObject.quizLives()
        this.unSubObject.quizScore()
        this.unSubObject.quizOptions()
        this.unSubObject.quizImage()
        this.unSubObject.quizQuestion()
        this.unSubObject.quizCorrect()
        this.unSubObject.quizIndex()
        this.unSubObject.quizFeedback()
        this.unSubObject.quizIsRunning()
    }





    /**Hajime! - Japanese for begin */
    begin() {



        quizLives.set(3);
        this.listen()
        // this.index.set(-1);
        this.index.set(0);


    }


    next() { this.index.update(index=>index+1) }


    reset() {

        quizIsRunning.set(false)

    }









    setQuestion() {
        const running = get(quizIsRunning)
        if (!running) return


        const index = get(this.index)
        quizQuestion.set(this.questions[index].question)
        quizOptions.set(this.questions[index].options)
        quizImage.set(this.questions[index].image)
        quizFeedback.set(this.questions[index].feedback)
        quizCorrect.set(
            this.quiz.attributes.questions[this.findAnswer(this.questions[index].question)].answer
        )




    }


    findAnswer(currentquestion: string) {

        const index = this.quiz.attributes.questions.findIndex((q) => currentquestion === q.question)
        if (index < 0) throw Error("Something went wrong!")


        return index



    } 



    mark(option: string) {
        const correctAnswer = get(quizCorrect)
        const isCorrect = correctAnswer === option
        if (isCorrect) quizScore.update(score => score + 1)

        return isCorrect
    }








}