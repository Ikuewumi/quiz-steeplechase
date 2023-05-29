<script lang="ts">
  import {createEventDispatcher} from "svelte";

  export let options = ["test", "learning"]
  export let selected = 0
  const evt = createEventDispatcher()


  const selectOption = (number = 0) => { evt("select-option", number) }





</script>



<div role="listbox" class="select-menu pb-2 grid">
    
    {#each options as option, index (index) }
      <button tabindex="0" aria-selected="{selected === index}" role="option" 
        on:click="{selectOption.bind(null, index)}">
        {option}
      </button>
    {/each}


</div>


<style lang="scss">
.select-menu {
  height: var(--select-h, 150px);
  grid-auto-columns: var(--select-min-w, 300px);
  grid-auto-flow: column;
  gap: var(--select-gap, 2rem);
  font-size: var(--select-size, 2rem);
  font-weight: var(--select-weight, 600);
  overflow: auto hidden;



  button[role=option] {
    --normal-shadow: 0 1px 2px -0.5px hsla(var(--blackHsl), 0.2);
    --_select-overlay: var(--select-overlay, hsla(var(--blueHsl), 0.03));


    background: var(--select-el-bg, var(--white));
    color: var(--select-el-clr, var(--customGray));
    display: grid;
    place-content: center;
    place-items: center;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: var(--normal-shadow);
    isolation: isolate;
    position: relative;
    transition: background 200ms ease, color 200ms ease;



    &[aria-selected=true] {
        background: var(--select-el-bg-s, hsla(var(--blueHsl), 0.8));
        color: var(--select-el-clr-s, var(--white));
    }

    


    &::before {
      content: '';
      pointer-events: none;
      inset: 0;
      position: absolute;
      z-index: 2;
      background: var(--_select-overlay);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 200ms ease;
    }



    &:hover::before {
        opacity: 1;
    }


  }

}
</style>
