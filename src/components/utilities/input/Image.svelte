<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import type { ImageInputProps } from "../../../types";
    import { getFileFromInput, readImageToText } from "../../../composables/image";
    import { createEventDispatcher } from "svelte";
    
    $: errorPresent = !props.regex.test(value);
    let inputEl: HTMLInputElement;
    const emitChangeEvent = createEventDispatcher()

    const changeImage = (str = "") => {
        emitChangeEvent("change-image", str)
    }


    export let value: string ="";
    export let props:ImageInputProps = {
        name: "name",
        errorMessage: "Did not match Regex, please try again",
        info: "The name of the dummy prop",
        title: "name",
        regex: /\w/,
        kbSize: 200
    }


    const checkFunction = async () => {
        const file = await getFileFromInput(inputEl, props.kbSize)
        const dataString = await readImageToText(file);

        changeImage(dataString)
    }


    
</script>


<div class="field flex flex-col relative flex-[1] break-inside-avoid">
    <label for="{props.title}" class=" mb-[-0.5rem] py-1 px-3 bg-white w-fit h-fit leading-[1] translate-x-[1rem] z-[2] shadow rounded-xl">{props.name}</label>
    <input bind:this="{inputEl}" id="{props.title}" on:change="{checkFunction}" type="file" accept="image/*" class="sr-only" aria-hidden="true">
    
    {#if value === ""}

        <button type="button" class="bg-white outline outline-offset-[-2px] outline-[2px] outline-gray-600 text-gray-600 hover:outline-white hover:bg-gray-600 hover:text-white focus-visible:outline-black focus-visible:text-black font-bold rounded-xl py-4 px-3 hover:shadow-2xl" on:click="{()=>inputEl.click()}">Choose Image</button>

    {:else}

        <figure class="result bg-white h-[250px] rounded-xl shadow overflow-hidden">
            <img src="{value}" alt="cover for quiz" class="object-cover h-[inherit] mx-auto">

            <div class="button-bar translate-y-[-100%] flex flex-row flex-wrap gap-1 p-2 rounded-xl border-solid border-2 border-gray-600 border-solid border-2 border-gray-600 w-fit bg-white">
                
                <button on:click="{()=>inputEl.click()}" class="custom-button px-5 py-1 bg-white text-gray-600 border border-solid border-2 border-[currentColor] hover:bg-gray-600 hover:text-white focus-visible:text-white focus-visible:bg-gray-600">edit</button>

                <button on:click="{changeImage.bind(null, "")}" class="custom-button px-5 py-1 bg-white text-gray-600 border border-solid border-2 border-[currentColor] hover:bg-gray-600 hover:text-white focus-visible:text-white focus-visible:bg-gray-600">remove</button>
            
            </div>

            <figcaption class="sr-only">Cover For Quiz</figcaption>
        </figure>

    {/if}

    



    <div class="flex flex-row justify-between mt-2 text-[1rem] {errorPresent ? "text-red-500" : "text-gray-600"}">
        <small data-errror="{errorPresent}" class="italic">{errorPresent ? props.errorMessage :props.info }</small> 
        {#if errorPresent}
            <Icon icon="fa-solid fa-bug" />
        {:else}
            <Icon icon="fa-solid fa-circle-info" />
        {/if}
    </div>


</div>




<style>
    button {
        transition: 300ms ease;
    }


</style>