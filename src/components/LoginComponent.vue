<template>
  <form
    @submit.prevent="handleSubmitForm"
  >
    <FormInput
      v-model="username"
      name="Username"
      type="text"
      :error="errors.username"
    />
    <FormInput
      v-model="password"
      name="Password"
      type="password"
      :error="errors.password"
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
      <span class="ml-3">Login</span>
    </button>
  </form>
</template>

<script>
import FormInput from "./FormInput.vue";
import {reactive, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Login",
  components: {FormInput},
  setup(){
    const store = useStore()

    const username = ref('')
    const password = ref('')

    const errors = reactive({
      counter: 0,
      username: '',
      password: ''
    })

    function reset(){
      errors.username = errors.password = ''
      errors.counter = 0
    }

    function validator() {
      if (username.value.trim() === ''){
        errors.username = 'Username must not be empty!'
        errors.counter++
      }

      if (password.value.trim() === ''){
        errors.password = 'Password must not be empty!'
        errors.counter++
      }
    }
    
    function handleSubmitForm() {
      if (store.getters['user/getLoading'])
        return false;

      // Clear error before submit form
      reset()

      // Validate submitted form
      validator()

      if(errors.counter > 0)
        return false;

      store.commit('user/setLoading', true)


    }

    return {
      username,
      password,
      handleSubmitForm,
      errors,
      store
    }
  }
}
</script>

<style scoped>

</style>