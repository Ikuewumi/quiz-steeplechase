<script lang="ts">
import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
import {createEventDispatcher} from "svelte"
const evt = createEventDispatcher();


</script>

<figure class="game-bar bg-white flex flex-row py-5 px-8 text-gray-600 rounded-xl">
            <strong class="flex items-center gap-[0.2rem] font-h text-3xl">
                <Icon icon="fa-solid fa-add" class="text-2xl" />
                <span>4</span>
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
                
                <button class="text-3xl text-[var(--red)]" title="Exit!" on:click="{evt.bind(null,"end-quiz")}">
                    <Icon icon="fa-solid fa-times" />
                </button>
                
            </div>
        
        </figure>




<style lang="scss">

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


</style>

