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
            <span v-if="state.loader">Loading</span>
            <User
              v-for="(user, index) in state.users"
              :key="user.id"
              :user="user"
              :index="index"
              :arrow="true"
              main-style="mx-16"
            />
          </Tab>
          <Tab title="Other Matches">
            <span>X gave blood to Y.</span>
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

export default {
  name: 'Home',
  components: {Map, Tab, Tabs, Flex, User},
  setup() {
    const store = useStore()
    const active = ref(0);
    const state = reactive({
      users: null,
      loader: true,
      error: null
    });

    async function fetchUsers() {
      await AxiosFactory().getAsync('/users').then(res => {
        state.loader = false
        state.users = res;
        state.error = null;
      }).catch(err => {
        state.error = err
        setTimeout(() => fetchUsers(), 5000)
      });
    }

    async function handleMatchMe() {
      store.commit('user/setLoading', true)
    }

    onMounted(() => {
      fetchUsers();
    })

    return {
      active,
      state,
      store,
      handleMatchMe
    };
  },
}
</script>

<style scoped>

</style>