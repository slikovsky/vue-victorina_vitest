<script setup lang="ts">
defineProps({
  text: String,
})
</script>

<template>
  <p class="question">{{ text }}</p>
</template>

<style scoped>
.question {
  margin: 20px 0;
  line-height: 25px;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  white-space: pre-line;
}
</style>
