import AxiosFactory from "../../services/AxiosService.js";
import GeolocationService from "../../services/GeolocationService.js";
import LocalStorageService from "../../services/LocalStorageService.js";

const state = () => ({
    error: null,
    loading: null,
    isAuthenticated: LocalStorageService.has('credentials') || false,
    coords: {},
    hasNavigatorPermission: false
});

const mutations = {
    setError(state, error) {
        state.error = error
    },
    setUser(state, user) {
        state.error = null
        state.user = user
        state.isAuthenticated = true
        LocalStorageService.add('credentials', JSON.stringify(user))
    },
    purgeAuth(state) {
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
    async login(context, payload){
        context.commit('setLoading', true)
        await AxiosFactory().postAsync('/auth/login', null, {
            data: JSON.stringify(payload)
        }).then(res => {
            if(res){
                context.commit('setUser', {
                    username: payload.username,
                    password: payload.password
                })
                context.commit('setLoading', false)
            }else{
                context.commit('setError', {
                    status: 'error',
                    message: 'Username or password is incorrect!'
                })
                context.commit('setLoading', false)
            }
        }).catch(err => {
            context.commit('setError', err.response.data)
            context.commit('setLoading', false)
        })
    },
    getUserCoords(context){
        return new Promise((resolve, reject) => {
            GeolocationService.getCurrentPosition().then(async (res) => {
                await AxiosFactory().postAsync('/api/user', null, {
                    data: {
                        username: LocalStorageService.json('credentials', 'username'),
                        enabled: 1,
                        longitude: res.longitude,
                        latitude: res.latitude
                    }
                })
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
    },
    getErrors(state){
        return state.error
    },
    getCoords(state){
        return state.coords
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
