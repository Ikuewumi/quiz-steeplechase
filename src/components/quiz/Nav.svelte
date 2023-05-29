<script lang="ts">
import {type QuizNormal} from "../../classes/quizNormal.ts";
import {createEventDispatcher} from "svelte";
import {testOptions, chosenOptions} from "../../store/quiz.ts";


export let quizClass:QuizNormal;
const evt = createEventDispatcher()
let disabled = true;

$: {
    if (quizClass && $testOptions.choices) {
        disabled = ($testOptions.choices.length / quizClass.quizLength()) < 1;
    }
}

const submit = () => evt('submit-quiz')

</script>

{#if quizClass}
<div class="font-h font-bold text-2xl navigation-bar flex flex-row flex-wrap gap-4" role="nav">
  <button class="overlay" on:click="{() => quizClass.prev()}">Previous</button>
  <button class="overlay" on:click="{() => quizClass.next()}">Next</button>
</div>
{#if !($chosenOptions.correction)}
<button disabled="{disabled}" class="overlay font-h font-bold submit text-3xl" on:click="{submit}">Submit</button>
{/if}

{/if}
<style lang="scss">
  button {
    text-transform: lowercase;
    padding: 0.85rem 3rem;
    background: hsla(var(--blackHsl), 0.2);
    color: var(--customGray);
    border-radius: 3rem;
    width: fit-content;


    &.submit {
        margin: 0 auto;
        background: var(--customGray);
        color: var(--white);

       
    } 
  
     &[disabled] {
            filter: blur(2px);
            cursor: not-allowed;
      }
  }


  .navigation-bar {
    grid-auto-flow: column;
    place-content: center;
    place-items: center;
  }
</style>
