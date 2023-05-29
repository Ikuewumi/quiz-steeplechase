import {wrap} from "svelte-spa-router/wrap"

export const routes = {
    "/" : wrap({
        asyncComponent: () => import('../pages/Home.svelte')
    }),

    "/dev": wrap({
        asyncComponent: () => import('../pages/Dev.svelte')
    }),

    "/game/:id" : wrap({
        asyncComponent: () => import('../pages/Game.svelte')
    }),


    "/create" : wrap({
        asyncComponent: () => import('../pages/CreateGame.svelte')
    }),

    "/image" : wrap({
        asyncComponent: () => import('../pages/CreateImage.svelte')
    }),

    "/archive" : wrap({
        asyncComponent: () => import('../pages/Archive.svelte')
    }),

    "/game" : wrap({
        asyncComponent: () => import('../pages/Game.svelte')
    })
}
