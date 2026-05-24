<script setup lang="ts">
import { computed } from 'vue'

type Result = {
  count: number | number[]
  text: string
}

const { score, results } = defineProps<{
  score: number
  total: number
  results: Result[]
}>()
const resultText = computed(() => {
  return results.find((r) => {
    if (Array.isArray(r.count)) {
      return r.count.includes(score)
    }
    return r.count === score
  })?.text
})
</script>

<template>
  <div>
    <h2>Ваш результат: {{ score }} / {{ total }}</h2>
    <p>{{ resultText }}</p>
  </div>
</template>
