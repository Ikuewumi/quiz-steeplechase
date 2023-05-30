<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome"
    import { useShowHeader } from "../../store/header";
    import {type StrapiItem} from "../../types/api.d.ts";
    import {apiFetch} from "../../composables/api.ts";
    import {onMount, onDestroy} from "svelte";

    interface AdMessage {
        text: message
    }


    const ctr = new AbortController()
    let adText:string
    onMount(async () => {
        const res = await apiFetch('admessage', '', ctr.signal)
        console.log(res)
        adText=res?.data?.attributes?.text ?? ""
    })



    onDestroy(() => {
        ctr.abort()
    })
  

</script>

   {#if adText}
      <div class="admessage bg-gray-600 text-center font-h font-bold py-2 px-1 text-white">
         {adText}

         <button title="close" class="px-2 rounded-2xl" on:click="{() => adText = ""}"><Icon icon="fa-solid fa-times" /></button>
      </div>
    {/if}



<header class="w-full bg-white shadow sg py-6 rounded-b-3xl" class:hidden="{$useShowHeader === false}">
   
    <div class="header-container flex items-center flex-row justify-between font-h text-gray-600">
        <a href="/#/" class="logo flex flex-row items-center gap-[calc(var(--p-1)_*_0.5)] overlay">            
            <Icon icon="fa-solid fa-lungs" class="text-4xl" />
            <h1 class="text-3xl leading-[0.8]">picquiz</h1>
        </a>




        <nav class="hidden md:flex flex-row gap-[calc(var(--p-5))] mb-[-0.4rem] text-xl">
            <a href="#/" class="header-link">
                <Icon icon="fa-solid fa-home" />
                <span>Home</span>
            </a>

            <a href="#/archive" class="header-link">
                <Icon icon="fa-solid fa-book" />
                <span>Archive</span>
            </a>

          {#if false}
            <a href="#/" class="header-link">
                <Icon icon="fa-solid fa-list" />
                <span>More</span>
            </a>
          {/if}
        </nav>
    
    </div>


    

</header>

<style lang="scss">
    header {
        --header-nav-width: 70px;
        transform: scaleY(1);
        transition: 1000ms ease;

        &.hidden {
            transform: scaleY(0);
        }
    }
    .header-container {
        grid-column: 2 / -2;
    }

    .logo {
        position: relative;
        border-radius: 0.5rem;



        &:focus {
            outline: 2px dotted var(--customGray);
            outline-offset: 5px;
        }

    }
    .admessage {
        grid-column: 1 / -1;
        position: relative;


        button {
            outline: 2px solid var(--white);
            position: absolute;
            inset: auto 5px auto auto;

        }
    }
</style>
