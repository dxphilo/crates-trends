<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { formatDate, formatString, generateVsString, getTimeAgo } from '@/utils/index'

const store = useSearchStore()
const router = useRouter()
const isLoading = ref<boolean>(true)

const categories = ref(['Cryptography', 'Maths', 'CLI'])
const selectedCategory = ref('All Categories')

const mostDownloadedCrates = computed(() => {
  return store.$state.mostDownloaded
})

onBeforeMount(store.mostDownloadedCrates)

// methods

function handleNameSubmit(crate_name: string) {
  router.push(`/${crate_name}`).then(() => {
    window.location.reload()
  })
}
</script>

<template>
  <div class="flex justify-between pb-10 text-left text-lg">
    <P>
      Most downloaded
    </P>
    <!-- here we should probaly have a selcetnt by category to select the most downloaded crates based on category -->
    <div>
      <label for="categorySelect">Select Category:</label>
      <select id="categorySelect" v-model="selectedCategory" name="hall" class="dark:text-gray:700">
        <option value="All Categories" selected class="text-gray:700">
          All Categories
        </option>
        <!-- Iterate over your categories and dynamically generate options -->
        <option v-for="(category, index) in categories" :key="index" :value="category" class="text-gray:700">
          {{ category }}
        </option>
      </select>
    </div>
  </div>
  <div v-if="!isLoading" class="flex justify-between">
    <!-- Skeleton Loader Card -->
    <div v-for="i in 20" :key="i" role="status" class="max-w-sm animate-pulse">
      <div class="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div class="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700" />
      <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div class="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700" />
      <div class="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700" />
      <div class="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700" />
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else class="wrap flex flex-wrap gap-8">
    <div v-for="(crate, index) in mostDownloadedCrates" :key="index" class="card text-left">
      <h2
        v-tippy="'By clicking on this crate, it will be added to the comparison section, allowing you to compare its download counts with other selected crates over time'" class="cursor-pointer" @click="handleNameSubmit(crate.name)"
      >
        {{ index + 1 }}. {{ crate.name }}
      </h2>
      <div class="h-[80px] text-gray:700">
        <p>
          {{ crate.description.slice(0, 98) }}
        </p>
      </div>
      <div class="py-2 text-sm">
        <div class="flex justify-between">
          <p>
            Stable version
          </p>
          <p class="text-gray:700">
            {{ crate.max_stable_version }}
          </p>
        </div>
        <div class="flex justify-between py-2">
          <p>
            Created
          </p>
          <p class="text-gray:700">
            {{ formatDate(crate.created_at) }}
          </p>
        </div>
        <div class="flex justify-between">
          <p>
            Updated
          </p>
          <p class="text-gray:700">
            {{ getTimeAgo(crate.updated_at) }}
          </p>
        </div>
      </div>
      <div class="py-1 text-sm">
        <div class="flex justify-between">
          <IconsDownload class="h-6 w-6" />
          <p>{{ formatString(crate.downloads) }}</p>
        </div>
        <div class="flex justify-between pt-3">
          <a :href="crate.documentation ? crate.documentation : crate.repository" class="cursor-pointer hover:underline hover:underline-offset-4" target="_blank" rel="noopener noreferrer">Docs</a>
          <div class="flex gap-x-2 hover:underline hover:underline-offset-4">
            <IconsGithub class="h-5 w-5" />
            <a :href="crate.documentation ? crate.documentation : crate.repository" class="cursor-pointer" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  width: 300px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}
</style>
