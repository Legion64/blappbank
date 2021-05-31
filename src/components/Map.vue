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
    class="px-10 py-4 text-md bg-tinder absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white rounded-full shadow-2xl focus:outline-none hover:bg-tinder-100 transition-all duration-300 uppercase font-medium disabled:opacity-80"
    style="z-index: 99999"
    :disabled="matchLoading"
    @click="handleClickEvent"
  >
    <i
      v-if="matchLoading"
      class="far fa-spinner-third fa-spin mr-4"
    />Match Me
  </button>
</template>

<script>
import L from "leaflet";
import {useStore} from "vuex";
import {onMounted, ref} from "vue";

import GreenPin from '../assets/img/location-pin-green.png'
import RedPin from '../assets/img/location-pin-red.png'
import AxiosFactory from "../core/services/AxiosService.js";
import GeolocationService from "../core/services/GeolocationService.js";
import LocalStorageService from "../core/services/LocalStorageService.js";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

export default {
  name: "Map",
  setup() {
    const store = useStore()
    const toast = useToast()
    const router = useRouter()

    let map = null

    const matchLoading = ref(false)

    async function initiateMap() {
      let currentUserCoords = null;

      await GeolocationService.getCurrentPosition().then(({longitude, latitude}) => {
        currentUserCoords = {longitude, latitude}
        store.commit('user/setCoords', {
          longitude,
          latitude
        })
      })

      map = L.map('map').setView([currentUserCoords.latitude, currentUserCoords.longitude], 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([currentUserCoords.latitude, currentUserCoords.longitude]).addTo(map)
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function handleClickEvent() {
      matchLoading.value = true
      const currentUser = LocalStorageService.json('credentials', 'username')
      await AxiosFactory().getAsync("/api/user/" + currentUser).then(res => {
        AxiosFactory().getAsync(`/api/questions/${currentUser}`).then(data => {
          const questions = {
            q1: data.q1 || false,
            q2: data.q2 || false,
            q3: data.q3 || false
          }
          if(questions.q1 && questions.q2){
            AxiosFactory().postAsync("/api/match", null, {
              data: {
                longitude: store.getters['user/getCoords'].longitude,
                latitude: store.getters['user/getCoords'].latitude,
                type: res.type === 'donator' ? 'needer' : 'donator',
                sequence: 1
              }
            }).then(async res => {
              if (res){
                const randomTransactionId = getRandomInt(100000,999999)

                await AxiosFactory().postAsync('/api/transaction', null, {
                  data: {
                    username: res.username,
                    status: null,
                    transaction_id: randomTransactionId
                  }
                })

                await AxiosFactory().postAsync('/api/transaction', null, {
                  data: {
                    username: currentUser,
                    status: null,
                    transaction_id: randomTransactionId
                  }
                })

                toast.success("You are matched!", {
                  position: "top-center"
                })

                await AxiosFactory().postAsync('/api/sendmessage', null, {
                  data: {
                    sender: currentUser,
                    receiver: res.username,
                    body: "Hello!"
                  }
                }).then(res => {
                  if(res === 'OK'){
                    router.push('/messages')
                  }
                })

                matchLoading.value = false
              }else{
                toast.error('No one to match found!')
                matchLoading.value = false
              }
            }).catch(_ => {
              toast.error('You didn\'t match! Something went wrong')
            })
          }else{
            toast.error('To be matched, you must answer affirmatively to the first 2 questions.')
            matchLoading.value = false
          }
        })
      })
    }

    onMounted(async () => {
      await store.dispatch('user/getUserCoords')
      await initiateMap()

      const donatorIcon = L.icon({
        iconUrl: GreenPin,
        iconSize: [32, 32]
      })

      const neederIcon = L.icon({
        iconUrl: RedPin,
        iconSize: [32, 32]
      })

      await AxiosFactory().getAsync('/api/users').then(res => {
        res.filter(user => user.username !== LocalStorageService.json('credentials', 'username')).forEach(data => {
            L.marker([data.latitude, data.longitude], {
              icon: data.type === 'donator' ? donatorIcon : neederIcon
            }).addTo(map)
        })
      })
    })

    return {
      handleClickEvent,
      store,
      matchLoading
    }
  }
}
</script>

<style scoped>

</style>