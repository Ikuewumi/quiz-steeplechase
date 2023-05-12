<script lang="ts">
  import { EditorView, basicSetup } from "codemirror";
  import {EditorState} from "@codemirror/state";
  import { json as js } from "@codemirror/lang-json";
  import { onMount } from 'svelte';
  import {showToast} from "../../store/toast";
  import prettier from "prettier/standalone";
  import jsonFormatter from "prettier/parser-babel";



  let jsonContainer:HTMLDivElement;


  export let json: string = JSON.stringify({ 
    "name": "dummy text", 
    "json": "testing" 
  })

  $: jsonObject = () => {
    if (json) formatJson()
  }

  let view: EditorView;
  const copyToClipboard = async (str: string) => {
    try {
      const isValid = navigator && navigator.clipboard && navigator.clipboard.writeText
      if (!isValid) throw Error('The Clipboard API is not available.')


      await navigator.clipboard.writeText(str)
      showToast({ "type": "success", "text": "Copied to clipboard" })
      
      return str

    }
    catch(e) {
      showToast({ "text": e.message! as string, "type": "error" })
    }
  };

  onMount(() => {

    console.log(prettier, jsonFormatter)

    const formattedJson = prettier.format(json, {
      parser: "json",
      plugins: [jsonFormatter]
    });



    view = new EditorView({
      parent: jsonContainer,
      state: EditorState.create({
        doc: formattedJson,
        extensions: [basicSetup, EditorView.editable.of(false), js()]
      })
    });





    // console.log()

    // view.dispatch()
  })


  function formatJson() {
    const formattedJson = prettier.format(json, {
      parser: "json",
      plugins: [jsonFormatter]
    });

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: formattedJson }
    });
  }
</script>

<style lang="scss">
  figure {
    height: var(--block-h, 300px); /* Adjust the height as needed */

    line-height: 1.5;
    background-color: var(--white); 
    color: var(--black);
    font-size: var(--size-1);
    font-family: var(--mono-font);
    overflow: hidden;
  }

  .json-container {
    overflow-y: auto;
    scroll-padding: 2rem;
  }


  .copy-bar {
    border: 0 solid var(--customGray);
    border-block-end-width: 1px;

  }



</style>


<figure class="shadow rounded-xl overflow-x-hidden">

  <div class="bg-[#00000010] w-full flex py-2 px-2 copy-bar">
    <button on:click={copyToClipboard.bind(null, json)} class="custom-button btn px-3 py-1 overlay text-[1rem] flex items-center flex-row gap-2 bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white w-fit">
      Copy
    </button>
  </div>
  <div class="json-container h-full overlow-y-[auto]" bind:this={jsonContainer}></div>

  <figcaption class="sr-only"><slot/></figcaption>

</figure>
