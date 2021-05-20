import LocalStorage from "../../services/LocalStorageService.js";

const state = () => ({
    error: null,
    user: {},
    isAuthenticated: false
});

const mutations = {
    setError(state, error){
        state.error = error
    },
    setUser(state, {user, token}){
        state.error = null
        state.user = user
        state.isAuthenticated = true
        LocalStorage.add('auth_token', token)
    },
    purgeAuth(state){
        state.user = {};
        state.isAuthenticated = false;
    }
}

const actions = {

}

const getters = {

}

