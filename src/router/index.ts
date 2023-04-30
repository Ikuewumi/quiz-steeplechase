import {wrap} from "svelte-spa-router/wrap"

export const routes = {
    "/" : wrap({
        asyncComponent: () => import('../pages/Home.svelte')
    }),


    "/game/:id" : wrap({
        asyncComponent: () => import('../pages/Game.svelte')
    }),


    "/create" : wrap({
        asyncComponent: () => import('../pages/CreateGame.svelte')
    })
}