<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import Loader from "../utilities/Loader.svelte";
import {QuizNormal as Quiz} from "../../classes/quizNormal.ts";
    import {onMount,createEventDispatcher,onDestroy} from "svelte";
    import type {StrapiItem,StrapiQuiz} from "../../types/api";
    import {sleep} from "../../composables/api";
    import {showToast} from "../../store/toast";

    import Nav from "../quiz/Nav.svelte"
    import Numbers from "../quiz/test/Numbers.svelte"
    import Question from "../quiz/Question.svelte";
    import Options from "../quiz/Options.svelte"
    import PostQuiz from "../quiz/PostQuiz.svelte";
    import GameBar from "../quiz/GameBar.svelte";
    


    
    export let quizClass:Quiz;
    const evt = createEventDispatcher();

    
    onMount(() => {
      quizClass.start()
      nav("quiz")
    })

    onDestroy(() => {quizClass.reset()})


    let interval = 0;


      let score = 0;


  let booleans = {
    "correction": false,
    "quiz": false,
    "score": false,
  }


  const nav = (k: string) => {
      console.log(booleans)

      Object.keys(booleans).forEach(key => {
         booleans[key] = (k === key)
      })
  }




    const mark = async() => {
      showToast({type: 'loading', text: 'Marking the quiz'}, 1000)
      await sleep(1000)
      const s = quizClass.mark()
      score = Math.floor((s / quizClass.quizLength()) * 100)
      nav("score")
  }


  const toCorrection = () => {
      nav("quiz")
  }



 
    
    
</script>


    {#if quizClass}
    <div id="game" class="mt-4 sg gap-4">
        
        
        
    <GameBar on:exit-quiz="{evt.bind(null, 'exit-quiz')}" />



          
    {#if booleans.quiz}
      
      <Question />
      <Options on:choose-option="{(evt) => quizClass.choose(evt.detail)}" />
      <Numbers quizClass="{quizClass}" />
      <Nav quizClass="{quizClass}" on:submit-quiz="{mark}" />

    {:else if booleans.score}
    
        <PostQuiz on:to-correction="{toCorrection}" percent="{score}"/>   
  
    {:else}
    
         <Loader message="Setting Quiz Up" />

     {/if}






    </div>

    {:else}
    
        <Loader message="An Error occured" image="/error.svg" />
    
    {/if}




<style lang="scss">
    
    
    
div#game {
  grid-column: 2 / -2;
  --img-h: min(250px, 50vh);

}


   





</style>
