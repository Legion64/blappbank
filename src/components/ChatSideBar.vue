<template>
  <div class="h-14 flex justify-center items-center">
    <span class="text-xl uppercase font-bold">Matches</span>
  </div>
  <div
    class="overflow-y-auto h-full"
    v-bind="$attrs"
  >
    <div
      v-for="(user, index) of chats"
      :key="index"
      class="h-16 select-none cursor-pointer hover:bg-gray-200 transition odd:bg-gray-50"
      @click="$emit('currentUser', user)"
    >
      <div
        class="flex items-center h-full px-7"
      >
        <div
          class="h-12 w-12 rounded-full bg-dark-600"
        />
        <span class="ml-8">
          {{ user }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, onBeforeMount, ref} from "vue";
import AxiosFactory from "../core/services/AxiosService.js";
import LocalStorageService from "../core/services/LocalStorageService.js";

export default {
  name: "ChatSideBar",
  props: [],
  emits: ['currentUser'],
  setup() {
    const chats = ref([])

    onBeforeMount(() => {
      AxiosFactory().getAsync(`/api/messages/user/${LocalStorageService.json('credentials', 'username')}`).then(res => {
        chats.value = res
      })
    })

    return {
      chats
    }
  }
}
</script>

<style scoped>

</style>