<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import type { StrapiItem, StrapiQuiz } from "../../types/api";
    import { createEventDispatcher } from "svelte";



    const evt = createEventDispatcher()
    export let data:StrapiItem<StrapiQuiz>["data"]



    const startQuiz = () => evt("start-quiz")

</script>


<div class="img w-[100%] h-[var(--h)] rounded-b-2xl overflow-hidden shadow-2xl py-2 sticky top-0 z-[3] bg-white">
    <img class="cover object-cover object-center w-auto h-full mx-auto rounded-xl" src="{data.attributes.cover}" alt="{data.attributes.title}" />
</div>
<div class="grid gap-5 mt-2 ">
    <button class="category shadow-[0px_0px_3px_-1px_#000000] pointer rounded-xl text-[0.8rem] overlay-dark pointer text-gray-600 bg-white w-fit px-[4px] leading-[1] py-[4px] font-bold border-none tracking-[-0.5px]">
        {data.attributes.categories}
    </button>
    <h1 class="font-h text-5xl text-gray-800">{data.attributes.title}</h1>
    <p class="text-xl leading-[1.5]">{data.attributes.description}</p>


    <button 
        on:click="{startQuiz}"
        class="start bg-gray-600 font-h text-white btn overlay border-none text-4xl py-2 pb-3 px-9 w-fit ml-auto rounded-2xl outline-none mt-2">
        Start
    </button>
</div>





<style lang="scss">
    .img {
        --h: min(40vh, 300px);
        grid-column: 1 / -1;


        &:hover > img {
            transform: scale(1);
        }
    }

    img {
        transition: transform 400ms ease !important;
    }

    button.category {
        font-family: var(--custom-font);
    }

    button.start:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: -5px;
    }
</style>