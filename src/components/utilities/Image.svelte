<script lang="ts">
import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
import {img} from "../../store/image.ts";
</script>

{#if $img}
<section class="grid">

<img src="{$img}" alt="" />
<button title="Close" on:click="{() => $img = ""}" class="custom-button btn bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white overlay flex flex-row gap-2 ml-auto px-4 py-1 items-center">
    <Icon icon="fa-solid fa-times"/>
    <span class="hidden md:flex">close</span>
</button>

</section>
{/if}



<style lang="scss">

  section {
     width: 100vw;
     height: 100vh;
     background: hsla(var(--blackHsl), 0.5);
     position: fixed;
     z-index: 20;
     inset: 0;
     grid: 1fr / 1fr;
      isolate: isolate;


      & > * {
          grid-column: 1 / -1; 
          grid-row: 1 / -1;
      }



      img {
          place-self: center;
          max-width: min(600px, 100vw);
          max-height: 90vh;
          background: #fff;
      }


      button {
          align-self: start;
          justify-self: end;
          margin-right: 2.5rem;
          margin-top: 0.5rem;
      }



  }

</style>
