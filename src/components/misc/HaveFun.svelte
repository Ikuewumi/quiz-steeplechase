<script lang="ts"></script>

<section class="sg py-[6rem] pt-[8rem] mt-[-2rem] text-center gap-[calc(var(--size-1)_*_1.25)_0] rounded-2xl overflow-hidden">

    <h2 class="font-h text-4xl text-gray-700">Just wanna have fun?</h2>
    <p class="text-xl">Not sure what topic to be tested on? View our array of avaiilable quizzes</p>
    <a href="/#/archive" class="pointer custom-button overlay mx-auto text-3xl">To All</a>


</section>



<style lang="scss">
    section {
        background-image: url(/random.svg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        isolation: isolate;
        // z-index: -1;
        box-shadow: 0 0 2px -1px hsl(0deg 0% 0% / 80%);
        // border-radius: 4vmax;




        &::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            background-color: hsla(0deg 0% 100% / 80%);
        }
    
    
        * {
            grid-column: 2 / -2;
        }
    
        a {
            word-break: keep-all;
        }
    }
</style>