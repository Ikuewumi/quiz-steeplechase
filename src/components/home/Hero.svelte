<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome"
</script>

<section class="text-center h-[400px] sg flex items-center place-content-center text-6xl font-h text-gray-600 relative overflow-hidden">
    <h2 class="w-[min(600px,90vw)] mx-auto leading-[1.4] drop-shadow-sm">A place to <span class="font-bold">test</span> your knowledge</h2>

    <Icon icon="fa-solid fa-book-open" class="absolute inset-[auto_auto_50%_20%] text-[20rem] text-[#6c5ce7] rotate-[45deg] z-[-1] opacity-[0.2]"/>
</section>


<style>
    h2 {
        grid-column: 2 / -2;
    }

    span {
        color: transparent;
        background: linear-gradient(#636e72, #6c5ce7);
        background-clip: border-box;
        -webkit-background-clip: text;
    }
</style>