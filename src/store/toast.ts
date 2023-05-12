import {writable, type Writable} from "svelte/store";
import type {ToastData} from "../types/index";

let timeout: number;

export const toastData:Writable<ToastData> = writable({
    text:"",
    type:"error"
})


export const showToast = (data: ToastData, ms = 5000) => {
    clearTimeout(timeout)
    toastData.set(data)
    
    timeout = setTimeout(() => {
        toastData.set({...data, text: ""})
        clearTimeout(timeout)
    }, ms)
}