<template>
	<div class="card w-full md:w-8/12 h-20 bg-white flex md:rounded-xl shadow-2xl overflow-hidden">
		<div
				class="flex-1 flex justify-center items-center hover:bg-gray-100 transition duration-300 cursor-pointer relative border-b-0 border-t-0 border-l-0 border-r-1 border"
				@mouseenter="showNeederEvent(true)" @mouseleave="showNeederEvent(false)">
			<transition name="fade" mode="out-in">
				<img v-if="showNeeder" class="w-full object-cover opacity-25"
				     src="../assets/img/needer.png" alt="Needer">
			</transition>
			<div class="w-2/3">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<h1 class="text-2xl font-medium text-center">Needer</h1>
					<span class="mt-8 block text-xl text-center">If you need blood, we are always there for you. We are working to find the most accurate blood matches.</span>
				</div>
			</div>
		</div>
		<div
				class="flex-1 flex justify-center items-center hover:bg-gray-100 transition duration-300 cursor-pointer relative"
				@mouseenter="showDonatorEvent(true)" @mouseleave="showDonatorEvent(false)">
			<transition name="fade" mode="out-in">
				<img v-if="showDonator" class="w-full object-cover opacity-25"
				     src="../assets/img/donator.png" alt="Donator">
			</transition>
			<div class="w-2/3">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<h1 class="text-2xl font-medium text-center">Donator</h1>
					<span class="mt-8 block text-xl text-center">Don't you want to make people who need blood happy? If you want this, don't stop! You too, donate your blood.</span>
				</div>
			</div>
		</div>
	</div>
	<div class="span mt-4 font-medium text-white">Please select one to continue.</div>
</template>

<script>
import {ref} from "vue";

export default {
	name: "TypeSelector",
	setup() {
		const showNeeder = ref(false);
		const showDonator = ref(false);

		function showNeederEvent(visibility) {
			showNeeder.value = visibility;
		}

		function showDonatorEvent(visibility) {
			showDonator.value = visibility;
		}

		return {
			showNeeder,
			showDonator,
			showNeederEvent,
			showDonatorEvent
		}
	}
}
</script>

<style scoped>

</style>