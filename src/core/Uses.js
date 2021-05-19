import VueToast from 'vue-toastification'
import Vuex from 'vuex'

import VueRouter from './Router.js'

export default function (vue){
    vue.use(VueToast);
    vue.use(VueRouter)
    vue.use(Vuex)
}