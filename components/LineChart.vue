<script setup lang="ts">
import Chart from 'chart.js/auto'
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  chartData: Object,
})

onMounted(() => {
  const ctx = document.getElementById('line-chart')
  new Chart(ctx, props.chartData)
})
</script>

<template>
  <div>
    <canvas id="line-chart" />
  </div>
</template>
