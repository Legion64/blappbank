import {createStore} from "vuex";
import user from "./modules/user.js";

const index = createStore({
    modules: {
        user
    }
})

export default index;