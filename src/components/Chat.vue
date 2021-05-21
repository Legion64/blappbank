<template>
  <div class="flex flex-col h-full">
    <div class="chat-box flex-2">
      Chat box Test
    </div>
    <div class="horizontal-divider" />
    <div class="message p-4">
      Message Sender
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    selectedUser: {
      type: Object,
      required: true
    }
  },
  setup(){

  }
}
</script>

<style scoped>

</style>