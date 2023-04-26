<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome"
</script>

<header class="w-full bg-white shadow sg py-6 rounded-b-3xl">
    <div class="header-container flex items-center flex-row justify-between font-h text-gray-600">
        <div class="logo flex flex-row items-center gap-[calc(var(--p-1)_*_0.5)]">            
            <Icon icon="fa-solid fa-lungs" class="text-4xl" />
            <h1 class="text-3xl">picquiz</h1>
        </div>




        <nav class="hidden md:flex flex-row gap-[calc(var(--p-5))] mb-[-0.4rem] text-xl">
            <a href="#/" class="header-link">
                <Icon icon="fa-solid fa-home" />
                <span>Home</span>
            </a>

            <a href="#/" class="header-link">
                <Icon icon="fa-solid fa-book" />
                <span>Archive</span>
            </a>


            <a href="#/" class="header-link">
                <Icon icon="fa-solid fa-list" />
                <span>More</span>
            </a>
        </nav>
    
    </div>
</header>

<style>
    header {
        --header-nav-width: 70px;
    }
    .header-container {
        grid-column: 2 / -2;
    }
</style>