<template>
  <Flex>
    <div class="card w-full md:w-8/12 bg-white md:rounded-xl shadow-2xl overflow-hidden my-36">
      <div class="map w-full relative">
        <button class="px-8 py-2 text-xl bg-tinder absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white rounded-full shadow-2xl focus:outline-none hover:bg-tinder-100 transition-all duration-300">
          Match Me
        </button>
      </div>
      <div
        class="border border-gray-300 border-b-0 border-l-0 border-r-0"
      >
        <Tabs
          v-model="active"
        >
          <Tab title="My Matches">
            Content A
          </Tab>
          <Tab title="Other Matches">
            Content B
          </Tab>
        </Tabs>
      </div>
    </div>
  </Flex>
</template>

<script>
import Flex from "../components/Flex.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import {ref} from "vue";

export default {
	name: 'Home',
	components: {Tab, Tabs, Flex},
  setup() {
    const active = ref(0);

    return { active };
  },
}
</script>

<style scoped>

</style>