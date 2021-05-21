<template>
  <div
    :class="bgResolver"
    class="h-16 select-none cursor-pointer hover:bg-gray-200 transition"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div
      class="flex items-center h-full"
      :class="mainStyle"
    >
      <div
        class="h-12 w-12 rounded-full bg-dark-600"
      />
      <span class="ml-8">
        {{ user.name }}
      </span>
      <div class="flex-1" />
      <div
        v-if="arrow"
        class="float-left"
      >
        <i
          class="fas fa-chevron-right"
          :class="[hover ? 'text-gray-400': 'text-dark-500']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
  name: "User",
  props: {
    user: {
      type: Object,
      required: true,
      default: null
    },
    index: {
      type: Number,
      required: true,
      default: null
    },
    arrow: {
      type: Boolean,
      required: false
    },
    mainStyle: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const hover = ref(false)
    const bgResolver = computed(() => {
      return props.index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
    });

    return {
      bgResolver,
      hover
    }
  }
}
</script>

<style scoped>

</style>