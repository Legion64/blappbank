<template>
  <Flex>
    <div class="card w-full md:w-8/12 bg-white md:rounded-xl shadow-2xl overflow-hidden md:my-36">
      <div
        class="map w-full relative"
      >
        <Map />
      </div>
      <div
        class="border border-gray-300 border-b-0 border-l-0 border-r-0"
      >
        <Tabs
          v-model="active"
        >
          <Tab title="My Matches">
            <User
              v-for="(user, index) in myMatches"
              :key="user.id"
              :user="user"
              :index="index"
              :arrow="true"
              main-style="mx-16"
              class="odd:bg-gray-50"
            />
            <div
              v-if="myMatches.length === 0"
              class="p-6 flex justify-center items-center h-64"
            >
              <span class="text-2xl text-gray-600">You haven't made a match yet!</span>
            </div>
          </Tab>
          <Tab title="Other Matches">
            <div
              v-for="(user, index) in matches"
              :key="index"
              class="h-16 select-none hover:bg-gray-200 odd:bg-gray-50 transition"
            >
              <div
                class="flex items-center h-full mx-16"
              >
                <div class="ml-8">
                  <span v-if="user">
                    <span class="text-md">
                      {{ user.from }}
                    </span>
                    <span class="mx-3"><i class="far fa-arrow-right" /></span>
                    <span class="text-md">
                      {{ user.to }}
                    </span>
                    <span
                      v-if="user.transaction === 'notcompleted'"
                      class="ml-5 bg-gray-600 text-white rounded-md py-1 px-2 text-sm"
                    >Not completed</span>
                    <span
                      v-else-if="user.transaction === 'rejected'"
                      class="ml-5 bg-red-600 text-white rounded-md py-1 px-2 text-sm"
                    >Rejected</span>
                    <span
                      v-else-if="user.transaction === 'approved'"
                      class="ml-5 bg-green-600 text-white rounded-md py-1 px-2 text-sm"
                    >Completed</span>
                  </span>
                  <span
                    v-else
                    class="skeleton-box w-52"
                  />
                </div>
                <div class="flex-1" />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  </Flex>
</template>

<script>
import Flex from "../components/Flex.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import User from "../components/User.vue";
import {onMounted, ref, reactive} from "vue";
import AxiosFactory from "../core/services/AxiosService.js";
import {useStore} from "vuex";

import Map from "../components/Map.vue";
import LocalStorageService from "../core/services/LocalStorageService.js";
import GeolocationService from "../core/services/GeolocationService.js";

export default {
  name: 'Home',
  components: {Map, Tab, Tabs, Flex, User},
  setup() {
    const store = useStore()
    const active = ref(0);

    const myMatches = ref([])
    const matches = ref([])

    async function fetchMyMatches() {
      await AxiosFactory().getAsync('/api/messages/user/' + LocalStorageService.json('credentials', 'username')).then(res => {
        res.forEach((item) => {
          myMatches.value.push(item)
        })
      });
    }

    async function allMatches() {
      matches.value.push({
        from: 'admin',
        to: 'melihb',
        transaction: 'approved'
      })
      matches.value.push({
        from: 'ubozdgn',
        to: 'melihb',
        transaction: 'rejected'
      })
    }

    onMounted(() => {
      fetchMyMatches();
      allMatches()
    })

    return {
      active,
      store,
      myMatches,
      matches
    };
  },
}
</script>

<style scoped>

</style>