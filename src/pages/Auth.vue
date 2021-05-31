<template>
  <Flex :classes="['h-full']">
    <div class="card w-full md:w-8/12 h-full bg-white flex md:rounded-xl shadow-2xl overflow-hidden">
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
        <div class="flex items-center justify-center flex-col h-full px-10">
          <transition
            name="loginFade"
            mode="out-in"
          >
            <div
              v-if="action === 'login'"
              key="login"
              class="w-full"
            >
              <Login />
            </div>
            <div
              v-else-if="action === 'register'"
              key="register"
              class="w-full"
            >
              <Register />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </Flex>
</template>

<script>
import {onMounted, ref} from 'vue'
import Flex from "../components/Flex.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import Login from "../components/LoginComponent.vue";
import Register from "../components/RegisterComponent.vue";
export default {
	components: {Register, Login, Flex},
	setup(){
    // Hooks
	  const router = useRouter()
    const vuex = useStore()

    // Action
		const action = ref(null);

    const routeAction = router.currentRoute.value.params.action

		function changeAction(actionVal){
      router.push(`/auth/${actionVal}`)
			action.value = actionVal
		}

		onMounted(async () => {
		  if(routeAction && (routeAction === 'login' || routeAction === 'register')){
        action.value = routeAction
      }
    })

		return {
			action,
			changeAction,
      vuex
		}
	}
}
</script>

<style scoped>

</style>