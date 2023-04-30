<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import { useShowHeader } from "../store/header";
    import { onDestroy, onMount } from "svelte";



    onMount(() => { $useShowHeader = false })
    onDestroy(() => { $useShowHeader = true })

</script>

<section data-game class="sg">
    <div data-container>
        
        
        <figure class="game-bar bg-white flex flex-row py-5 px-8 text-gray-600 rounded-xl">
            <strong class="flex items-center gap-[0.2rem] font-h text-3xl">
                <Icon icon="fa-solid fa-add" class="text-2xl" />
                <span>250</span>
            </strong>



            <div role="navigation" class="flex items-center ml-auto md:gap-[2rem] gap-[2rem]">
                
                <div class="lives flex flex-row gap-[0.4rem] h-[var(--h)]" title="3 lives left">
                    <span data-empty="false" data-life-bar class=""></span>
                    <span data-empty="true" data-life-bar class=""></span>
                    <span data-empty="false" data-life-bar class=""></span>
                </div>

                <button class="text-3xl" title="Help">
                    <Icon icon="fa-solid fa-circle-info" />
                </button>
                
                <button class="text-3xl" title="Exit!">
                    <Icon icon="fa-solid fa-right-from-bracket" />
                </button>
                
            </div>
        
        </figure>





        <div class="question">
            <p class="text-xl text-center py-2 px-2">Identify the labelled structure</p>
        </div>


        <div class="image rounded-xl">
            <img src="/organs.jpg" alt="">
        </div>





        <div role="menu" class="options flex md:flex-row flex-col flex-wrap mt-3 gap-[1rem] text-2xl px-3 md:px-0">
            <span tabindex="0" role="menuitem" data-chosen="true" data-correct="true" class="rounded-xl">Ammenorhea</span>
            <span tabindex="0" role="menuitem" class="rounded-xl">Purulent</span>
            <span tabindex="0" role="menuitem" class="rounded-xl">Veneral</span>
            <span tabindex="0" role="menuitem" class="rounded-xl">Intrmuscular</span>
        </div>










    </div>
</section>

<style lang="scss">

    section div[data-container]  {
        grid-column: 1 / -1;
        @media(min-width: 768px) {
            grid-column: 2 / -2;
            
        }
    }   


    .lives {
        --h: 25px;
        --w: 10px;
        --bg: #4B5563;
        --g: #4B5563;
        --bg: transparent;


        span {
            width: var(--w);
            background: var(--bg);
            border-radius: 10px 7px / 8px 9px;
            border: 2.6px solid var(--g);
            position: relative;
            
            
            &:before {
                position: absolute;
                content: '';
                border-radius: inherit;
                inset: auto 1px 1px 1px;
                height: 90%;
                background: var(--g);
                transform: scaleY(1);
                transform-origin: bottom;
                transition: 400ms ease-out;
            }
            
            
            &[data-empty=true]::before {
                transform: scaleY(0);
            }

        }
    }



    .image {
        width: 100%;
        height: min(300px, 50vh);
        overflow: hidden;
        background: var(--white);

        img {
            width: auto;
            margin-inline: auto;
            height: 100%;
            object-fit: cover;
        }
    }


    .options {
        
        span {
            --g: var(--white);
            --bg: var(--white);
            --normal-shadow: 0px 0 2px -1px rgba(0 0 0 / 0.1);
            --custom-shadow: none;

            
            height: 70px;
            cursor: pointer;
            display: flex;
            place-items: center;
            place-content: center;
            text-align: center;
            background: var(--bg);
            box-shadow: var(--normal-shadow), var(--custom-shadow);
            transition: 300ms ease-in-out;
            position: relative;

            &:hover {
                --custom-shadow: inset 0 0 200vmax 100vmax hsla(180, 100%, 99%, 0.897);
                --normal-shadow: -3px 0px 30px -9px rgba(0 0 0 / 0.3);
            }


            @media(min-width: 768px) {
                flex-basis: calc(50% - 1rem);
                flex-grow: 1;
            }




        }
    }

</style>