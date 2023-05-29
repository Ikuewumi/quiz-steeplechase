<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let svgEl: SVGElement
  export let percent:number = 0
  const evt = createEventDispatcher()


  const toCorrection = () => evt('to-correction')

</script>


<section class="grid gap-5 mt-5">
<figure class="grid-flow">
    <svg role="progressbar" bind:this="{svgEl}" style="--percent: {percent}">
        <circle class="track" />
        <circle class="progress" />
    </svg>

    <strong class="text-gray-600 text-[4rem] font-h">
        {percent}<span class="text-2xl">%</span>
    </strong>




</figure>


<button on:click="{toCorrection}" class="p-[0.85rem_3rem] bg-gray-600 text-white lowercase rounded-[100vmax] mx-auto font-h text-4xl mt-5 overlay">to correction</button>

</section>



<style lang="scss">
   figure {
        margin: auto;
        height: fit-content;
        grid: 1fr / 1fr;
        display: grid;
        width: fit-content;


        & > * {

            grid-column: 1 / -1;
            grid-row: 1 / -1;

        }
    }

    svg {

        --_dimension: var(--dimension, 200px);
        --_stroke-width: var(--stroke-width, 10px);
        --_stroke-clr: var(--stroke-clr, hsla(var(--blackHsl), 0.05));
        --_fill: var(--fill, transparent);
        --offset: 0;
        --percent: 0;


        width: var(--_dimension);
        height: var(--_dimension);


        circle.progress {
            --_stroke-width: 14px;
            --_stroke-clr: var(--customGray);

            // Just the length of the circumference
            --dashArray: calc(2 * 22 / 7 * var(--r));
            
            stroke-dasharray: var(--dashArray);
            stroke-dashoffset: calc(var(--dashArray) * ((100 - var(--percent)) / 100));
            transform: rotate(-90deg);
            transform-origin: center center;
            transition: stroke-dashoffset 300ms ease-out;
        }




        circle {
            --r: calc((var(--_dimension) - var(--_stroke-width)) / 2);


            cx: calc(var(--_dimension) / 2);
            cy: calc(var(--_dimension) / 2);
            r: var(--r);
            stroke-width: var(--_stroke-width);
            stroke-linecap: round;



            stroke: var(--_stroke-clr);
            fill: var(--_fill);
        }
    
    }

    strong {
        // margin: auto;
        place-self: center;
    }

</style>
