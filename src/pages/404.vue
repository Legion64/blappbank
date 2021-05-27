<template>
  <Flex class="h-full flex-col">
    <img
      src="../assets/img/notfound.svg"
      alt=""
      class="opacity-50"
    >
    <div class="absolute flex flex-col text-center">
      <span class="text-8xl text-white font-black mb-3">404</span>
      <span class="text-6xl text-white font-medium">Page Not Found!</span>
    </div>
  </Flex>
</template>

<script>
import Flex from "../components/Flex.vue";
export default {
  name: "494",
  components: {Flex}
}
</script>

<style scoped>

</style>