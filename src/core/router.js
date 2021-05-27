import * as VueRouter from 'vue-router'

import store from './store/index.js'

const Home = () => import('../pages/Home.vue')
const Auth = () => import('../pages/Auth.vue')
const TypeSelector = () => import('../pages/TypeSelector.vue')
const Messenger = () => import('../pages/Messenger.vue')
const Profile = () => import('../pages/Profile.vue')
const NotFound = () => import('../pages/404.vue')

const routes = [
    {
        path: '/' || '/dashboard',
        component: Home,
        meta: {
            requiresLogin: true
        }
    },
    {
        path: '/auth/:action',
        component: Auth,
    },
    {
        path: '/type',
        component: TypeSelector,
        meta: {
            requiresLogin: true
        }
    },
    {
        path: '/messages',
        component: Messenger,
        meta: {
            requiresLogin: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            requiresLogin: true
        }
    },
    {
        path: '/:catchAll(.*)',
        component: NotFound
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

/*router.beforeEach(
    (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresLogin) && !store.state.user.isAuthenticated) {
            next('/auth/login')
        } else {
            next()
        }
    }
)*/

export default router;