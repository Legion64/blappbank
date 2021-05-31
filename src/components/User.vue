<template>
  <div
    class="h-16 select-none hover:bg-gray-200 transition"
  >
    <div
      class="flex items-center h-full"
      :class="mainStyle"
    >
      <div
        class="h-12 w-12 rounded-full bg-dark-600"
      />
      <div class="ml-8">
        <span v-if="userDetails">
          <span class="text-md">
            {{ userDetails.name }}
          </span>
          <span
            class="badge ml-3 px-2 py-1 rounded-md text-white text-sm"
            :class="userDetails.type === 'donator' ? 'bg-green-600' : 'bg-red-600'"
          >
            {{ userDetails.type }}
          </span>
        </span>
        <span
          v-else
          class="skeleton-box w-52"
        />
      </div>
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
import {computed, onMounted, ref} from "vue";
import AxiosFactory from "../core/services/AxiosService.js";

export default {
  name: "User",
  props: {
    user: {
      type: String,
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
    const userDetails = ref({})

    async function fetchUserDetails(){
      await AxiosFactory().getAsync("/api/user/" + props.user).then(res => {
        userDetails.value = res
      })
      console.log("Fetcing:", userDetails.value)
    }

    onMounted(async () => {
      await fetchUserDetails()
    })

    return {
      bgResolver,
      hover,
      userDetails
    }
  }
}
</script>

<style scoped>

</style>