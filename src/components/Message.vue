<template>
  <div
    class="flex flex-col justify-center md:justify-start items-center md:items-start"
    :class="author ? '' : 'md:justify-end md:items-end'"
  >
    <div
      class="w-full md:w-96 m-2 p-5 rounded-xl text-gray-700"
      :class="author ? 'bg-message-pink' : 'bg-message-gray '"
    >
      {{ message.message }}
      <div class="md:hidden mt-3 flex justify-end text-gray-400">
        Author ID: {{ message.author_id }}
      </div>
    </div>
    <span class="m-2 text-gray-400 text-sm">{{ passingTime }}</span>
  </div>
</template>
<script>
import {computed, onMounted, ref} from "vue";
import {formatDistanceToNow} from "date-fns";

export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  setup(props){
    const currentAuthorId = 1

    const author = computed(() => {
      return props.message.author_id === currentAuthorId
    })

    const time = () => {
      passingTime.value = formatDistanceToNow(props.message.created_at, {
        addSuffix: true,
        includeSeconds: true
      });
    }

    const passingTime = ref(null)

    onMounted(() => {
      time()
      setInterval(() => {
        time()
      }, 30000)
    })

    return {
      author,
      passingTime
    }
  }
}
</script>

<style scoped>

</style>