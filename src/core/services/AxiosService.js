import axios from "axios";
import LocalStorageService from "./LocalStorageService.js";
import {USER_AUTH_TOKEN} from "../constants/AuthConstants.js";
import {defaults} from "autoprefixer";
import { AxiosConfig } from "../configs.js";

let AxiosInstance = null;

class AxiosService {
    constructor() {
        if (LocalStorageService.has(USER_AUTH_TOKEN)){
            axios.defaults.headers.common['Authorization'] = LocalStorageService.get(USER_AUTH_TOKEN);
        }
        axios.defaults.baseURL = AxiosConfig.baseURL;
    }

    /**
     * Get async request
     *
     * @param url
     * @param params
     * @param options
     * @returns {Promise<JSON>} Return a JSON data
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
     * @returns {Promise<JSON>} Return a JSON data
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
     * @returns {Promise<JSON>} Return a JSON data
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
     * @returns {Promise<JSON>} Return a JSON data
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
     * @returns {Promise<JSON>} Return a JSON data
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
            await axios.request(config).then((res) => {
                resolve(res.data);
            }).catch(err => reject(err));
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
    if (AxiosInstance === null)
        AxiosInstance = new AxiosService()

    return AxiosInstance;
}