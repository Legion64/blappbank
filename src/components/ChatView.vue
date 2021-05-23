<template>
  <div
    class="flex flex-col h-full"
  >
    <div class="flex px-8 py-3 items-center flex-none">
      <div class="bg-dark-600 h-12 w-12 rounded-full" />
      <span class="ml-4">{{ reduceParticipant(selectedRoom.participants) }}</span>
    </div>
    <div class="horizontal-divider" />
    <div
      ref="messagePage"
      class="p-4 flex overflow-y-auto flex-col flex-1"
    >
      <Message
        v-for="(message, index) of selectedRoom.messages"
        :key="index"
        :message="message"
      />
    </div>
    <div class="horizontal-divider" />
    <div class="flex">
      <input
        v-model="typing"
        type="text"
        placeholder="Type a message"
        class="p-4 w-full focus:outline-none"
        @keypress="handleEnterPress"
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
import {computed, inject, onMounted, ref, watch} from "vue";
import Message from "./Message.vue";
import {getTime} from "date-fns";

export default {
  name: "Chat",
  components: {Message},
  props: {
    selectedChat: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(props) {
    const chat = inject('chat');
    const messagePage = ref(null)
    const selectedRoom = computed(() => chat.value.filter(item => props.selectedChat === item.roomId)[0])

    const typing = ref('');

    // TODO: Changing with vuex state
    const loggedInUserId = 1

    const scrollToBottom = () => {
      messagePage.value.scrollTo({
        top: messagePage.value.scrollHeight,
        behavior: 'auto'
      })
    }

    const reduceParticipant = (participantsId) => {
      const participants = []
      const filtered = participantsId
          .filter(par => par.id !== loggedInUserId)
      filtered.map(par => participants.push(par.name))
      return participants.join(', ')
    }

    const sendMessage = async () => {
      const trimmedMessage = typing.value.trim()
      if (trimmedMessage === '') return null;

      const newMessage = {
        message: trimmedMessage,
        created_at: getTime(new Date()),
        author_id: 1
      }

      await selectedRoom.value.messages.push(newMessage)
      typing.value = ''
      scrollToBottom();
    }

    watch(selectedRoom, () => {
      scrollToBottom();
    }, {
      flush: 'post'
    })

    onMounted(() => {
      scrollToBottom();
    })

    const handleEnterPress = (e) => {
      if (e.code === "Enter"){
        sendMessage()
      }
    }

    return {
      selectedRoom,
      typing,
      sendMessage,
      handleEnterPress,
      messagePage,
      reduceParticipant
    }
  }
}
</script>

<style scoped>

</style>