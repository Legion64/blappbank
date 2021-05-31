<template>
  <Flex>
    <div class="card w-full md:w-8/12 bg-white md:rounded-xl relative shadow-2xl md:my-36">
      <div class="absolute right-4 top-4  z-50">
        <button
          class="bg-gray-200 px-4 py-1 text-sm rounded-full hover:bg-gray-300 transition duration-300 focus:outline-none"
          :class="editable ? 'bg-green-500 text-white hover:bg-green-600' : null"
          @click="editable = !editable"
        >
          {{ editable ? 'Save Profile' : 'Edit Profile' }}
        </button>
      </div>
      <div class="absolute left-4 top-4  z-50">
        <span>Credit: {{ currentUser.credit || 0 }}</span>
      </div>
      <div class="flex flex-col items-center w-full transform -translate-y-16">
        <div class="h-32 w-32 bg-dark-600 rounded-full" />
        <span class="mt-4 mb-1 font-medium text-2xl">{{ (currentUser.name || '-') + " " + (currentUser.surname || '') }}</span>
        <span class="my-2 text-xl">{{ currentUser.username || '-' }}</span>
      </div>
      <div class="flex-1 flex px-4">
        <div class="flex-1 px-4">
          <div class="profile-header relative flex">
            <span class="bg-white z-30 text-dark-600 font-bold">About</span>
            <div
              class="right-0 absolute z-20 top-1/2 transform -translate-y-1/2 horizontal-divider"
              style="width: 88%"
            />
          </div>
          <div class="p-3">
            <span class="text-dark-600 uppercase text-sm font-medium">Contact Information</span>
            <table class="profile-table w-full">
              <tr>
                <td>
                  Phone
                </td>
                <td>
                  <span v-if="!editable">{{ currentUser.phone || '-' }}</span>
                  <input
                    v-else
                    v-model="currentUser.phone"
                    class="border border-2 w-full h-8 pl-2"
                    type="text"
                  >
                </td>
              </tr>
              <tr>
                <td>
                  Address
                </td>
                <td>
                  <span v-if="!editable">{{ currentUser.address || '-' }}</span>
                  <textarea
                    v-else
                    v-model="currentUser.address"
                    class="w-full resize-none border h-24"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Email
                </td>
                <td>
                  <span v-if="!editable">{{ currentUser.email || '-' }}</span>
                  <input
                    v-else
                    v-model="currentUser.email "
                    class="border border-2 w-full h-8 pl-2"
                    type="text"
                  >
                </td>
              </tr>
            </table>
          </div>
          <div class="px-3 py-5">
            <span class="text-dark-600 uppercase text-sm font-medium">Basic Information</span>
            <table class="profile-table w-full">
              <tr>
                <td>
                  Turkish Identifier Number:
                </td>
                <td>
                  <span v-if="!editable">{{ currentUser.tc || '-' }}</span>
                  <input
                    v-else
                    v-model="currentUser.tc"
                    class="border border-2 w-full h-8 pl-2"
                    type="text"
                    maxlength="11"
                  >
                </td>
              </tr>
              <tr>
                <td>
                  Birth Date
                </td>
                <td>
                  <span v-if="!editable">{{ currentUser.birthDate || '-' }}</span>
                  <input
                    v-else
                    v-model="currentUser.birthDate"
                    class="border border-2 w-full h-8 pl-2"
                    type="date"
                  >
                </td>
              </tr>
              <tr>
                <td>
                  Blood Type
                </td>
                <td>
                  <span v-if="!editable">{{ currentUser.bloodType || '-' }}</span>
                  <input
                    v-else
                    v-model="currentUser.bloodType"
                    class="border border-2 w-full h-8 pl-2"
                    type="text"
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="flex-1 px-4">
          <div class="profile-header relative flex mb-3">
            <span class="bg-white z-30 text-dark-600 font-bold">Questions</span>
            <div
              class="right-0 absolute z-20 top-1/2 transform -translate-y-1/2 horizontal-divider"
              style="width: 88%"
            />
          </div>
          <label class="flex justify-between my-3">
            <span>Are you over 18 and under 65?</span>
            <input
              v-model="questionsAnswers.q1"
              type="checkbox"
              :disabled="!editable"
              :checked="questionsAnswers.q1 || false"
            >
          </label>
          <label class="flex justify-between my-3">
            <span>Is your weight more than 50 kg?</span>
            <input
              v-model="questionsAnswers.q2"
              type="checkbox"
              :disabled="!editable"
              :checked="questionsAnswers.q2 || false"
            >
          </label>
          <label class="flex justify-between my-3">
            <span class="break-words w-3/4">Have you ever been refused for any reason when you applied for blood donation?</span>
            <input
              v-model="questionsAnswers.q3"
              type="checkbox"
              :disabled="!editable"
              :checked="questionsAnswers.q3 || false"
            >
          </label>
        </div>
      </div>
    </div>
  </Flex>
</template>

<script>
import Flex from "../components/Flex.vue";
import {onMounted, ref, watch} from "vue";
import AxiosFactory from "../core/services/AxiosService.js";
import LocalStorageService from "../core/services/LocalStorageService.js";
import {useToast} from "vue-toastification";

export default {
  name: "Profile",
  components: {Flex},
  setup() {
    const toast = useToast()

    const editable = ref(false)
    const currentUser = ref({})
    const questionsAnswers = ref({})

    const fetchCurrentUser = () => {
      AxiosFactory().getAsync('/api/user/' + LocalStorageService.json('credentials', 'username')).then(res => {
        currentUser.value = res
      })
      AxiosFactory().getAsync(`/api/questions/${LocalStorageService.json('credentials', 'username')}`).then((res) => {
        console.log(res)
        questionsAnswers.value = res
      })
    }

    const updateData = () => {
      let error = false
      AxiosFactory().postAsync('/api/user', null, {
        data: {
          username: LocalStorageService.json('credentials', 'username'),
          enabled: 1,
          phone: currentUser.value.phone,
          address: currentUser.value.address,
          email: currentUser.value.email,
          tc: currentUser.value.tc,
          birthDate: currentUser.value.birthDate,
          bloodType: currentUser.value.bloodType
        }
      }).catch(_ => error = true)

      AxiosFactory().postAsync('/api/questions', null, {
        data: {
          username: LocalStorageService.json('credentials', 'username'),
          q1: questionsAnswers.value.q1,
          q2: questionsAnswers.value.q2,
          q3: questionsAnswers.value.q3
        }
      }).catch(_ => error = true)

      if (!error){
        toast.success('Profile has been successfully saved!')
      }
    }

    onMounted(() => {
      fetchCurrentUser()
    })

    watch(editable, (currentState) => {
      if (currentState === false) {
        updateData()
      }
    })

    return {
      editable,
      currentUser,
      questionsAnswers,
    }
  }
}
</script>

<style scoped>

</style>