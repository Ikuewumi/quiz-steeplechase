<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import { createEventDispatcher } from "svelte";
    export let heading = "Hading of Svelte";
    export let show = true
    const evt = createEventDispatcher()

    const closeModal = () => {evt("close-modal")}
</script>


<dialog class="fixed z-[10] inset-[0] h-[100vh] w-full bg-[var(--lightGray)] preview-dialog flex flex-col gap-[0] origin-top {show ? "active" : ""}">

    <div role="banner" class="font-h h-fit py-6 rounded-b-3xl shadow sg bg-white sticky top-[0]">
        <div class="flex flex-row text-gray-600">
            <strong class="text-3xl">{heading}</strong>
            <button on:click="{closeModal}" title="Close" class="custom-button btn bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white overlay flex flex-row gap-2 ml-auto px-4 py-1 items-center">
                <Icon icon="fa-solid fa-times"/>
                <span class="hidden md:flex">close</span>
            </button>
        </div>
    </div>

    <div class="content w-full sg">
        <slot />
    </div>

</dialog>


<style lang="scss">
dialog {
    transform-style: preserve-3d;
    perspective: 100px;
    transform: scaleY(0) rotateX(90deg);
    transform: rotateX(90deg);
    transition: transform 300ms ease-out;

    &.active {
        transform: scaleY(100%) rotateX(0);
        transform: rotateX(0);
    }
}

dialog > div.content {
    overflow-y: auto
}


dialog > div[role="banner"] > *,
dialog > div.content > * {
    grid-column: 2 / -2;

}
</style>