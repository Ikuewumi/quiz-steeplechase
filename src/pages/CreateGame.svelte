<script lang="ts">
    import {FontAwesomeIcon as Icon} from "@fortawesome/svelte-fontawesome";
    import InputText from "../components/utilities/input/Text.svelte";
    import InputTextarea from "../components/utilities/input/Textarea.svelte";
    import InputImage from "../components/utilities/input/Image.svelte";
    import QCard from "../components/utilities/QCard.svelte";
    import Toast from "../components/misc/Toast.svelte"
    import Preview from "../components/utilities/Preview.svelte";
    import CodeBlock from "../components/utilities/CodeBlock.svelte";
    import type { ImageInputProps, TextInputProps } from "../types";
    import { showToast } from "../store/toast";
    import {qCQuestion, qCQuestions, qCEditQuestion} from "../store/quiz";


    let tabIsMeta = true



    let qShow = false
    const qClosePreview = () => {
        $qCQuestion = { question: "", answer: "", options: [], feedback: "", image: "" }
        $qCEditQuestion = -1
        qShow = false 
    }
    const qShowPreview = () => {
        qShow = true
    }

    // let qQuestion = ""



    const nameProps:TextInputProps = {
        name: "title",
        errorMessage: "Title cannot be empty, or less than 5 chars",
        title: "title",
        info: "The title of the quiz",
        regex: /^.{5,30}$/
    }

    const descriptionProps:TextInputProps = {
        name: "description",
        errorMessage: "Description must be between 15 and 70 characters",
        title: "bio",
        info: "Some descriptive text about the quiz",
        regex: /^.{15,70}$/
    }

    const imageProps: ImageInputProps = {
        name: "cover",
        errorMessage: "Cover Image must not be empty, or greater than 200kB",
        title: "cover",
        info: "The cover image of this picture quiz",
        regex: /^data:image\/.*/,
        kbSize: 200
    }



    const createQuestionsProps = {
        question: {
            title: "question-q",
            name: "question",
            regex: /^.{7,250}$/,
            info: "The question to be asked",
            errorMessage: "The question must be between 7 and 200 chars"
        } as TextInputProps,



        options: {
            title: "question-options",
            name: "options",
            regex: /^.+\n.+\n.+$/,
            info: "The wrong options for the question. Must be three",
            errorMessage: "Please put in three incorrect options, line-by-line"
        } as TextInputProps,



        correct: {
            title: "question-answer",
            name: "answer",
            regex: /^.{1,250}$/,
            info: "The correct answer for the question",
            errorMessage: "The answer must be between 1 and 60 chars"
        } as TextInputProps,



        image: {
            title: "question-image",
            name: "image",
            errorMessage: "Question Image must not be greater than 150kB",
            info: "Optional field for image to be used in the quiz",
            regex: /^(data:image\/(?!svg\+xml)[^;]+(;base64)?,)?(.*)$/,
            kbSize: 150
        } as ImageInputProps,


        feedBack: {
            title: "question-feedback",
            name: "feedback",
            regex: /^.{0}$|^.{4,300}$/,
            info: "Optional explanation for the answer",
            errorMessage: "The feedback, if filled must be between 4 and 100 chars"
        } as TextInputProps,


    }

    const toCode = () => {
        try {
            const isValid = true


            tabIsMeta = false
            return true
        }

        catch(e) {
            showToast({
                "text": e.message! as string,
                "type": "error"
            }, 5000)
        } 
    }



    const createQuestion = () => {
        try {
            const isValid = 
                createQuestionsProps.question.regex.test($qCQuestion.question) &&
                createQuestionsProps.options.regex.test($qCQuestion.options.join('\n')) &&
                createQuestionsProps.correct.regex.test($qCQuestion.answer) &&
                createQuestionsProps.feedBack.regex.test($qCQuestion.feedback) &&
                createQuestionsProps.image.regex.test($qCQuestion.image)


            if (!isValid) throw Error("the metadata has empty or invalid fields. Please fill them")



            if ($qCEditQuestion === -1) {
                $qCQuestions = [...$qCQuestions, $qCQuestion]
            } else {
                $qCQuestions = $qCQuestions.map((q, i) => (i === $qCEditQuestion) ? $qCQuestion : q)
                qClosePreview()
                showToast(
                    {
                        "text": "Succesfully changed the question",
                        "type": "success" 
                    },
                    3000
                )
            }



            $qCQuestion = { question: "", answer: "", options: [], feedback: "", image: "" }
            $qCEditQuestion = -1


            return true
        }

        catch(e) {
            showToast({
                "text": e.message! as string,
                "type": "error"
            }, 5000)
        }         
    }




    const deleteQuestion = (index: number) => { 
        $qCQuestions = $qCQuestions.filter((_, i) => !(i===index)) 
    }
    const editQuestion = (index: number) => {
        $qCEditQuestion = index;
        $qCQuestion = $qCQuestions[index]
        qShowPreview()
    }







