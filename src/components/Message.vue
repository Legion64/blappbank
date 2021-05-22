<template>
  <div
    class="flex flex-col text-gray-700"
    :class="author ? '' : 'justify-end items-end'"
  >
    <div
      class="w-96 m-2 p-5 rounded-xl text-gray-700"
      :class="author ? 'bg-message-pink' : 'bg-message-gray '"
    >
      {{ message.message }}
    </div>
    <span class="m-2 text-gray-400 text-sm">{{ time }}</span>
  </div>
</template>
<script>
import {computed} from "vue";
import moment from "moment";

export default {
  name: "Message",
  props: ['message'],
  setup(props){
    const currentAuthorId = 1

    const author = computed(() => {
      return props.message.author_id === currentAuthorId
    })

    const time = computed(() => {
      return moment.unix(props.message.created_at).format("MM/DD/YYYY");
    })

    return {
      author,
      time
    }
  }
}
</script>

<style scoped>

</style>