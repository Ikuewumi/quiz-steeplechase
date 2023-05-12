<script lang="ts">
    import Input from ".input/Text.svelte";
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";

    let currentTab:"paste"|"link" = "link"

</script>


<dialog open class="fixed inset-[0] w-[100vw] h-[100vh] bg-[hsla(var(--blackHsl),_0.5)] sg z-[5] place-items-center">

    <section class="bg-white h-fit grid py-2 rounded-xl shadow-3xl">
        <strong class="px-4 pb-2 font-h text-3xl text-gray-600 border-solid border-b-2 border-gray-600">
            Image Picker
        </strong>




        <div role="region" class="content">
            <ul role="tablist" class="columns-2 gap-[0] text-center w-fit">
                <li><button class="w-full h-full py-2 px-5 border-solid border-gray-600" on:click="{() => {currentTab="link"}}" role="tab" aria-selected="{currentTab ==="link"}" aria-controls="use-link">Link</button></li>
                <li><button class="w-full h-full py-2 px-5 border-solid border-r-2 border-gray-600" on:click="{() => {currentTab="paste"}}" role="tab" aria-selected="{currentTab ==="paste"}" aria-controls="use-paste">Paste</button></li>
            </ul>



            <div class="tabs-content border-solid border-t-2 border-gray-600 px-5 py-5">
                <div role="tabpanel" id="use-link" class:selected="{currentTab ==="link"}">
                    <Input />
                </div>

                <div role="tabpanel" id="use-paste" class:selected="{currentTab ==="paste"}">
                    <span></span>

                    <button class="custom-button text-3xl outline" type="button">
                        <i class="text-2xl"><Icon icon="fa-solid fa-upload"/></i>
                        Upload
                    </button>
                    <p></p>
                </div>
            </div>





        </div>

        <small class="text-gray-900 text-center italic mb-4">
            Close this window by clicking outside the modal 
        </small>
    </section>


</dialog>



<style lang="scss">
dialog > section {
    width: min(500px, 80vw);
}


ul[role="tablist"] {
    column-rule: 2px solid var(--customGray);



    button[aria-selected="true"] {
        background-color: var(--customGray);
        color: var(--white);
    }
}


div[role="tabpanel"] {
    display: none;
    padding-block: 1rem;
    flex-direction: column;
    // place-items: center;

    &.selected {
        display: flex;
        
    }
}
</style>