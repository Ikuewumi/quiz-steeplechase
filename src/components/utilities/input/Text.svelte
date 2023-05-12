<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import type { TextInputProps } from "../../../types";
    import { createEventDispatcher } from "svelte";

    $: errorPresent = () => {
        const a = !props.regex.test(value)
        return value === "" ? false : a
    };
    const evt = createEventDispatcher();


    export let value:string = "";
    let inputEl:HTMLInputElement;
    export let props:TextInputProps = {
        name: "name",
        errorMessage: "Did not match Regex, please try again",
        info: "The name of the dummy prop",
        title: "name",
        regex: /\w/
    }



    const changeValue = () => {
        evt("change-input", inputEl.value)
    }
</script>


<div class="field flex flex-col relative flex-[1] break-inside-avoid">
    <label for="{props.title}" class=" mb-[-0.5rem] py-1 px-3 bg-white w-fit h-fit leading-[1] translate-x-[1rem] z-[2] shadow rounded-xl">{props.name}</label>
    <input id="{props.title}" on:change="{changeValue}" bind:value={value} bind:this="{inputEl}" type="text" name="{props.name}" class="py-4 px-3 rounded-xl shadow-[0_0_5px_-2px_#0e0e0ee6]"/>
    <div class="flex flex-row justify-between mt-2 text-[1rem] {errorPresent() ? "text-red-500" : "text-gray-600"}">
        <small data-errror="{errorPresent()}" class="italic">{errorPresent() ? props.errorMessage :props.info }</small> 
        {#if errorPresent()}
            <Icon icon="fa-solid fa-bug" />
        {:else}
            <Icon icon="fa-solid fa-circle-info" />
        {/if}
    </div>
</div>




<style>
</style>