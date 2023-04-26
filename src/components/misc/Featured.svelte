<script lang="ts">
    import Card from "../utilities/Card.svelte";
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    let carouselContainer: HTMLElement;

    const toPrevious = () => { carouselContainer.scrollLeft -= 300 }
    const toNext = () => { carouselContainer.scrollLeft += 300 }

</script>

<section class="sg">
    <div class="container grid py-8 gap-[calc(var(--p-1)_*_1.5)_0] bg-white relative rounded-t-3xl md:px-10 px-5 overflow-y-hidden">

        <h2 class="text-3xl font-h text-gray-600 text-underline">Featured</h2>
        <Icon icon="fa-solid fa-bone" class="text-[#6c5ce7] absolute inset-[0.2em_0.2em_auto_auto] text-[10rem] opacity-[0.1]" />
        <div class="carousel-container w-inherit overflow-y-hidden" bind:this="{carouselContainer}">
            <div id="featured-carousel" class="carousel grid grid-flow-col-dense gap-[0_var(--p-2)] overflow-y-[auto] py-2">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>



        </div>
        <div class="controls text-2xl text-white mt-4 flex gap-[calc(var(--p-1))] mx-auto mx:mx-0 md:ml-auto" aria-labelledby="#featured-carousel">
            <button title="Previous" on:click="{toPrevious}">
                <i><Icon icon="fa-solid fa-chevron-left"  /></i>
                <span>Previous</span>
            </button>
            <button title="Next" on:click="{toNext}">
                <span>Next</span>
                <i><Icon icon="fa-solid fa-chevron-right"  /></i>
            </button>
        </div>
    </div>
</section>

<style>
    section > * {
        grid-column: 2 / -2;
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


    .carousel-container {
        scroll-snap-type: x mandatory;
    }

    .carousel {
        scroll-snap-type: x mandatory;
    }

    .controls button {
        padding: calc(var(--p-1) * 0.5) var(--p-2);
        background: #4b5563;
        border-radius: calc(var(--p-1) * 0.25);
        display: flex;
        align-items: center;
        border-radius: 0.2rem;
        gap: 0.5rem;
    }

</style>