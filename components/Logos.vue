<script setup lang="ts">
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import { useSearchStore } from '@/stores/search'
import { formatString, generateVsString, parseVsString } from '@/utils/index'

const store = useSearchStore()
const router = useRouter()
const route = useRoute()
const title = useTitle()

const search = ref<string>('')
const isHovered = ref<boolean>(false)
const routeParams = ref<string>(route.params.slug)
const crates = computed(() => {
  if (!routeParams.value)
    return ''

  return parseVsString(routeParams.value)
})

const borderColors = ref<string[]>(['border-amber-500', 'border-blue-500', 'border-green-500', 'border-pink-500', 'border-purple-500'])

onMounted(() => {
  title.value = routeParams.value
})

// methods or functions

function handleInput() {
  const inputValue = search.value.trim()

  if (!inputValue) {
    // TODO: Toast a message here indicating that the input is empty
    return
  }

  const newParamRoutes = [...crates.value, inputValue]

  store.crateDownloadInfo(inputValue)
  router.push(generateVsString(newParamRoutes))

  search.value = ''
}

function getCrateInfo(crate_name: string) {
  const crate_info = store.getCrateInfo(crate_name)
  if (!crate_info)
    return 'No information for this crate yet'

  return `${crate_info.description} with ${formatString(crate_info.downloads)} downloads`
}

function removeCrate(index: number) {
  const cratesArray = [...parseVsString(routeParams.value)]
  cratesArray.splice(index, 1)

  const newRoute = cratesArray.length === 0 ? '/' : generateVsString(cratesArray)

  router.push(newRoute).then(() => {
    window.location.reload()
  })
}

function getBorderColor(index: number) {
  return borderColors.value[index % borderColors.value.length]
}
function setIsHovered() {
  isHovered.value = !isHovered.value
}
</script>

<template>
  <div>
    <h1 class="pt-4 text-center text-4xl text-[#dea584] font-bold">
      crates trends
    </h1>
    <p class="py-4 text-3xl text-gray:700">
      Compare crates download counts over time
    </p>
    <!-- display the compared crates -->
    <div class="flex py-3 text-5xl">
      <p v-for="(crate, i) in crates" :key="i" class="font-bold">
        {{ crate }} <span v-if="i < crates.length - 1" class="px-2 text-gray:300">vs</span>
      </p>
    </div>
    <input
      id="text-input"
      v-model="search"
      type="text"
      name="text-input"
      class="mt-4 block w-full border rounded-md p-3 transition duration-300 ease-in-out focus:border-gray:400 dark:text-black focus:ring-gray:500"
      placeholder="Enter a crate name..."
      @keyup.enter="handleInput"
    >
    <!--  -->
    <div class="flex gap-x-3 pt-3">
      <button v-for="(crate, i) in crates" :key="i" v-tippy="getCrateInfo(crate)" :on-mouseenter="setIsHovered" :class="getBorderColor(i)" class="flex items-center justify-center gap-x-2 border-2 rounded px-4 py-.5 text-lg">
        <p>{{ crate }}</p>
        <div class="" @click="removeCrate(i)">
          <IconsClose class="cursor-pointer" />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='text'] {
  border: 1px solid rgb(190, 186, 186);
}
</style>
