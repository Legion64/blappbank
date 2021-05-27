import LocalStorage from "../../services/LocalStorageService.js";
import AxiosFactory from "../../services/AxiosService.js";
import {USER_AUTH_TOKEN} from "../../constants/AuthConstants.js";
import GeolocationService from "../../services/GeolocationService.js";

const state = () => ({
    error: null,
    user: {},
    loading: null,
    isAuthenticated: false,
    coords: {},
    hasNavigatorPermission: false
});

const mutations = {
    setError(state, error) {
        state.error = error
    },
    setUser(state, {user, token}) {
        state.error = null
        state.user = user
        state.isAuthenticated = true
        LocalStorage.add(USER_AUTH_TOKEN, token)
    },
    purgeAuth(state) {
        state.user = {};
        state.isAuthenticated = false;
    },
    setLoading(state, status){
        state.loading = status;
    },
    setCoords(state, payload){
        state.coords = payload
    },
    setNavigatorPermission(state, payload){
        state.hasNavigatorPermission = payload
    }
}

const actions = {
    login(context, payload){
        context.commit('setLoading', true)
        AxiosFactory().postAsync('/auth/login', payload).then(res => {
            if(res.status === 200){
                context.commit('setUser', {
                    user: {
                        username: 'Legionary',
                        name: 'Melih Budak'
                    },
                    token: res.token
                })
                context.commit('setLoading', false)
            }
        }).catch(err => {
            context.commit('setError', err.response.data)
        })
    },
    getUserCoords(context){
        return new Promise((resolve, reject) => {
            GeolocationService.getCurrentPosition().then((res) => {
                context.commit('setCoords', {
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                context.commit('setNavigatorPermission', true)
                resolve(true)
            }).catch(() => {
                context.commit('setNavigatorPermission', false)
                reject(false)
            })
        })
    }
}

const getters = {
    getLoading(state){
        return state.loading
    },
    getNavigatorPermission(state){
        return state.hasNavigatorPermission
    },
    getIsAuthenticated(state){
        return state.isAuthenticated
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
