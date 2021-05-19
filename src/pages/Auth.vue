<template>
	<div class="card w-full md:w-8/12 h-20 bg-white flex md:rounded-xl shadow-2xl overflow-hidden">
		<div class="hidden md:flex flex-1 md:flex-1 xl:flex-2 h-full bg-gradient-radial from-custom-blue to-gray-900 flex-col justify-center items-center text-white">
			<h1 class="font-bold md:text-2xl xl:text-4xl text-center">Welcome to BlappBank</h1>
			<span class="mt-4 font-mono text-center">We wish you healthy lives!</span>
		</div>
		<div class="flex-1 h-full relative">
			<div class="absolute top-0 w-full h-16 flex">
				<div class="flex-1 flex justify-center items-center uppercase font-bold select-none cursor-pointer text-tinder" @click="changeAction('login')">
					Login
				</div>
				<div class="flex-1 flex justify-center items-center uppercase font-bold select-none cursor-pointer text-tinder" @click="changeAction('register')">
					Register
				</div>
			</div>
			<div class="flex items-center h-full px-10">
				<transition name="loginFade" mode="out-in">
					<div class="w-full" v-if="action === 'login'" key="login">
						<button @click="handleLoginClick" class="px-4 py-2 w-full bg-tinder hover:bg-tinder-100 transition duration-300 text-white focus:outline-none">
							Login
						</button>
					</div>
					<div class="w-full" v-else-if="action === 'register'" key="register">
						<button class="px-4 py-2 w-full bg-tinder text-white focus:outline-none">
							Register
						</button>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import {ref} from 'vue'
import {useToast} from 'vue-toastification'

export default {
	setup(){
		const toast = useToast();
		let action = ref('login');

		function handleLoginClick(){
			toast.success("Yeah boi! You've clicked the button.")
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