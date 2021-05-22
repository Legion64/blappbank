<template>
  <Flex :classes="['h-full']">
    <div class="messenger w-full md:w-10/12 lg:w-8/12 h-full md:h-5/6 bg-white md:rounded-xl shadow-2xl overflow-hidden flex">
      <div
        class="side-bar w-96 flex-1"
        :class="active !== null ? 'hidden md:block' : null"
      >
        <div class="h-14 flex justify-center items-center">
          <span class="text-xl uppercase font-bold">Matches</span>
        </div>
        <div class="overflow-y-auto h-full">
          <div
            v-for="(user, index) of state.users"
            :key="index"
            class="h-16 select-none cursor-pointer hover:bg-gray-200 transition odd:bg-gray-50"
            @click="handleUser(index)"
          >
            <div
              class="flex items-center h-full  px-7"
            >
              <div
                class="h-12 w-12 rounded-full bg-dark-600"
              />
              <span class="ml-8">
                {{ user.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="vertical-divider hidden md:block" />
      <div
        class="md:flex-1 lg:flex-2 xl:flex-3"
        :class="active === null ? 'hidden md:block' : null"
      >
        <Chat
          v-for="(user, index) of state.users"
          :key="index"
          :chat-id="index"
          :user="user"
          :active-chat="active"
        />
        <div
          v-if="active === null"
          class="flex justify-center items-center h-full flex-col"
        >
          <img
            src="../assets/img/chat.svg"
            alt=""
            class="h-72 opacity-10 absolute select-none pointer-events-none"
          >
          <div class="z-50 text-center">
            <h2 class="text-4xl uppercase font-black">
              Message Box
            </h2>
            <span class="text-xl mt-2 block">
              Please choose someone to message.
            </span>
          </div>
        </div>
      </div>
    </div>
  </Flex>
</template>

<script>
import Flex from "../components/Flex.vue";
import AxiosFactory from "../core/services/AxiosService.js";
import {defineAsyncComponent, onMounted, reactive, ref} from "vue";
//import Chat from "../components/Chat.vue";

const Chat = defineAsyncComponent(() => import('../components/Chat.vue'))

export default {
  name: "Messenger",
  components: {Chat, Flex},
  setup(){
    const state = reactive({
      loader: true,
      users: null,
      error: null
    })

    const active = ref(null)

    // Functions
    async function fetchUsers(){
      await AxiosFactory().getAsync('/users').then(res => {
        state.loader = false
        state.users = res
        state.error = null
      }).catch(err => {
        state.error = err
        setTimeout(() => fetchUsers(), 5000)
      });
    }

    function handleUser(i) {
      active.value = i
    }

    // Lifecycle Hooks
    onMounted(async () => {
      await fetchUsers();
    })

    return{
      state,
      handleUser,
      active
    }
  }
}
</script>

<style scoped>

</style>