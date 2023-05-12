<script lang="ts">
import { onMount, onDestroy } from "svelte";
import Hero from "../components/home/Hero.svelte";
import Featured from "../components/misc/Featured.svelte";
import HaveFun from "../components/misc/HaveFun.svelte";
import type { StrapiItem, StrapiFeatured } from "../types/api";
import { apiFetch } from "../composables/api";


const featuredAbortSignal = new AbortController();
let featuredData:StrapiItem<StrapiFeatured>
let featuredDataQuizzes:StrapiItem<StrapiFeatured>["data"]["attributes"]["quizzes"] = []


onMount(async () => {
    featuredData = await apiFetch('featured', 'Loading data...', featuredAbortSignal.signal)
    featuredDataQuizzes = featuredData.data.attributes.quizzes

    console.log(featuredData)
})



onDestroy(() => {
    featuredAbortSignal.abort()
})




</script>

<svelte:head>
    <title>picquiz-home</title>
    <meta name="description" content="Picquiz | A fun forum to test your medical knowledge" />
</svelte:head>

<Hero />

    <Featured quizzes="{featuredDataQuizzes}" />
<HaveFun />
