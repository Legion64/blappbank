import * as VueRouter from 'vue-router'

import Home from "../pages/Home.vue";
import Auth from "../pages/Auth.vue";
import TypeSelector from "../pages/TypeSelector.vue";
import Messenger from "../pages/Messenger.vue";

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