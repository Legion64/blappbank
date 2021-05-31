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
import {onMounted, ref} from "vue";
import AxiosFactory from "../core/services/AxiosService.js";
import {useStore} from "vuex";

import Map from "../components/Map.vue";
import LocalStorageService from "../core/services/LocalStorageService.js";

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