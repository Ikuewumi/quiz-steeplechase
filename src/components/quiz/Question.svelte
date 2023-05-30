<script lang="ts">
    import {question} from "../../store/quiz.ts"
    import {img} from "../../store/image.ts";
</script>




        
  




  {#if $question.image > ""}
     <div 
      class="q bg-white shadow rounded-xl font-h md:px-6 text-center py-5 px-2 text-gray-600 question text-3xl">
      {$question.question}
    </div>    

    <div class="image rounded-xl" on:click="{_=>{$img=$question.image}}">
      <img src="{$question.image}" alt="{$question.question}">
    </div>
    
  {:else}


    <div 
      class="q bg-white shadow rounded-xl font-h md:px-6 text-center py-5 px-2 text-gray-600 question-no-image text-3xl w-full">
      {$question.question}
    </div>
  {/if} 




    <!--A tailwind class hack to get these ckasses to show up-->
    <div aria-hidden="true" class="hidden text-2xl text-3xl w-full">
    </div>








<style lang="scss">

  
  .question-no-image, .question {

    display: flex;
    place-content: center;
    place-items: center;

  }


    .question-no-image, .image {
        min-height: var(--img-h);
    }

    .image {
      height: var(--img-h);
    }



    .image {
        width: 100%;
        overflow: hidden;
        background: var(--white);

        img {
            width: auto;
            margin-inline: auto;
            height: inherit;
            object-fit: cover;
        }
    }




  @media (min-width: 850px) {
    
      .question {
          grid-column: 1 / 4;
      }

      .image {
          grid-column: 4 / -1;
      
      }

  } 



 
  


</style>
