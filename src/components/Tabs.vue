<template>
  <div
    v-for="(tab, i) of tabs"
    :key="i"
    class="flex-col flex-1 inline-flex text-lg font-bold uppercase h-16 w-1/2 select-none cursor-pointer hover:bg-gray-50"
    @click="selectTab(i)"
  >
    <Flex class="justify-center items-center h-full">
      {{ tab.props.title }}
    </Flex>
  </div>
  <slot />
</template>

<script>
import {provide, computed, ref} from "vue";
import Flex from "./Flex.vue";

export default {
  name: "Tabs",
  components: {Flex},
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: ''
    },
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const active = computed(() => props.modelValue);
    const tabs = ref([]);

    function selectTab(tab) {
      emit("update:modelValue", tab);
    }

    provide("tabsState", {
      active,
      tabs,
    });

    return {
      tabs,
      active,
      selectTab,
    };
  },
};
</script>