<script lang="ts">
    import type { Question } from "../../types";
    import {createEventDispatcher} from "svelte";

    export let data:Question;
    export const evt = createEventDispatcher();


    const editQuestion = () => evt("edit-question")
    const deleteQuestion = () => evt("delete-question")
</script>


<div role="article" class="question-create-card flex flex-col h-fit rounded-xl bg-white relative isolate p-3 border-solid border-2 border-gray-600 gap-[0.5rem]">
    <strong class="font-[200]">{data.question}</strong>

    <div class="button-bar mb-2 px-1 py-1 ml-auto gap-[0.2rem]">
        <button class="custom-button btn px-3 py-1 bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white" on:click="{editQuestion}">edit</button>
        <button class="custom-button btn px-3 py-1 bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white" on:click="{deleteQuestion}">delete</button>
    </div>
</div>



<style lang="scss">
    div[role=article] {
        --_w: var(--w, 300px);
        min-width: min(var(--_w), 90vw);




        &::before {
            counter-increment: questions-counter;
            content: counter(questions-counter);
            font-family: var(--heading-font);



        }

        .button-bar {
            transition: 400ms ease;
        }
        
        @media (min-width: 768px) {
            .button-bar {
                opacity: 0;
            }
        }


        &:hover, &:focus-within, &:focus {
            .button-bar {
                opacity: 1
            }
        }
    }
</style>