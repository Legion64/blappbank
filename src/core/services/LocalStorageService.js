export default {
    get(key){
        return window.localStorage.getItem(key);
    },
    add(key, val){
        window.localStorage.setItem(key, val);
    },
    remove(key){
        window.localStorage.removeItem(key);
    },
    has(key){
        return this.get(key) !== null;
    }
}