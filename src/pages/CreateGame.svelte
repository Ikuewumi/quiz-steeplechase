<script lang="ts">
    import Input from "../components/utilities/Input.svelte";
</script>

<svelte:head>
    <title>Create New Game</title>
    <meta name="description" content="create a new picture game here!" />
</svelte:head>


<section class="sg gap-[1rem_0] mt-4">
    <h1 class="text-3xl font-h text-gray-600">Create New Game</h1>
    <p>Here, you can create a new quiz</p>
    <form on:submit|preventDefault class="flex md:flex-row gap-[2rem] items-start items-strech mt-5">
        <Input />   
        <Input />   
    </form>

</section>


<style lang="scss">
    section > * {
        grid-column: 2 / -2;
    }

    section > .field {
        grid-column: 2 / -2;
    }

    form  {
        flex-grow: 1;
    }
</style>