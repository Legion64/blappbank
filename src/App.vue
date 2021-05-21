<template>
  <div class="rounded-full absolute right-16 top-8 box-content border-white border-2 p-1 shadow-2xl">
    <div class="w-16 h-16 bg-white rounded-full overflow-hidden ">
      <img
        class="w-full h-full object-contain transform translate-y-2"
        src="./assets/img/profile.png"
        alt="Profile"
      >
    </div>
  </div>
  <RouterView />
</template>

<script>
export default {
  
}
</script>

<style>

</style>
