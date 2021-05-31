<template>
  <Flex :classes="['h-full']">
    <div
      class="messenger w-full md:w-10/12 lg:w-8/12 h-full md:h-5/6 bg-white md:rounded-xl shadow-2xl overflow-hidden flex relative"
    >
      <div
        class="side-bar w-96 flex-1"
        :class="active !== null ? 'hidden md:block' : null"
      >
        <ChatSideBar
          @current-user="active = $event"
        />
      </div>
      <div class="vertical-divider hidden md:block" />
      <div
        class="md:flex-1 lg:flex-2 xl:flex-3"
        :class="active === null ? 'hidden md:block' : null"
      >
        <ChatView
          v-if="active !== null"
          :current-user="active"
        />
        <div
          v-else
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
import {defineAsyncComponent, onMounted, provide, reactive, ref} from "vue";
import ChatSideBar from "../components/ChatSideBar.vue";
import AxiosFactory from "../core/services/AxiosService.js";
import LocalStorageService from "../core/services/LocalStorageService.js";

const ChatView = defineAsyncComponent(() => import('../components/ChatView.vue'))

export default {
  name: "Messenger",
  components: {ChatSideBar, ChatView, Flex},
  setup() {
    const state = reactive({
      loader: true,
      users: null,
      error: null
    })

    const active = ref(null)

    return {
      state,
      active
    }
  }
}
</script>

<style scoped>

</style>