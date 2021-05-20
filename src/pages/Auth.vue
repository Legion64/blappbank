<template>
  <Flex :classes="['h-full']">
    <div class="card w-full md:w-8/12 h-20 bg-white flex md:rounded-xl shadow-2xl overflow-hidden">
      <div class="hidden md:flex flex-1 md:flex-1 xl:flex-2 h-full bg-gradient-radial from-custom-blue to-gray-900 flex-col justify-center items-center text-white">
        <h1 class="font-bold md:text-2xl xl:text-4xl text-center">
          Welcome to BlappBank
        </h1>
        <span class="mt-4 font-mono text-center">We wish you healthy lives!</span>
      </div>
      <div class="flex-1 h-full relative">
        <div class="absolute top-0 w-full h-16 flex">
          <div
            class="flex-1 flex justify-center items-center uppercase font-bold select-none cursor-pointer text-tinder"
            @click="changeAction('login')"
          >
            Login
          </div>
          <div
            class="flex-1 flex justify-center items-center uppercase font-bold select-none cursor-pointer text-tinder"
            @click="changeAction('register')"
          >
            Register
          </div>
        </div>
        <div class="flex items-center h-full px-10">
          <transition
            name="loginFade"
            mode="out-in"
          >
            <div
              v-if="action === 'login'"
              key="login"
              class="w-full"
            >
              <button
                class="px-4 py-2 w-full bg-tinder hover:bg-tinder-100 transition duration-300 text-white focus:outline-none"
                @click="handleLoginClick"
              >
                Login
              </button>
            </div>
            <div
              v-else-if="action === 'register'"
              key="register"
              class="w-full"
            >
              <button class="px-4 py-2 w-full bg-tinder text-white focus:outline-none">
                Register
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </Flex>
</template>

<script>
import {ref} from 'vue'
import {useToast} from 'vue-toastification'
import Flex from "../components/Flex.vue";

export default {
	components: {Flex},
	setup(){
		const toast = useToast();
		let action = ref('login');

		function handleLoginClick(){
			toast.success("You've clicked the button.")
		}

		function changeAction(actionVal){
			action.value = actionVal
		}

		return {
			action,
			changeAction,
			handleLoginClick
		}
	}
}
</script>

<style scoped>

</style>