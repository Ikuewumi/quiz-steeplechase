<script lang="ts">
    import { onDestroy } from "svelte";
    import qs from "qs"
    import C from "../components/utilities/C.svelte";
    import Loader from "../components/utilities/Loader.svelte"
    import {apiFetch} from "../composables/api";
    import type { StrapiList, StrapiQuiz } from "../types/api";


    const ctr = new AbortController()
    let page = 1
    let total = 1
    let pageSize = 10
    let quizzes:StrapiList<StrapiQuiz>["data"] = [];
    $: morePages = (total - quizzes.length) > 0 




    // quizzes = getQuizzes()


    async function getQuizzes() {

        let query = qs.stringify(
            {pagination: {page, pageSize}},
            {encodeValuesOnly: true,}
        )
        let apiData = await apiFetch(`quizzes?${query}`) as StrapiList<StrapiQuiz>;
        total = apiData.meta.pagination.total
        pageSize = apiData.meta.pagination.pageSize
        page = morePages ? (page + 1) : page;
        quizzes = [...quizzes, ...apiData.data]
        return quizzes


    }

    let pr = getQuizzes()

    // onMount(() => {getQuizzes()})

    onDestroy(() => ctr.abort())




</script>


<svelte:head>
    <title>archive - See all our quizzes</title>
    <meta name="description" content="see the list of the quizzes!" />
</svelte:head>


<section class="sg gap-[1rem_0] mt-4">

    <h1 class="text-3xl font-h text-gray-600">Archive</h1>
    <p>See all our quizzes here</p>


    {#await pr}
        <div>
            <Loader />
        </div>
    {:then quizzes}
               
        <ul data-card-list class="carousel grid gap-[var(--p-2)] overflow-y-[auto] py-2">
            {#each quizzes as quiz, index}
                <li class="contents">
                    <C title="{quiz.attributes.title}" 
                       category="{quiz.attributes.categories}"
                       id="{quiz.id}" />
                </li>    
            {/each}
        </ul>


        {#if morePages}
            <button class="btn">Load More...</button>
        {/if}

    {:catch error}
        <div>
            <Loader image="/error.svg" message="{error}" />
        </div>  
    {/await}


</section>





<style lang="scss">
    section {
        &>* {
            grid-column: 2 / -2;
        }
    }


    ul {
        --w: 300px;
        // counter-reset: questions-counter;
        grid-template-columns: repeat(auto-fill, minmax(var(--w), 1fr));
    }
</style>