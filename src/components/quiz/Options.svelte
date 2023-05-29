<script>
import { question, chosenOptions, gameOptions } from "../../store/quiz.ts";
import { createEventDispatcher } from "svelte"

const evt = createEventDispatcher()


const chooseOption = (i=0) => {
  let isValid = i >=0 && i < $question.options.length;
  if (!isValid) return


  evt('choose-option', i)
}


</script>



<div role="menu" class="options flex md:flex-row flex-col flex-wrap mt-3 gap-[1rem] text-xl">

    {#each $question.options as option, index (index)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button role="menuitem" class="rounded-xl" aria-selected="{$chosenOptions.selected === index}" on:click="{chooseOption.bind(null, index)}" disabled="{$gameOptions.disabled}" data-correct="{$chosenOptions.correct === index}">{option}</button>
    {/each}

</div>






<style lang="scss">
 .options {
        
        button {
            --g: var(--white);
            --bg: var(--white);
            --clr: var(--black);
            --normal-shadow: 0px 0 2px -1px rgba(0 0 0 / 0.1);
            --custom-shadow: none;

            
            min-height: 70px;
            padding-block: 0.5rem;
            cursor: pointer;
            display: flex;
            place-items: center;
            place-content: center;
            text-align: center;
            background: var(--bg);
            color: var(--clr);
            box-shadow: var(--normal-shadow), var(--custom-shadow);
            transition: box-shadow 200ms ease-in-out;
            position: relative;

            &:hover {
                --custom-shadow: inset 0 0 200vmax 100vmax hsla(0, 0, 0, 0.397);
                --normal-shadow: -3px 0px 30px -9px rgba(0 0 0 / 0.3);
            }


            @media(min-width: 768px) {
                flex-basis: calc(50% - 1rem);
                flex-grow: 1;
            }


            &[aria-selected=true] {
                --bg: rgb(75, 85, 99);
                --clr: var(--white);
            }


            &[disabled=true] {
                filter: none;
                pointer-events: auto;
                cursor: not-allowed;
            }

            &[data-correct=true] {
                background: var(--green) !important;
                color: var(--white) !important;
            }

      }
}
</style>
