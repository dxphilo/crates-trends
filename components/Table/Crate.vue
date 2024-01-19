<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { formatDate } from '@/utils/index'

const props = defineProps({
  crate: {
    type: String,
    required: true,
  },
})

const store = useSearchStore()
const crateInfo = ref()

onBeforeMount(() => {
  crateInfo.value = store.getCrateInfo(props.crate as string)
  console.log(crateInfo.value)
})
</script>

<template>
  <tr v-if="crateInfo" class="border-b dark:border-gray-700">
    <th scope="row" class="whitespace-nowrap px-6 py-4 text-gray-900 font-medium dark:text-white">
      <div class="flex gap-x-10">
        <p>{{ crateInfo.name }}</p>
      </div>
    </th>
    <td class="px-6 py-4">
      <div class="flex items-center gap-x-5">
        <a v-tippy="`GitHub`" :href="crateInfo.repository ? crateInfo.repository : crateInfo.documentation" target="_blank" rel="noopener noreferrer" class="text-gray:500 hover:text-black dark:hover:text-white"><IconsGithub class="h-6 w-6" /></a>
        <a v-tippy="`Website`" :href="crateInfo.documentation ? crateInfo.documentation : crateInfo.repository" target="_blank" rel="noopener noreferrer" class="text-gray:500 hover:text-green:800"><IconsLink class="h-6 w-6" /></a>
      </div>
    </td>
    <td class="px-6 py-4">
      {{ }}
    </td>
    <td class="px-6 py-4">
      {{ crateInfo.max_stable_version }}
    </td>
    <td class="px-6 py-4">
      {{ formatDate(crateInfo.updated_at) }}
    </td>
    <td class="px-6 py-4">
      {{ formatDate(crateInfo.created_at) }}
    </td>
    <td class="px-6 py-4">
      <!-- TODO: find a bundler to show the size -->
      {{ }}
    </td>
  </tr>
</template>
