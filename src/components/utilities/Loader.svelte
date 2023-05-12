<script lang="ts">
    export let image="/loading.svg"
    export let message="Loading Data"
</script>


<div class="grid gap-0 rounded-xl overflow-hidden isolate">
    <img src="{image}"
        class="w-full py-4 bg-white rounded-xl shadow loading-img -mb-2"
        alt="{message}"/>
    <p 
        class="font-h z-[-1] text-center bg-[#00000010] text-2xl text-gray-600 py-4 px-2 pt-6">
        {message}...
    </p>
</div>


<style lang="scss">

</style>