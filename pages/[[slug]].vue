<!-- eslint-disable no-console -->
<script setup  lang="ts">
import { computed, ref } from 'vue'
import { createChartData } from '../utils/line-data'
import { useSearchStore } from '@/stores/search'

const store = useSearchStore()
const route = useRoute()

const selectedDuration = ref('week')
const routeParams = ref<string>(route.params.slug)
const chartDetails = ref()

const crates = computed(() => {
  if (!routeParams.value)
    return ''

  return parseVsString(routeParams.value)
})

onBeforeMount(() => {
  fetchCrateInfo()
  initializeSeries()
})

// methods

function fetchCrateInfo() {
  if (!crates.value)
    return

  crates.value.forEach((element) => {
    store.crateDownloadInfo(element)
  })
}

function initializeSeries() {
  if (!crates.value)
    return
  const cratesData = crates.value.map((crate) => {
    const data = store.$state.cratesDownloadHashMap[crate]

    return filterDownloadsByDuration(data!, selectedDuration.value, crate)
  })
  const filteredData = createChartData(cratesData)
  chartDetails.value = filteredData
}
</script>

<template>
  <div>
    <div class="flex items-center gap-x-4">
      <div class="flex items-center gap-x-2">
        <h3 class="text-xl font-bold">
          Downloads
        </h3>
        <p class="text-gray-700 font-light">
          in past
        </p>
      </div>
      <select id="categorySelect" v-model="selectedDuration" name="hall" class="text-black underline underline-offset-4 dark:text-gray:700" @change="initializeSeries()">
        <option value="year" selected>
          1 year
        </option>
        <option value="week">
          3 months
        </option>
        <option value="month">
          6 months
        </option>
        <option value="alltime">
          All time
        </option>
      </select>
    </div>
    <ClientOnly>
      <LineChart :chart-data="chartDetails" class="h-[800]" />
    </ClientOnly>
    <!-- start section -->
    <div>
      <h2 class="pt-3 text-left text-2xl">
        Stats
      </h2>
      <div>
        <div v-if="crates" class="relative overflow-x-auto pt-5">
          <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="text-sm text-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p3" />
                <th scope="col" class="p3" />
                <th scope="col" class="p3" />
                <th scope="col" class="p3">
                  Version
                </th>
                <th scope="col" class="p-3">
                  <div class="flex gap-x-2">
                    <p>Updated</p>
                    <IconsQuestion v-tippy="`Publish date for the version tagged 'latest'. This may differ from the 'Last publish' date seen on the crates io website because that includes all version tags (experimental, next, alpha, etc.)`" class="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" class="p3">
                  <div class="flex gap-x-2">
                    <p>Created</p>
                    <IconsQuestion v-tippy="`Date first version was published`" class="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              <TableCrate v-for="(crate, i) in crates" :key="i" :crate="crate" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
