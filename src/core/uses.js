import VueToast from 'vue-toastification'

import Vuex from './store'
import VueRouter from './router.js'

export default function (vue){
    vue.use(VueToast)
    vue.use(VueRouter)
    vue.use(Vuex)
}