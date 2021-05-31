import axios from "axios";
import LocalStorageService from "./LocalStorageService.js";
import { AxiosConfig } from "../configs.js";

class AxiosService {
    constructor() {
        axios.defaults.baseURL = AxiosConfig.baseURL;
        if(LocalStorageService.has('credentials')){
            const credentials = JSON.parse(LocalStorageService.get('credentials'))
            axios.defaults.auth = {
                username: credentials.username,
                password: credentials.password
            }
        }
        axios.defaults.headers.post["Content-Type"] = 'application/json'
    }

    /**
     * Get async request
     *
     * @param url
     * @param params
     * @param options
     * @returns {Promise<unknown>} Return a JSON data
     */
    getAsync(url, params, options){
        return this.requestAsync(this.configBuilder(url, params, 'get', options));
    }

    /**
     * Get async request
     *
     * @param url
     * @param params
     * @param options
     * @returns {Promise<unknown>} Return a JSON data
     */
    postAsync(url, params, options){
        return this.requestAsync(this.configBuilder(url, params, 'post', options));
    }

    /**
     * Put async request
     *
     * @param url
     * @param params
     * @param options
     * @returns {Promise<unknown>} Return a JSON data
     */
    putAsync(url, params, options){
        return this.requestAsync(this.configBuilder(url, params, 'put', options));
    }

    /**
     * Patch async request
     *
     * @param url
     * @param params
     * @param options
     * @returns {Promise<unknown>} Return a JSON data
     */
    patchAsync(url, params, options){
        return this.requestAsync(this.configBuilder(url, params, 'patch', options));
    }

    /**
     * Delete async request
     *
     * @param url
     * @param params
     * @param options
     * @returns {Promise<unknown>} Return a JSON data
     */
    deleteAsync(url, params, options){
        return this.requestAsync(this.configBuilder(url, params, 'delete', options));
    }

    /**
     * HoF (High-Order Function) of requests function.
     *
     * @param config
     * @returns {Promise<unknown>}
     */
    requestAsync(config){
        return new Promise(async (resolve, reject) => {
            return axios.request(config)
                .then((res) => resolve(res.data))
                .catch(err => reject(err));
        });
    }

    /**
     * Config builder for axios requests.
     *
     * @param url
     * @param params
     * @param method
     * @param options
     * @returns {*&{method, params, url}}
     */
    configBuilder(url, params, method, options){
        return {
            url,
            params,
            method,
            ...options,
        }
    }
}

export default function AxiosFactory() {
    return new AxiosService();
}