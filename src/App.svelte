<script lang="ts">
import Router from "svelte-spa-router";
import Header from "./components/layout/Header.svelte";
import { routes } from "./router/index"
</script>

<main>
<Header />
<Router {routes} />
</main>

<style>
</style>