</script>

<svelte:head>
    <title>Create New Game</title>
    <meta name="description" content="create code for a new picture quiz here!" />
</svelte:head>


<section class="sg gap-[1rem_0] mt-4">
    <h1 class="text-3xl font-h text-gray-600">Create New Picquiz</h1>

    <span class="hidden bg-white text-gray-600 text-white bg-gray-600" aria-hidden="true"></span>


    <div class="tab-container">
        <ul role="tablist" class="button-bar">
            <li role="presentation">
                <button on:click="{() => tabIsMeta = true}" class="overlay custom-button btn px-4 {tabIsMeta ? "bg-gray-600 text-white" : "bg-white text-gray-600" }" role="tab" aria-controls="metadata" aria-selected="{tabIsMeta}">questions</button>
            </li>
            <li role="presentation">
                <button on:click="{toCode}" class="overlay-dark custom-button btn px-4 {!tabIsMeta ? "bg-gray-600 text-white" : "bg-white text-gray-600" }" role="tab" aria-controls="questions" aria-selected="{!tabIsMeta}">code</button>
            </li>
        </ul>
    </div>


    {#if tabIsMeta}

    <div role="tabpanel" id="questions">
        <h2 class="sr-only">Questions</h2>
        <ul id="questions-list" data-card-list class="carousel grid gap-[var(--p-2)] overflow-y-[auto] py-2">
            {#each $qCQuestions as question, index}
                <li class="contents">
                    <QCard data="{question}" 
                        on:edit-question="{editQuestion.bind(null, index)}"
                        on:delete-question="{deleteQuestion.bind(null, index)}"
                    />
                </li>
            {/each}
            <li class="contents">
                <div class="create-new-question flex flex-col h-fit rounded-xl bg-white relative isolate place-items-center place-content-center border-solid border-2 border-gray-600 gap-[0.5rem] h-[150px] md:h-full">
                    <button on:click="{qShowPreview}"
                        class="custom-button btn px-5 py-2 overlay text-[1.25rem] flex items-center flex-row gap-2 bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white w-fit"
                    >
                        <Icon icon="fa-solid fa-add" />
                        New Question
                    </button>
                </div>
            </li>
        </ul>
        <button on:click={toCode} class="custom-button btn px-8 py-3 overlay text-2xl flex items-center flex-row gap-2 mt-6 bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white ml-auto">
            <Icon icon="fa-solid fa-save" />
            Save
        </button>


        <Preview show="{qShow}" on:close-modal="{qClosePreview}">
            <form on:submit|preventDefault class="pt-8 flex flex-col" >

                <div class="create-form columns-[350px_2] gap-[2rem] gap-y-[3rem] items-start items-strech h-max ">
                    
                    
                    <InputText props="{createQuestionsProps.question}" value="{$qCQuestion.question}" on:change-input="{(e)=>$qCQuestion.question=e.detail}"  />  
                    <InputTextarea props="{createQuestionsProps.options}" value="{$qCQuestion.options.join('\n')}" on:change-input="{(e)=>$qCQuestion.options=e.detail.split('\n')}"  />
                    <InputText props="{createQuestionsProps.correct}" value="{$qCQuestion.answer}" on:change-input="{(e)=>$qCQuestion.answer=e.detail}"  /> 
                    <InputText props="{createQuestionsProps.feedBack}" value="{$qCQuestion.feedback}" on:change-input="{(e)=>$qCQuestion.feedback=e.detail}" />
                    <InputImage props="{createQuestionsProps.image}" value="{$qCQuestion.image}" on:change-image="{(e)=>$qCQuestion.image=e.detail}" />
                

                </div>
            


                <button on:click="{createQuestion}" class="custom-button btn px-10 py-2 overlay text-[1.6rem] flex items-center flex-row gap-2 bg-white text-gray-600 overlay focus-visible:bg-gray-600 focus-visible:text-white hover:bg-gray-600 hover:text-white w-fit ml-auto mt-4">
                    <Icon icon="fa-solid fa-save" />
                    Save
                </button>
            </form>
        </Preview>
    </div>
    {:else}

    
    <div role="tabpanel" id="code">
        <h2 class="sr-only">Code</h2>
        <CodeBlock json="{JSON.stringify($qCQuestions)}">the json to be sent to the server</CodeBlock>
    </div>

        
    {/if}

    




    <!-- <ImagePreview /> -->
    <Toast />

</section>


<style lang="scss">
    section > * {
        grid-column: 2 / -2;
    }


    .create-form {
        column-rule: 2px solid #eee;
    }


    ul#questions-list {
        --w: 300px;
        counter-reset: questions-counter;
        grid-template-columns: repeat(auto-fill, minmax(var(--w), 1fr));


    }


    .create-new-question {
        --_w: var(--w, 300px);
        min-width: min(var(--_w), 90vw);
        min-height: 100px;
    }

    
</style>