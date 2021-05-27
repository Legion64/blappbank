<template>
  <Transition name="error">
    <div
      v-if="errors.length > 0"
      class="bg-red-500 p-5 text-white text-sm mb-4 rounded-md"
    >
      <ul
        v-for="(item, index) of errors"
        :key="index"
      >
        <li>{{ item }}</li>
      </ul>
    </div>
  </Transition>
  <form @submit.prevent="handleSubmitForm">
    <FormInput
      v-model="credentials.username"
      name="Username"
      type="text"
      :error="errors.username"
    />
    <FormInput
      v-model="credentials.password"
      name="Password"
      type="password"
      :error="errors.password"
    />
    <FormInput
      v-model="credentials.identifier"
      name="Turkish Identity Number"
      type="text"
      :mask="{ mask: IMask.MaskedRange, overwrite: true, from: 10000000000, to: 99999999999, placeholderChar: '_', maxLength: 11 }"
      :error="errors.identifier"
    />
    <FormInput
      v-model="credentials.phone"
      name="Phone Number"
      type="text"
      :mask="{ mask: '+9\\0 (000) 000-00-00' }"
      :error="errors.phone"
    />
    <button
      type="submit"
      class="w-full h-12 bg-tinder rounded-md uppercase text-white font-light focus:outline-none hover:bg-tinder-100 transition duration-300 mt-3 disabled:opacity-70"
      :disabled="store.getters['user/getLoading']"
    >
      <i
        v-if="store.getters['user/getLoading']"
        class="far fa-spinner-third fa-spin"
      />
      <span class="ml-3">Register</span>
    </button>
  </form>
</template>

<script>
import FormInput from "./FormInput.vue";
import {reactive, ref} from "vue";
import {useStore} from "vuex";

import IMask from 'imask';

export default {
  name: "Register",
  components: {FormInput},
  setup(){
    const store = useStore()

    const credentials = reactive({
      username: '',
      password: '',
      identifier: '',
      phone: ''
    })
    let errors = ref([])

    function identityNumberCheck(number) {
      const figures = number.split('').map(Number)
      const lastFigure = figures.pop()
      const total = figures.reduce((a, b) => a + b, 0).toString()
      const validator = parseInt(total.split('').pop())
      return lastFigure === validator;
    }

    function resetErrors() {
      errors.value = []
    }

    function validator() {
      // Username Check
      if (credentials.username.trim() === ''){
        errors.value.push('Username must not be empty!')
      }

      // Password Check
      if (credentials.password.trim() === ''){
        errors.value.push('Password must not be empty!')
      }

      // Identifier Number Check
      if (credentials.identifier.trim() === ''){
        errors.value.push('Username must not be empty!')
      }else if(!identityNumberCheck(credentials.identifier.trim())){
        errors.value.push('Identifier number not valid!')
      }

      //
      if (credentials.phone.trim() === ''){
        errors.value.push('Phone number must not be empty!')
      }
    }

    function handleSubmitForm() {
      resetErrors()
      validator()

      if(errors.value.length > 0){
        return false;
      }

      store.commit('user/setLoading', true)
    }

    return {
      credentials,
      store,
      errors,
      handleSubmitForm,
      IMask
    }
  }
}
</script>

<style scoped>

</style>