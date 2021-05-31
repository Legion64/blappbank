<template>
  <div :class="flexClass">
    <slot />
  </div>
</template>

<script>

import {ref} from "vue";

export default {
	name: "Flex",
	props: {
		classes: {
			type: Array,
			required: false,
      default: null
		}
	},
	setup(props){
		const flexClass = ref(['flex', 'justify-center', 'items-center']);
		const propArray = props.classes || [];

		if (propArray.length > 0){
			flexClass.value.push(...propArray);
		}

		return {
			flexClass
		}
	}
}
</script>

<style scoped>

</style>