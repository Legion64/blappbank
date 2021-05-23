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
          v-model="active"
        />
      </div>
      <div class="vertical-divider hidden md:block" />
      <div
        class="md:flex-1 lg:flex-2 xl:flex-3"
        :class="active === null ? 'hidden md:block' : null"
      >
        <ChatView
          v-if="active !== null"
          :selected-chat="active"
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
import {defineAsyncComponent, provide, reactive, ref} from "vue";
import ChatSideBar from "../components/ChatSideBar.vue";

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

    const chat = ref([
          {
            roomId: 1,
            participants: [
              {
                id: 1,
                name: 'Melih Budak'
              },
              {
                id: 2,
                name: 'Yeşim Budak'
              }
            ],
            messages: [
                {
                  id: 1,
                  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper nisi id lacus blandit pellentesque. Duis vel magna eget eros commodo lobortis quis sed quam. Maecenas non nisl sapien. Quisque quam mauris, vehicula et tortor ac, commodo tincidunt arcu. In eu viverra urna. Suspendisse tincidunt quis urna nec vehicula. Nam accumsan diam vel quam mattis, sed rhoncus urna pretium. Maecenas euismod elementum orci vel tristique. Nunc sed lobortis urna. Morbi vel nibh finibus orci tempor pulvinar.',
                  created_at: 20022001,
                  author_id: 1
                },
                {
                  id: 2,
                  message: 'Sed ullamcorper elit turpis, pulvinar ornare libero feugiat et. Vestibulum faucibus quis ex et tempor. Duis ornare erat nibh, ut lobortis turpis facilisis eu. Morbi suscipit vulputate maximus. Nullam massa augue, dictum id condimentum vitae, aliquet ac elit. Integer auctor est ut scelerisque laoreet. Mauris placerat justo vel lorem condimentum, vitae tincidunt urna scelerisque. In nec turpis eu augue tempus tempus. Duis a lacus ligula. Morbi laoreet fringilla pulvinar. Nulla varius orci risus, eu semper purus condimentum at. Nam et vulputate odio, non euismod elit. Etiam lectus sapien, fermentum sed quam eget, consequat cursus nibh. Aliquam arcu arcu, sollicitudin vitae sapien sed, gravida fermentum nulla.',
                  created_at: 982657842,
                  author_id: 2
                }
            ],
            isActive: true
          },
          {
            roomId: 2,
            participants: [
              {
                id: 1,
                name: 'Melih Budak'
              },
              {
                id: 2,
                name: 'Berkay Akdeniz'
              }
            ],
            messages: [],
            isActive: true
          },
        ]
    );

    provide('chat', chat)

    // Functions
    /*async function fetchUsers(){
      await AxiosFactory().getAsync('/users').then(res => {
        state.loader = false
        state.users = res
        state.error = null
      }).catch(err => {
        state.error = err
        setTimeout(() => fetchUsers(), 5000)
      });
    }*/

    function handleUser(i) {
      active.value = i
    }

    // Lifecycle Hooks
    /*onMounted(async () => {
      await fetchUsers();
    })*/

    return {
      state,
      handleUser,
      active
    }
  }
}
</script>

<style scoped>

</style>