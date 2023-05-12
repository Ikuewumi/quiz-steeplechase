<script lang="ts">
    import Card from "../utilities/Card.svelte";
    import Loader from "../utilities/Loader.svelte";
    import type {StrapiFeatured} from "../../types/api"
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    let carouselContainer: HTMLElement;
    export let quizzes:StrapiFeatured["quizzes"] = [];

    const toPrevious = () => { carouselContainer.scrollLeft -= 300 }
    const toNext = () => { carouselContainer.scrollLeft += 300 }

</script>

<section class="sg">
    <div class="md:shadow-[0_0_4px_-1px_hsla(var(--blackHsl),_0.6)] shadow-[0_0_3px_-1px_hsla(var(--blackHsl),_0.5)] grid py-8 pb-10 gap-[calc(var(--p-1)_*_1.5)_0] bg-white relative rounded-3xl md:px-10 px-5 overflow-y-hidden">

        <h2 class="text-3xl font-h text-gray-600 text-underline">Featured</h2>
        <Icon icon="fa-solid fa-bone" class="text-[#6c5ce7] absolute inset-[0.2em_0.2em_auto_auto] text-[10rem] opacity-[0.1]" />
        {#if quizzes.length}
        <div class="carousel-container w-inherit overflow-y-hidden" bind:this="{carouselContainer}">
            <div id="featured-carousel" class="carousel flex flex-row gap-[0_var(--p-2)] overflow-y-[auto] py-2">
                {#each quizzes as quiz, index}
                    <Card id="{quiz.id}" name="{quiz.title}" image="{quiz.cover}" />
                {/each}
            </div>



        </div>
        <div class="controls text-2xl text-white mt-4 flex gap-[calc(var(--p-1))] mx-auto mx:mx-0 md:ml-auto" aria-labelledby="#featured-carousel">
            <button class="custom-button overlay rounded-2xl px-6" title="Previous" on:click="{toPrevious}">
                <i class="text-xl hidden md:flex"><Icon icon="fa-solid fa-chevron-left"  /></i>
                <span>Previous</span>
            </button>
            <button class="custom-button overlay rounded-2xl px-6" title="Next" on:click="{toNext}">
                <span>Next</span>
                <i class="text-xl hidden md:flex"><Icon icon="fa-solid fa-chevron-right"  /></i>
            </button>
        </div>


        {:else}

        <div><Loader message="Loading featured" /></div>

        {/if}
    </div>
</section>

<style lang="scss">
    section > * {
        grid-column: 1 / -1;
        @media (min-width: 768px) {
            grid-column: 2 / -2;
        }
    }

    .carousel, .carousel-container {
        scroll-behavior: smooth;
    }

    .carousel-container::before {
        content: '';
        position: absolute;
        inset: 0 0 0 auto;
        width: 20%;
        background: #dfdbdb59;
        filter: blur(10px);
        z-index: -1;
    }


    .carousel::-webkit-scrollbar , .carousel-container::-webkit-scrollbar{
        /* appearance: none; */
        display:none;
    }

    .carousel, .carousel-container {
        scroll-snap-type: x mandatory;
        /* scroll-snap-align:; */
    }

    .controls button {

        display: flex;
        align-items: center;
        // border-radius: 0.2rem;
        gap: 0.5rem;
    }

</style>