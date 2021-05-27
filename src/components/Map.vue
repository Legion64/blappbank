<template>
  <div
    id="map"
    class="h-full"
  >
    <span
      v-if="!store.getters['user/getNavigatorPermission']"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl"
    >Please allow locations to find matches and view the map.</span>
  </div>
  <button
    v-if="store.getters['user/getNavigatorPermission']"
    class="px-10 py-4 text-md bg-tinder absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white rounded-full shadow-2xl focus:outline-none hover:bg-tinder-100 transition-all duration-300 uppercase font-medium"
    style="z-index: 99999"
    @click="handleClickEvent"
  >
    Match Me
  </button>
</template>

<script>
import L from "leaflet";
import {useStore} from "vuex";
import {onMounted} from "vue";

import GreenPin from '../assets/img/location-pin-green.png'
import RedPin from '../assets/img/location-pin-red.png'

export default {
  name: "Map",
  setup(){
    const store = useStore()
    let map = null

    async function initiateMap() {
      console.log(store.state.user.coords.latitude)
      map = L.map('map').setView([store.state.user.coords.latitude, store.state.user.coords.longitude], 15)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([store.state.user.coords.latitude, store.state.user.coords.longitude]).addTo(map)
    }

    function handleClickEvent(){
      const users = [
        {
          id: 1,
          user: 'jdoe',
          name: 'Jhon Doe',
          longitude: 39.500883321738314,
          latitude: 26.981733635424575,
          type: 'needer'
        },
        {
          id: 2,
          user: 'jdoe2',
          name: 'Jhon Doe 2',
          longitude: 39.502793985704876,
          latitude: 26.98030699491971,
          type: 'donator'
        }
      ]

      const donatorIcon = L.icon({
        iconUrl: GreenPin,
        iconSize: [32, 32]
      })

      const neederIcon = L.icon({
        iconUrl: RedPin,
        iconSize: [32, 32]
      })

      users.map(item => {
        L.marker([item.longitude, item.latitude], {
          icon: item.type === 'donator' ? donatorIcon : neederIcon
        }).addTo(map)
      })
    }

    onMounted(async () => {
      await store.dispatch('user/getUserCoords')
      await initiateMap()
    })

    return {
      handleClickEvent,
      store
    }
  }
}
</script>

<style scoped>

</style>