import {type Writable, get} from "svelte/store";
import {type Question} from "../types/api";
import {type ToastData} from "../types/index.d.ts";
import {showToast} from "../store/toast.ts";
import {sleep} from "../composables/api.ts";
import {gameOptions, testOptions, chosenOptions, question} from "../store/quiz.ts";

export interface CustomQuestion {
   question: string
   options: string[]
   image: string
   id: number
}


export abstract class Quiz {
  private quiz: Question[]
  protected customQuiz: CustomQuestion[]
  protected running: boolean


  constructor() {
    this.quiz = [] as Question[]
    this.customQuiz = [] as CustomQuestion[]
    this.running = false;
  }


  quizLength() { return this.customQuiz.length; }


  resetQuiz() {
    this.quiz = []
    this.customQuiz = []
  }



  enterQuiz(questions:Question[]=[]) {
    this.reset()
    this.quiz = questions
    this.customQuiz = this.getCustomQuiz()
    this.running = false;
  }


  checkValidity() {
    const valid = this.quiz.length > 0 && this.customQuiz.length > 0 && this.running
    return valid;
  }


  abstract listen(): void;
  abstract unsub(): void;
  abstract choose(number: number): any;
  abstract next(): any;

  checkIndex(index: number) {
    const questionExists = this.quiz.length > 0 && this.customQuiz.length > 0 && this.customQuiz.length > index 
    return questionExists
  }

  findId(index: number):number {
    if (!this.checkIndex(index)) { 
      this.toast({text: 'could not find question', type: 'error'})
      return -1
    }
    return this.customQuiz[index].id
  }



  getQuestion(index: number) {
    if (!this.checkIndex(index)) { 
      this.toast({text: 'could not find question', type: 'error'}); 
      return {}
    }

    return this.customQuiz[index];
  }


  getAnswerIndex(index: number) {
      const id = this.findId(index)
      if (id === -1) {return}


      const answer = this.quiz.find(q => q.id === id).answer
      const answerIndex = this.customQuiz[index].options.findIndex(opt => opt === answer)



      return answerIndex
  }


  showQuestion(index: number, question:Writable<CustomQuestion> ) {
    if (!this.checkIndex(index)) return this.toast()
    chosenOptions.update(d => { return { ...d, selected: -1 } }) 
    const q = this.customQuiz.find((_, i) => i === index)
    question.set(q)
    const choices = get(testOptions).choices
    const choice = choices.find(choice => choice.question === index)


    if (choice) {
      chosenOptions.update(d => { return {...d, selected: choice.answer} })
    }

    gameOptions.update(d => { return { ...d, disabled: false}  });



    if (get(chosenOptions).correction) { 
      gameOptions.update(d => { return { ...d, disabled: true} })
      const obj = {
        correct: this.getAnswerIndex(index),
      
      }

      chosenOptions.update(d => { return {...d, ...obj} })
    }


  }


  toast(
      data: ToastData = {
        "type": "error",
        "text": "An error occured."
      }, ms = 700
  ) { return showToast(data, ms) }



  slp(ms=1000) {return sleep(ms)}


  protected getAnswer(id: number) {
      const quizQuestion = this.quiz.find(q => q.id === id)
      if (!quizQuestion) throw Error("cannot find question")
      console.log(quizQuestion)

      return quizQuestion



  }


  getCustomQuiz() {
        const customQuiz = this.quiz.map(q => {
            const m = {
              question: q.question,
              id: q.id,
              options: [...q.options, q.answer].sort(_=>Math.random()-0.5),
              image: q.image ?? ""
            }

            return m
        }).sort(_=>Math.random()-0.5)
        return customQuiz;
    }


  
    reset() {
      chosenOptions.set({
          selected: -1, wrong: -1, right: -1, correction: false,
      })

      testOptions.set({
          choices: []
      })

      question.set({
          question: "", options: [], image: "", id: 0,
      })

      gameOptions.set({
          disabled: true, feedback: "",
      })
    }

  




}

