import {createStore} from "vuex";
import user from "./modules/user.js";
import messages from "./modules/messages.js";

const index = createStore({
    modules: {
        user,
        messages
    }
})

export default index;