<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const evt = createEventDispatcher()
    export let name = "GIT Anatomy";
    export let id:number;
    export let image = "";
    let cardEl:HTMLElement;




    $: {
        if (image > "") {
            cardEl?.style.setProperty("--bg-img", `url(${image})`)
        } 
    }

    const cardClick = () => evt("card-click")








    


</script>

<div class="card" bind:this="{cardEl}" >
    <a href="{`#/game/${id}`}" class="text-4xl max-w-[90%] mx-auto font-h text-gray-700 hover:text-gray-900" tabindex="0"
        on:click="{cardClick}">
        {name}
    </a>
</div>


<style lang="scss">
    .card {
        --dimension: 350px;
        --bg-img: none;
        transition: 400ms ease;
        scroll-snap-align: center;
        min-width: min(350px, 90vw);
        max-height: 270px;

        flex-grow: 1;

        
        @media (max-width: 768px) {
            // --dimension: 89vw;
        }
    }

    a {
        text-align: left;
    }
</style>