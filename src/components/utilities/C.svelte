<script lang="ts">
    import type { Category } from "../../types/index"

    export let title = "GIT Anatomy";
    export let category: Category = "Other....";
    export let id:number = 1;


    


</script>

<div class="c px-5 py-3 grid gap-1 bg-white rounded-xl shadow pb-4 hover:translate-y-[-5px] hover:shadow-2xl">

    <button class="shadow-[0px_0px_3px_-1px_#000000] pointer rounded-xl text-[0.8rem] overlay-dark pointer text-gray-600 bg-white w-fit px-[4px] leading-[1] py-[4px] font-bold border-none tracking-[-0.5px]">
        {category}  
    </button>

    <a href="/#/game/{id}" class="text-2xl w-fit text-gray-600 overlay font-h focus:underline hover:text-gray-700">{title}</a>


</div>


<style lang="scss">
    div {
        --_w: var(--w, 300px);
        min-width: min(var(--_w), 90vw);


        transition: transform 500ms ease-out
    }

    button {
        font-family: var(--custom-font);
        // border-width: 0px;
        // box-shadow: 0px 0px 3px -1px #00000020;
    }
</style>