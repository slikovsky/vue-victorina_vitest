<script setup lang="ts">
const props = defineProps<{
  current: number
  total: number
}>()
const ticks = Array.from({ length: props.total - 1 })
</script>

<template>
  <div class="progress">
    <div class="bar" :style="{ width: (props.current / props.total) * 100 + '%' }"></div>
    <div class="ticks">
      <span
        v-for="(_, index) in ticks"
        :key="index"
        class="tick"
        :style="{ left: ((index + 1) / props.total) * 100 + '%' }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.progress {
  position: relative;
  height: 6px;
  background: #0096ec;
  border-radius: 10px;
  margin-bottom: 20px;
}

.bar {
  height: 100%;
  background: #6bff2f;
  border-radius: 10px;
  transition: 0.3s;
}

.ticks {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
}

.tick {
  position: absolute;
  top: 3px;
  width: 2px;
  height: 12px;
  background: #0096ec;
  transform: translateX(-50%);
}
</style>
