<script>
import {useRouter} from "vue-router";
import LocalStorageService from "../core/services/LocalStorageService.js";
import {useStore} from "vuex";

export default {
  name: "Logout",
  setup(){
    const router = useRouter()
    const store = useStore()

    LocalStorageService.remove('credentials')
    store.commit('user/purgeAuth')
    router.push('/auth/login')
  }
}
</script>

<style scoped>

</style>