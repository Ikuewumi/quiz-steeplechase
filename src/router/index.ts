import {wrap} from "svelte-spa-router/wrap"

export const routes = {
    "/" : wrap({
        asyncComponent: () => import('../pages/Home.svelte')
    })
}