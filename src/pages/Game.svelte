<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import GamePreview from "../components/misc/GamePreview.svelte";
    import GameProper from "../components/misc/GameProper.svelte";
    import Loader from "../components/utilities/Loader.svelte"
    
    import { apiFetch } from "../composables/api";
    import { useShowHeader } from "../store/header";
    import {QuizNormal as Quiz} from "../classes/quizNormal.ts";
    import { onDestroy, onMount } from "svelte";
    import {location} from "svelte-spa-router";
    import type { StrapiItem, StrapiQuiz } from "../types/api";
    
    export let params: {id: string};
    let quizClass:Quiz

    const ctr = new AbortController()
    let quiz:StrapiItem<StrapiQuiz>["data"];
    let booleans = { startPage: false, previewPage: false, postQuiz: false }

    type Page = keyof typeof booleans;
    
 
    const toPage = (key: Page) => {
        Object.keys(booleans).forEach((k: Page) => {
            const newObj = { ...booleans }
            newObj[k] = (k===key)
            booleans = { ...booleans, ...newObj }
        })
    }


    async function getQuiz() {

        
        let apiData = await apiFetch(`quizzes/${params.id}`) as StrapiItem<StrapiQuiz>;
        quiz = apiData.data
        $useShowHeader = false
        console.log(quiz)
        return quiz



    }



    const startQuiz = () => {
        if (!quiz) return

        quizClass = new Quiz()
        quizClass.enterQuiz(quiz.attributes.questions)
        toPage("startPage");
    }




    let pr = getQuiz()

    

    onMount(() => {toPage("previewPage")})

    onDestroy(() => ctr.abort())






    onMount(() => { 
        console.log($location, params)
    })
    onDestroy(() => { $useShowHeader = true })

</script>

<svelte:head>
    <title>{quiz?.attributes.title}</title>
    <meta name="description" content="{quiz?.attributes.description}" />
</svelte:head>


<section class="sg gap-[1rem_0] page">


    {#await pr}
        <div class="mt-10"><Loader /></div>
    {:then quiz}
        
        {#if booleans.previewPage}
          <GamePreview data="{quiz}" on:start-quiz="{startQuiz}" />
        {:else if booleans.startPage && quizClass}
          <GameProper quizClass="{quizClass}" on:end-quiz="{toPage.bind(null, 'previewPage')}" />
        {/if}




    {:catch error}
        <div class="mt-10"><Loader image="/error.svg" message="Could not get data" /></div>
    {/await}


</section>




<style lang="scss">

   section {
    // place-items:center;
   }

</style>
