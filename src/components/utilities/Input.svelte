<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
</script>


<div class="field flex flex-col relative flex-[1]">
    <label for="name" class=" mb-[-0.5rem] py-1 px-3 bg-white w-fit h-fit leading-[1] translate-x-[1rem] z-[2] shadow rounded-xl">name</label>
    <!-- <input id="name" type="text" name="name" placeholder="Name of Person" class="py-4 px-3 rounded-xl shadow"/> -->
    <textarea id="name" name="name" placeholder="Name of Person" class="py-4 px-3 rounded-xl shadow"></textarea>
    <div class="flex flex-row justify-between mt-2 text-[1rem] text-gray-600">
        <small data-description class="italic">A world of lorem ipsum</small>    
        <Icon icon="fa-solid fa-circle-info" title="Information about this input" />
    </div>
    <!-- <small data-error>Something went wrong!</small>     -->
</div>




<style>
    .field {

    }


</style>