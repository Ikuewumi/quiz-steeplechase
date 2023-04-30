<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome"
    import { useShowHeader } from "../../store/header";

</script>

<header class="w-full bg-white shadow sg py-6 rounded-b-3xl" class:hidden="{$useShowHeader === false}">
    <div class="header-container flex items-center flex-row justify-between font-h text-gray-600">
        <div class="logo flex flex-row items-center gap-[calc(var(--p-1)_*_0.5)]">            
            <Icon icon="fa-solid fa-lungs" class="text-4xl" />
            <h1 class="text-3xl leading-[0.8]">picquiz</h1>
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

<style lang="scss">
    header {
        --header-nav-width: 70px;
        transform: scaleY(1);
        transition: 1000ms ease;

        &.hidden {
            transform: scaleY(0);
        }
    }
    .header-container {
        grid-column: 2 / -2;
    }
</style>