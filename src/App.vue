<script setup lang="ts">
import { ref, computed } from 'vue'
import data from './data/data.json'
import QuestionComponent from './components/QuestionComponent.vue'
import AnswerComponent from './components/AnswerComponent.vue'
import ProgressBarComponent from './components/ProgressBarComponent.vue'
import NextComponent from './components/NextComponent.vue'
import ResultComponent from './components/ResultComponent.vue'

type Answer = {
  image: string
}
type Question = {
  id: number
  text: string
  correct_answer_text: string
  wrong_answer_text: string
  answers: Answer[]
  correct: number
}

const questions = data.questions as Question[]
const currentQuestionIndex = ref<number>(0)
const selectedAnswer = ref<number | null>(null)
const correctAnswers = ref<number>(0)
const showResult = ref<boolean>(false)
const currentQuestion = computed(() => questions[currentQuestionIndex.value]!)
const isAnswered = ref(false)
const selectAnswer = (index: number) => {
  if (isAnswered.value) return
  selectedAnswer.value = index
  isAnswered.value = true
  if (index === currentQuestion.value.correct) {
    correctAnswers.value++
  }
}
const nextQuestion = () => {
  if (currentQuestionIndex.value + 1 < questions.length) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    isAnswered.value = false
  } else {
    showResult.value = true
  }
}
const questionText = computed(() => {
  if (!currentQuestion.value) return ''
  if (!isAnswered.value) {
    return currentQuestion.value.text
  }
  if (selectedAnswer.value === currentQuestion.value.correct) {
    return currentQuestion.value.correct_answer_text
  } else {
    return currentQuestion.value.wrong_answer_text
  }
})
</script>

<template>
  <div class="app">
    <img src="@/assets/left_flowers.png" class="flowers left" />
    <img src="@/assets/right_flowers.png" class="flowers right" />
    <div class="card-wrapper">
      <div class="card">
        <ProgressBarComponent :current="currentQuestionIndex + 1" :total="questions.length" />
        <template v-if="!showResult">
          <div class="question-row">
            <div class="question-wrapper">
              <QuestionComponent :text="questionText" />
            </div>
            <NextComponent v-if="isAnswered" @click="nextQuestion" />
          </div>
          <div class="answers">
            <AnswerComponent
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              :image="`/src/assets/${answer.image}`"
              :index="index"
              :selected="selectedAnswer"
              :correct="currentQuestion.correct"
              :isAnswered="isAnswered"
              @click="selectAnswer(index)"
            />
          </div>
        </template>
        <ResultComponent
          v-else
          :score="correctAnswers"
          :total="questions.length"
          :results="data.requests"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
  background: #3b0066;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.card {
  position: relative;
  background: linear-gradient(
    241.84deg,
    #003dce -3.61%,
    rgba(21, 170, 255) 48.73%,
    rgba(20, 164, 252) 48.74%,
    #003dce 95.39%
  );
  border-radius: 51px;
  width: 700px;
  padding: 40px;
  text-align: center;
  color: white;
  z-index: 2;
}

.card-wrapper {
  position: relative;
}

.card-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translate(5px, 5px);
  border-radius: 51px;
  background: linear-gradient(261.38deg, #0060d9 18.47%, #004193 93.48%);
}

.answers {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.flowers.left {
  position: absolute;
  left: 77px;
  bottom: 30px;
  width: 300px;
}

.flowers.right {
  position: absolute;
  right: 95px;
  top: 5px;
  width: 300px;
}

.question-row {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8%;
}

.question-wrapper {
  text-align: center;
}

.question-row :deep(.next-btn) {
  position: absolute;
  right: 30px;
}
</style>
