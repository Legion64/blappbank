import * as VueRouter from 'vue-router'

import {defineAsyncComponent} from "vue";

const Home = () => import('../pages/Home.vue')
const Auth = () => import('../pages/Auth.vue')
const TypeSelector = () => import('../pages/TypeSelector.vue')
const Messenger = () => import('../pages/Messenger.vue')

const routes = [
    {
        path: '/' || '/dashboard',
        component: Home
    },
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/type',
        component: TypeSelector
    },
    {
        path: '/messages',
        component: Messenger
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router;