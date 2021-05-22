<template>
  <div
    v-show="isActive"
    class="flex flex-col h-full"
  >
    <div class="flex px-8 py-3 items-center flex-none">
      <div class="bg-dark-600 h-12 w-12 rounded-full" />
      <span class="ml-4">{{ user.name }}</span>
    </div>
    <div class="horizontal-divider" />
    <div
      ref="messagePage"
      class="p-4 flex overflow-y-auto flex-col flex-1"
    >
      <Message
        v-for="(message, index) of messages"
        :key="index"
        :message="message"
      />
    </div>
    <div class="horizontal-divider" />
    <div class="flex">
      <input
        v-model="type"
        type="text"
        placeholder="Type a message"
        class="p-4 w-full focus:outline-none"
        @keypress="handleEnterKey"
      >
      <button
        class="w-32 bg-tinder text-white uppercase font-medium focus:outline-none hover:bg-tinder-100 transition duration-300 m-2 rounded-xl"
        @click="sendMessage"
      >
        <i class="fas fa-paper-plane mr-3" /> Reply
      </button>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, ref, watchEffect} from "vue";
import Message from "./Message.vue";

export default {
  name: "Chat",
  components: { Message},
  props: {
    user: {
      type: Object,
      required: true
    },
    chatId: {
      type: Number,
      required: true
    },
    activeChat: {
      type: [Number],
      required: false,
      default: null
    }
  },
  setup(props, context) {
    const type = ref('');
    const messagePage = ref(null)
    const messages = ref([
      {
        id: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper nisi id lacus blandit pellentesque. Duis vel magna eget eros commodo lobortis quis sed quam. Maecenas non nisl sapien. Quisque quam mauris, vehicula et tortor ac, commodo tincidunt arcu. In eu viverra urna. Suspendisse tincidunt quis urna nec vehicula. Nam accumsan diam vel quam mattis, sed rhoncus urna pretium. Maecenas euismod elementum orci vel tristique. Nunc sed lobortis urna. Morbi vel nibh finibus orci tempor pulvinar.',
        created_at: "20022001",
        author_id: 1
      },
      {
        id: 1,
        message: 'Sed ullamcorper elit turpis, pulvinar ornare libero feugiat et. Vestibulum faucibus quis ex et tempor. Duis ornare erat nibh, ut lobortis turpis facilisis eu. Morbi suscipit vulputate maximus. Nullam massa augue, dictum id condimentum vitae, aliquet ac elit. Integer auctor est ut scelerisque laoreet. Mauris placerat justo vel lorem condimentum, vitae tincidunt urna scelerisque. In nec turpis eu augue tempus tempus. Duis a lacus ligula. Morbi laoreet fringilla pulvinar. Nulla varius orci risus, eu semper purus condimentum at. Nam et vulputate odio, non euismod elit. Etiam lectus sapien, fermentum sed quam eget, consequat cursus nibh. Aliquam arcu arcu, sollicitudin vitae sapien sed, gravida fermentum nulla.',
        created_at: 982657842,
        author_id: 2
      }
        ]
    );

    const sendMessage = async () => {
      const message = type.value.trim()
      if (message === '') return null;

      const newMessage = {
        id: 1,
        message,
        created_at: new Date().getTime(),
        author_id: Math.floor(Math.random() * 1.1) + 1
      }
      await messages.value.push(newMessage);
      messagePage.value.scrollTo(0, messagePage.value.scrollHeight)
      type.value = ''
    }

    const handleEnterKey = (e) => {
      if (e.code === "Enter"){
        sendMessage()
      }
    }

    const isActive = computed(() => {
      return props.chatId === props.activeChat
    })

    return {
      messages,
      type,
      sendMessage,
      isActive,
      messagePage,
      handleEnterKey
    }
  }
}
</script>

<style scoped>

</style>