<template>
  <nav class="px-5 transform -translate-y-3 absolute w-full z-50">
    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
      <div class="flex-shrink-0 flex items-center">
        <router-link to="/">
          <img
            class="hidden lg:block h-28 w-auto"
            src="./assets/img/logo_transparent.png"
            alt="Workflow"
          >
        </router-link>
      </div>
      <div class="hidden sm:block sm:ml-6 relative">
        <div
          v-if="store.getters['user/getIsAuthenticated']"
          class="flex space-x-4 absolute transform -translate-y-1/2"
          style="top: 45%"
        >
          <router-link
            to="/"
            class="text-white px-3 py-2 rounded-md text-sm font-medium"
            active-class="bg-gray-800 text-black"
          >
            Dashboard
          </router-link>
          <router-link
            to="/messages"
            class="text-white px-3 py-2 rounded-md text-sm font-medium"
            active-class="bg-gray-800 text-black"
          >
            Messages
          </router-link>
        </div>
      </div>
      <div class="flex-1" />
      <div class="absolute mr-4 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <router-link
          v-if="store.getters['user/getIsAuthenticated']"
          to="/logout"
          class="text-white px-3 py-2 rounded-md text-sm font-medium mr-4 hover:bg-gray-800"
          active-class="bg-gray-800 text-black"
        >
          Logout
        </router-link>
        <router-link
          v-if="store.getters['user/getIsAuthenticated']"
          to="/profile"
        >
          <div
            class="rounded-full box-content border-white border-2 p-1 shadow-2xl"
          >
            <div class="w-10 h-10 bg-white rounded-full overflow-hidden ">
              <img
                class="w-full h-full object-contain transform translate-y-2"
                src="./assets/img/profile.png"
                alt="Profile"
              >
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script>
import {useStore} from "vuex";

export default {
  setup(){
    const store = useStore()

    return {
      store
    }
  }
}
</script>

<style>

</style>
