<template>
  <div
    class="flex flex-col h-full"
  >
    <div class="flex px-8 py-3 items-center flex-none justify-between">
      <div class="flex items-center">
        <div class="bg-dark-600 h-12 w-12 rounded-full" />
        <span class="ml-4">{{ selectedUser }}</span>
        <span
          v-if="transactionStatus === 'notcompleted'"
          class="ml-5 bg-gray-600 text-white rounded-md py-1 px-2 text-sm"
        >Not completed</span>
        <span
          v-else-if="transactionStatus === 'rejected'"
          class="ml-5 bg-red-600 text-white rounded-md py-1 px-2 text-sm"
        >Rejected</span>
        <span
          v-else-if="transactionStatus === 'completed'"
          class="ml-5 bg-green-600 text-white rounded-md py-1 px-2 text-sm"
        >Completed</span>
      </div>
      <div
        v-if="transactionStatus === 'notcompleted'"
        class="h-full flex"
      >
        <!-- Reject -->
        <div
          v-tooltip="'Reject\nTransaction'"
          class="px-1"
        >
          <button
            class="w-10 h-10 box-content bg-red-500 text-white uppercase font-medium focus:outline-none hover:bg-red-600 transition duration-300 my-1 rounded-full"
            @click="handleRejectClick"
          >
            <i class="far fa-times opacity-80 fa-lg" />
          </button>
        </div>
        <!-- Approve -->
        <div
          v-tooltip="'Approve\nTransaction'"
          class="px-1"
        >
          <button
            class="w-10 h-10 box-content bg-blue-600 text-white uppercase font-medium focus:outline-none hover:bg-blue-700 transition duration-300 my-1 rounded-full"
            @click="handleApproveClick"
          >
            <i class="far fa-check opacity-80 fa-lg" />
          </button>
        </div>
      </div>
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
        v-model="typing"
        type="text"
        placeholder="Type a message"
        class="p-4 w-full focus:outline-none"
        @keypress="handleEnterPress"
      >
      <button
        class="w-36 h-10 bg-tinder text-white uppercase font-medium focus:outline-none hover:bg-tinder-100 transition duration-300 m-2 rounded-xl"
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
import LocalStorageService from "../core/services/LocalStorageService.js";
import AxiosFactory from "../core/services/AxiosService.js";
import {useToast} from "vue-toastification";

export default {
  name: "Chat",
  components: {Message},
  props: {
    currentUser: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props, {}) {
    const toast = useToast()

    const messagePage = ref(null)
    const typing = ref('');

    const messages = ref([])
    const selectedUser = ref('')

    const transactionStatus = ref('notcompleted')
    const chatTransactionId = ref(null)

    const scrollToBottom = () => {
      messagePage.value.scrollTo({
        top: messagePage.value.scrollHeight,
        behavior: 'auto'
      })
    }

    const sendMessage = async () => {
      const trimmedMessage = typing.value.trim()
      if (trimmedMessage === '') return null;

      const newMessage = {
        sender: LocalStorageService.json('credentials', 'username'),
        receiver: selectedUser.value,
        body: trimmedMessage
      }

      await AxiosFactory().postAsync('/api/sendmessage', null, {
        data: newMessage
      })

      await messages.value.push(newMessage)

      scrollToBottom()

      typing.value = ''
    }

    onMounted(() => {
      selectedUser.value = props.currentUser
      AxiosFactory().getAsync(`/api/messagelist/${LocalStorageService.json('credentials', 'username')}/${selectedUser.value}`)
          .then((res) => {
            messages.value = res
          })
    })

    watch(() => props.currentUser, () => {
      selectedUser.value = props.currentUser
    }, {
      flush: 'post'
    })

    watch(selectedUser, () => {
      const interval = setInterval(async () => {
        await AxiosFactory().getAsync(`/api/messagelist/${LocalStorageService.json('credentials', 'username')}/${selectedUser.value}`)
            .then((res) => {
              messages.value = res
            }).catch(err => clearInterval(interval))

        scrollToBottom();
      }, 2000)
    })

    const updateStatus = async () => {
      await AxiosFactory().getAsync(`/api/transaction/transaction_id/${chatTransactionId.value}`).then((res) => {
        if (res.length === 2) {
          let status = true;
          for (let i = 0; i < res.length; i++){
            if (res[i].status === 'rejected')
              status = false
            if (res[i].status === null){
              return;
            }
          }
          if (status) {
            transactionStatus.value = 'completed'
          } else {
            transactionStatus.value = 'rejected'
          }
        } else {
          transactionStatus.value = 'notcompleted'
        }
      })
    }

    onMounted(async () => {
      scrollToBottom();

      await AxiosFactory().getAsync(`/api/transaction/username/${LocalStorageService.json('credentials', 'username')}`)
          .then(res => {
            chatTransactionId.value = res[0].transaction_id
          })

      setInterval(() => updateStatus(), 2000)
    })

    const handleEnterPress = (e) => {
      if (e.code === "Enter") {
        sendMessage()
      }
    }

    const handleApproveClick = () => {
      const confirmed = confirm("Do you really want to confirm?")
      if (confirmed) {
        const status = 'approved'
        AxiosFactory().postAsync(`/api/transaction/setstatus`, null, {
          data: {
            username: LocalStorageService.json('credentials', 'username'),
            status,
            transaction_id: chatTransactionId.value
          }
        }).then(async _ => {
          await updateStatus()
          toast.success('Your transaction has been successfully registered.')
        })
      }
    }

    const handleRejectClick = () => {
      const confirmed = confirm("Do you really want to reject?")
      if (confirmed) {
        const status = 'rejected'
        AxiosFactory().postAsync(`/api/transaction/setstatus`, null, {
          data: {
            username: LocalStorageService.json('credentials', 'username'),
            status,
            transaction_id: chatTransactionId.value
          }
        }).then(async _ => {
          await updateStatus()
          toast.success('Your transaction has been successfully registered.')
        })
      }
    }

    return {
      typing,
      sendMessage,
      handleEnterPress,
      messagePage,
      messages,
      selectedUser,
      handleApproveClick,
      handleRejectClick,
      transactionStatus
    }
  }
}
</script>

<style scoped>

</style>