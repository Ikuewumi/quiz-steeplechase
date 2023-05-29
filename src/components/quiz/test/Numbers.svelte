<script lang="ts">
import {question, testOptions} from "../../../store/quiz.ts";
import {type QuizNormal} from "../../../classes/quizNormal.ts";
import { onMount, onDestroy } from "svelte";

interface NumberMap {
    question: number 
    answer: number
    questionId: number
    correct: boolean
    wrong: boolean
}



let map:NumberMap[] = []
export let quizClass:QuizNormal


const rerender = () => {

    map = []
    const numberArray = Array.from({length: quizClass?.quizLength() || 0}, (_, index) => index)
    const choices = $testOptions.choices
    map = numberArray.map((num, i) => {
        const choice = choices.find((c) => num === c.question)

        return {
          question: num, answer: -1, questionId: quizClass.findId(num),
          correct: false, wrong: false, ...choice
        }
      
    })

    
}


onMount(() => {

    const unsub = question.subscribe(rerender)
    return unsub;



})









</script>


<div class="numbers gap-2 flex flex-row flex-wrap">

{#each map as n, i (i)}
  <button 
      on:click="{quizClass.show(n.question)}" 
      class="number font-h text-[1.45rem] font-bold rounded-xl bg-white text-gray-600 shadow" 
      aria-selected="{n.answer !== -1}" aria-onquestion="{n.questionId === $question.id}"
      data-correct="{n.correct}" data-wrong="{n.wrong}">
      {n.question + 1}
  </button>
{/each}




</div>




<style lang="scss">
  .numbers {

      overflow-x: hidden;
      margin: 1rem auto;
      place-content: center;
      place-items: center;
      width: 100%;
      grid-column: 1 / -1;

  }

  button.number {
    width: 40px;
    display: flex;
    place-content: center;
    place-items: center;
    aspect-ratio: 1;
    --_outline-clr: var(--outline-clr, var(--customGray));
    
    &[aria-selected=true] {
        background: var(--customGray);
        color: var(--white);
    }

     &[aria-selected=true]  {
      --outline-clr: var(--white);
    }
  
    &[data-wrong=true]  {
        background: var(--red) !important;
    }




    &[data-correct=true] {
        background: var(--green) !important;
    }



    &[aria-onquestion="true"] {
        outline: 2px solid var(--_outline-clr);
        outline-offset: -4px;      
    }
}
</style>
