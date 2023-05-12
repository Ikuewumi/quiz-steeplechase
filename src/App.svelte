<script lang="ts">
import Router from "svelte-spa-router";
import Toast from "./components/misc/Toast.svelte";
import Header from "./components/layout/Header.svelte";
import { routes } from "./router/index"
</script>

<div class="contents">
    <Header />
    <Router {routes} />
    <Toast />
</div>

<style>
</style>
