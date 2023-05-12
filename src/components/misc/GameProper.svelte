<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import Loader from "../utilities/Loader.svelte";
    import {quizQuestion, quizImage, quizOptions, quizIsRunning, quizCorrect, quizScore, quizFeedback } from "../../store/quiz";
    import {Quiz} from "../../composables/quiz";
    import { onMount, createEventDispatcher, onDestroy } from "svelte";
    import type { StrapiItem, StrapiQuiz } from "../../types/api";
    import {sleep} from "../../composables/api";
    import { showToast } from "../../store/toast";





    export let data:StrapiItem<StrapiQuiz>["data"];    
    export let Game:Quiz = Quiz.getInstance(data);
    const evt = createEventDispatcher();

    let interval = 0;



    
    

    $: marked = false;
    $: markedString = ""
    $: optionIsChosen = (marked && $quizCorrect > "");
    $: optionIsCorrect = ($quizCorrect === markedString);
    // const 

    const chooseOption = async (option: string) => {
        markedString = option
        marked = true


        


        const correct = Game.mark(markedString)
        if (!correct) {
            showToast({
                "text": $quizFeedback || "Sorry, that was wrong",
                "type": $quizFeedback ? "info" : "error"
            }, 5000)
        }
        await sleep(1000)
        
        
        
        Game.next()
        marked = false
        markedString = ""


        


    }



    $: {

        if (!$quizIsRunning) evt("end-quiz")

    }


    

    

    onMount(() => {
        Game.begin()
    })

    onDestroy(() => {
        Game.unsubscribe()
        Game.reset()
        Game.kill()
    })
    
</script>




<section data-game class="sg gap-y-5 gap-x-5 my-3">
    {#if $quizIsRunning}
    <div data-container class="contents">
        
        
        <figure class="game-bar bg-white flex flex-row py-5 px-8 text-gray-600 rounded-xl">
            <strong class="flex items-center gap-[0.2rem] font-h text-3xl">
                <Icon icon="fa-solid fa-add" class="text-2xl" />
                <span>{$quizScore}</span>
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
                
                <button class="text-3xl" title="Exit!" on:click="{evt.bind(null,"end-quiz")}">
                    <Icon icon="fa-solid fa-right-from-bracket" />
                </button>
                
            </div>
        
        </figure>





        {#if $quizImage > ""}
        
            <div class="question bg-white shadow rounded-xl md:px-6 text-center py-2 px-2 text-2xl"><p>{$quizQuestion}</p></div>
            <div class="image rounded-xl"><img src="{$quizImage}" alt="{$quizQuestion}"></div>
        
        {:else}

            <div class="question-no-image rounded-xl flex place-items-center text-center bg-white shadow rounded-xl md:px-6 text-center text-gray-600 py-2 px-2 text-4xl min-h-[min(350px_50vh)] font-h">
                <p class="w-full md:max-w-[80%] mx-auto">{$quizQuestion}</p>
            </div>

        {/if}










        <div role="menu" class="options flex md:flex-row flex-col flex-wrap mt-3 gap-[1rem] text-xl">

            {#each $quizOptions as option, index (index)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <button on:click="{chooseOption.bind(null, option)}" disabled="{optionIsChosen}" data-disabled="{optionIsChosen}" tabindex="0" role="menuitem" data-chosen="{marked && markedString === option}" data-correct="{$quizCorrect===option}" class="rounded-xl">{option}</button>
            {/each}

        </div>










    </div>

    {:else}
    
    <Loader message="Setting up" />
    
    {/if}
</section>



<style lang="scss">
    
    
    
    section div[data-container]  {
        --img-h: min(300px, 50vh);
        grid-column: 2 / -2;

        &>* {
            grid-column: 1 / -1;
        }

        @media(min-width: 768px) {
            .question {
                grid-column: 1 / 4;
                display: flex;
                place-content: center;
                place-items: center;
            }

            .image {
                grid-column: 4 / -1;
            }
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

    .question-no-image, .image {
        height: var(--img-h);
    }



    .image {
        width: 100%;
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
        
        button {
            --g: var(--white);
            --bg: var(--white);
            --clr: var(--black);
            --normal-shadow: 0px 0 2px -1px rgba(0 0 0 / 0.1);
            --custom-shadow: none;

            
            height: 70px;
            cursor: pointer;
            display: flex;
            place-items: center;
            place-content: center;
            text-align: center;
            background: var(--bg);
            color: var(--clr);
            box-shadow: var(--normal-shadow), var(--custom-shadow);
            transition: 200ms ease-in-out;
            position: relative;

            &:hover {
                --custom-shadow: inset 0 0 200vmax 100vmax hsla(180, 100%, 99%, 0.897);
                --normal-shadow: -3px 0px 30px -9px rgba(0 0 0 / 0.3);
            }


            @media(min-width: 768px) {
                flex-basis: calc(50% - 1rem);
                flex-grow: 1;
            }




            &[data-chosen=true], &:hover[data-custom=true] {
                --clr:white;
                --custom-shadow: none;
            
                &[data-correct=true] {--bg: hsla(var(--greenHsl), 0.8);}
                &[data-correct=false] {--bg: hsla(var(--redHsl), 0.8);}
            }


            &:disabled {
                filter: none;
                pointer-events: none;
            }



        }
    }






</style>