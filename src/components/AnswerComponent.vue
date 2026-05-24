<script setup lang="ts">
defineProps<{
  image: string
  index: number
  selected: number | null
  correct: number
  isAnswered: boolean
}>()
</script>

<template>
  <div class="answer" :class="{ disabled: isAnswered }">
    <div class="shadow"></div>
    <div class="image-wrapper" :class="{
      correct: isAnswered && index === correct,
      wrong: isAnswered && index === selected && index !== correct,
    }">
      <img :src="image" />
    </div>
    <div v-if="isAnswered && index === correct" class="icon correct-icon">✓</div>
    <div v-if="isAnswered && index === selected && index !== correct" class="icon wrong-icon">
      ✕
    </div>
  </div>
</template>

<style scoped>
.answer {
  position: relative;
  width: 140px;
  height: 180px;
  cursor: pointer;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 180px;
  border-radius: 15px;
  background: #004baa;
  opacity: 0;
  transition: 0.3s;
}

.image-wrapper {
  position: relative;
  border-radius: 20px;
  transition: 0.3s;
  z-index: 2;
}

.image-wrapper::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 19px;
  z-index: -1;
  opacity: 0;
  transition: 0.3s;
}

.image-wrapper img {
  width: 140px;
  height: 180px;
  object-fit: fill;
  border-radius: 15px;
  display: block;
}

.answer:hover .image-wrapper {
  transform: translate(-8px, -8px);
}

.answer:hover .shadow {
  opacity: 1;
}

.answer.disabled {
  pointer-events: none;
}

.answer:has(.correct) .image-wrapper,
.answer:has(.wrong) .image-wrapper {
  transform: none;
}

.answer:has(.correct) .shadow,
.answer:has(.wrong) .shadow {
  opacity: 0;
}

.image-wrapper.correct::before {
  background: linear-gradient(135deg, #9aff21, #66ff31);
  opacity: 1;
}

.image-wrapper.wrong::before {
  background: linear-gradient(135deg, #ff0f8e, #ff549c);
  opacity: 1;
}

.icon {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  font-weight: 1000;
}

.correct-icon {
  background: linear-gradient(135deg, #9aff21, #66ff31);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.wrong-icon {
  background: linear-gradient(135deg, #ff0f8e, #ff549c);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.arrow {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.3s;

  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid white;
}

.answer:hover .arrow {
  opacity: 1;
}
</style>
