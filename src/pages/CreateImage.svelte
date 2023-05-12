<script lang="ts">
    import Image from "../components/utilities/input/Image.svelte";

    let imageValue = ""
    const imageProps = {
        name: "image",
        errorMessage: "Image must not be empty, or greater than 200kB",
        title: "formatted-image",
        info: "The url of this image is your data-string",
        regex: /^data:image\/.*/,
        kbSize: 300
    }
    

    const changeImage = (evt: CustomEvent<string>) => {imageValue = evt.detail}

</script>

<svelte:head>
    <title>Formatting An Image</title>
    <meta name="description" content="format an image to put in the data-store!" />
</svelte:head>


<section class="sg gap-[1rem_0] mt-4">
    <h1 class="text-3xl font-h text-gray-600">Formatting an Image</h1>
    <div>
        <Image value="{imageValue}" props="{imageProps}" on:change-image="{changeImage}" />
    </div>

</section>


<style lang="scss">
    section > * {
        grid-column: 2 / -2;
    }
</style>