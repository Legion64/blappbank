<template>
  <div class="relative py-2">
    <span
      class="absolute top-5 transform pointer-events-none px-2 transition-all duration-200"
      :class="active ? 'bg-white left-2 -translate-y-5 text-sm' : 'left-3  opacity-80'"
    >{{ name }}</span>
    <input
      :type="type"
      class="border-2 h-12 p-4 rounded-md w-full"
      :class="error ? 'border-red-600' : 'border-blue-500'"
      @focus="handleFocusEvent"
      @blur="handleBlurEvent"
      @input="handleTyping"
    >
    <span
      v-if="error"
      class="text-red-500 text-sm mt-2 block font-medium"
    >{{ error }}</span>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, ref} from "vue";

import IMask from 'imask'

export default {
  name: "FormInput",
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false,
      default: null
    },
    mask: {
      type: Object,
      required: false,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}){
    const active = ref(false)

    function handleFocusEvent() {
      active.value = true
    }

    function handleBlurEvent(e) {
      if(e.target.value !== ''){
        return false
      }
      active.value = false
    }

    function handleTyping(e){
      emit('update:modelValue', e.target.value)
    }

    onMounted(() => {
      if (props.mask instanceof Object){
        IMask(getCurrentInstance().vnode.el.querySelector('input'), props.mask)
      }
    })

    return {
      active,
      handleBlurEvent,
      handleFocusEvent,
      handleTyping
    }
  }
}
</script>

<style scoped>

</style>