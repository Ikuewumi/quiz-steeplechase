<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import {toastData} from "../../store/toast";
</script>


<div role="alert" aria-atomic="true" aria-live="assertive" class="fixed inset-[auto_auto_0_0] w-[min(350px,90vw)] rounded-tr-xl z-[999] flex flex-row {$toastData.text.trim() > "" ? "active" : ""} {$toastData.type}">
    <i class="text-[40px] flex min-w-[50px] place-content-center place-items-center px-2 py-2 shadow-[inset_0px_0px_100px_20px_rgba(255_255_255_/_0.5)]">
        {#if $toastData.type === "error"}
        <Icon icon="fa-solid fa-bug" />
        {:else if $toastData.type === "loading"}
        <Icon icon="fa-solid fa-spinner" spin />
        {:else if $toastData.type === "warning"}
        <Icon icon="fa-solid fa-circle-exclamation" />
        {:else if $toastData.type === "info"}
        <Icon icon="fa-solid fa-circle-info" />
        {:else if $toastData.type === "success"}
        <Icon icon="fa-solid fa-check" />
        {/if}
    
    
    </i>

    <strong class="p-2 items-center place-content-center self-center">{$toastData.text}</strong>
</div>


<style lang="scss">
    div[role="alert"] {
        transition: 400ms ease;
        transform: translateY(100%);

        --bg: hsla(var(--redHsl), 0.8);
        --clr: var(--white);

        background: var(--bg);
        color: var(--clr);
        
        &.active {
            transform: translateY(0);
        }



        &.error {
            --bg: hsla(var(--redHsl), 0.8);
            --clr: var(--white);
        }

        &.info {
            --bg: hsla(var(--blueHsl), 0.8);
            --clr: var(--white);
        }

        &.warning {
            --bg: hsla(var(--yellowHsl), 0.8);
            --clr: var(--white);
        }
        &.success {
            --bg: hsla(var(--greenHsl), 0.8);
            --clr: var(--white);
        }

        &.loading {
            --bg: hsla(var(--orangeHsl), 0.8);
            --clr: var(--white);
        }

        &.error {
            --bg: hsla(var(--redHsl), 0.8);
            --clr: var(--white);
        }
    }
</style>