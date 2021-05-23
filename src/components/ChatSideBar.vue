<template>
  <div class="h-14 flex justify-center items-center">
    <span class="text-xl uppercase font-bold">Matches</span>
  </div>
  <div
    class="overflow-y-auto h-full"
    v-bind="$attrs"
  >
    <div
      v-for="(room, index) of rooms"
      :key="index"
      class="h-16 select-none cursor-pointer hover:bg-gray-200 transition odd:bg-gray-50"
      @click="$emit('update:modelValue', room.roomId)"
    >
      <div
        class="flex items-center h-full px-7"
      >
        <div
          class="h-12 w-12 rounded-full bg-dark-600"
        />
        <span class="ml-8">
          {{ reduceParticipant(room.participants) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "ChatSideBar",
  props: [],
  emits: ['update:modelValue'],
  setup() {
    const rooms = inject('chat');

    // TODO: Changing with vuex state
    const loggedInUserId = 1

    function reduceParticipant(participantsId) {
      const participants = []
      const filtered = participantsId
          .filter(par => par.id !== loggedInUserId)
      filtered.map(par => participants.push(par.name))
      return participants.join(', ')
    }

    return {
      rooms,
      reduceParticipant
    }
  }
}
</script>

<style scoped>

</style>