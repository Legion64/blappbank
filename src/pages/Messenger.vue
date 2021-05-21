<template>
  <Flex :classes="['h-full']">
    <div class="messenger w-full md:w-8/12 bg-white md:rounded-xl shadow-2xl overflow-hidden flex">
      <div class="side-bar w-80">
        <div class="h-14 flex justify-center items-center">
          <span class="text-xl uppercase font-bold">Matches</span>
        </div>
        <div class="horizontal-divider" />
        <div class="overflow-y-auto h-full">
          <User
            v-for="(user, index) in state.users"
            :key="user.id"
            :user="user"
            :index="index"
            main-style="mx-7"
            @click="handleUser(user)"
          />
        </div>
      </div>
      <div class="vertical-divider" />
      <div
        v-if="!!state.selectedUser"
        class="flex-2"
      >
        <div class="flex px-8 py-3 items-center">
          <div class="bg-dark-600 h-12 w-12 rounded-full" />
          <span class="ml-4">{{ state.selectedUser.name }}</span>
        </div>
        <div class="horizontal-divider" />
        <Chat :selected-user="state.selectedUser" />
      </div>
    </div>
  </Flex>
</template>

<script>
import Flex from "../components/Flex.vue";
import User from "../components/User.vue";
import AxiosFactory from "../core/services/AxiosService.js";
import {onMounted, provide, reactive} from "vue";
import Chat from "../components/Chat.vue";

export default {
  name: "Messenger",
  components: {Chat, User, Flex},
  setup(){
    const state = reactive({
      loader: true,
      users: null,
      selectedUser: null,
      error: null
    })

    async function fetchUsers(){
      await AxiosFactory().getAsync('/users').then(res => {
        state.loader = false
        state.users = res;
        state.error = null;
      }).catch(err => {
        state.error = err
        setTimeout(() => fetchUsers(), 5000)
      });
    }

    function handleUser(user){
      state.selectedUser = user
    }

    onMounted(async () => {
      await fetchUsers();
    })

    return{
      state,
      handleUser
    }
  }
}
</script>

<style scoped>

</style>