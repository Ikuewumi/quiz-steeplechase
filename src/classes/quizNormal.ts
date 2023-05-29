import {type Question} from "../types/api.d.ts";
import {type CustomQuiz, Quiz} from "./quiz.ts";
import type {Writable, Unsubscribe} from "svelte/store";
import {get} from "svelte/store";
import {question, chosenOptions, testOptions, gameOptions} from "../store/quiz.ts"
import {quizMode, quizTime} from "../store/selects.ts";


export interface UnsubObject {
  [index: string]: Unsubscribe
}

export class QuizNormal extends Quiz {
  u?: UnsubObject


  constructor() {
    super();  
    this.u = {} as UnsubObject;
    this.index = -1;
  }


  



  start() {
      //TODO - Implement checking whether the questions even exist    
      this.listen()
      
      
  
  }




  listen() {
      this.show(0)
  }




  show(index) {
    this.index = index;
    const choice = get()
    return super.showQuestion(index, question) 
  }


  
  choose(userAnswer: number) {
    if (get(gameOptions).disabled && !(get(chosenOptions).correction)) {
        return super.toast();
    }

    gameOptions.update(d => { return { ...d, disabled: true } })
    chosenOptions.update(d => { return { ...d, selected: userAnswer } })


    const choice = {
      question: this.index, 
      answer: userAnswer,
      questionId: super.findId(this.index),
      correct: false,
      wrong: false
    }


    testOptions.update(
      oldObj => {
        return { ...oldObj, choices: this.processOptions(oldObj.choices, choice) }
      }
    )




    
    this.nxt()
  }


  private processOptions(choices, choice) {
    const p = (choices.findIndex(c => c.questionId === choice.questionId) === -1) ?
        [...choices, choice] : 
        [...choices.filter(c => c.questionId !== choice.questionId), choice]

    return p
  }


  async next() {
    if (!super.checkIndex(this.index + 1)) return this.show(0)
    this.show(this.index + 1)
  }

  async nxt() {    
    await super.slp(500)
    this.next()
  }


  async prev() {    
    if (this.index === 0) return this.show(super.quizLength() - 1)
    this.show(this.index - 1)
  }

  
  mark() {
      const choices = get(testOptions).choices
      const markedOptions = choices.map(choice => {

            const quizQuestion = super.getAnswer(choice.questionId);
            const answerIndex = super.getQuestion(choice.question).options[choice.answer]
            const correct = quizQuestion.answer === answerIndex



            const newChoice = {
              ...choice,
              correct,
              wrong: !correct
            }

            return newChoice

      })

      
     const correct = markedOptions.filter(option => option.correct).length



      testOptions.set({choices: markedOptions})
      chosenOptions.update(u => {
          return {
              ...u,
              correction: true,
          }
      })


      this.show(0);  
      return correct
  }

  



  unsub() { Object.keys(this.u).forEach(key => {this.u[key]()}) }

}
