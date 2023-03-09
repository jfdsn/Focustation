<template>
  <div class="pomodoro-container">
    <div class="timer-container">
      <h1>{{ timerTitle }}</h1>
      <p>{{ formattedTime }}</p>
      <Button
        v-if="!isTimerRunning && !isRestRunning"
        title="Iniciar"
        @click-function="startTimer"
      />
      <Button v-if="isTimerRunning || isRestRunning" title="Resetar" @click-function="resetTimer" />
    </div>

    <div class="range-container">
      <label for="vol">Work: {{ work }}min</label>
      <input
        v-model="work"
        :disabled="isTimerRunning || isRestRunning"
        type="range"
        name="work"
        min="15"
        max="60"
      />

      <label for="rest">Rest: {{ rest }}min</label>
      <input
        v-model="rest"
        :disabled="isTimerRunning || isRestRunning"
        type="range"
        name="rest"
        min="5"
        max="25"
      />
    </div>

    <audio ref="myAudio">
      <source src="./audio/magic-notification-ring.wav" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Button from './Button.vue'

const work = ref(45)
const rest = ref(15)
const pomodoroDuration = ref(45 * 60) //default 45 minutes in seconds
const restDuration = ref(15 * 60) //default 15 minutes in seconds

const timeElapsed = ref(0)
const isTimerRunning = ref(false)
const isRestRunning = ref(false)

const timerTitle = ref('Work')
const formattedTime = ref('00:00')
const myAudio = ref(null)

onMounted(() => {
  myAudio.value.load()
  if (localStorage.getItem('work')) work.value = localStorage.getItem('work')
  if (localStorage.getItem('rest')) rest.value = localStorage.getItem('rest')
})

const startTimer = () => {
  timerTitle.value = 'Work'
  isTimerRunning.value = true
}

const resetTimer = () => {
  timerTitle.value = 'Work'
  isTimerRunning.value = false
  isRestRunning.value = false
  timeElapsed.value = 0
}

const startRest = () => {
  timerTitle.value = 'Rest'
  isRestRunning.value = true
}

watch(timeElapsed, (newValue) => {
  const minutes = Math.floor(newValue / 60)
  const seconds = Math.floor(newValue % 60)
  formattedTime.value = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})

watch(work, (newValue) => {
  pomodoroDuration.value = newValue * 60
  localStorage.setItem('work', newValue)
})

watch(rest, (newValue) => {
  restDuration.value = newValue * 60
  localStorage.setItem('rest', newValue)
})

const playAudio = () => {
  myAudio.value.play()
}

setInterval(() => {
  if (isTimerRunning.value) {
    timeElapsed.value += 1

    if (timeElapsed.value >= pomodoroDuration.value) {
      isTimerRunning.value = false
      timeElapsed.value = 0

      playAudio()

      if (!isRestRunning.value) {
        startRest()
      }
    }
  }

  if (isRestRunning.value) {
    timeElapsed.value += 1

    if (timeElapsed.value >= restDuration.value) {
      isRestRunning.value = false
      timeElapsed.value = 0

      playAudio()
    }
  }
}, 1000)
</script>

<style scoped>
h1 {
  font-weight: bold;
}

p {
  font-size: 24px;
}

.pomodoro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px groove #f8f8f8;
  padding-bottom: 10px;
  gap: 60px;
}

.timer-container,
.range-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(100px, 50%);
}

input {
  appearance: none;
  width: 140px;
  height: 3px;
  margin: 5px;
  background: #f8f8f8;
  outline: none;
  opacity: 1;
  -webkit-transition: 0.4s;
  transition: opacity 0.2s;
}

input:hover {
  opacity: 0.9;
}

input:disabled {
  opacity: 0.3;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d14f04;
  cursor: pointer;
}

input::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d14f04;
  cursor: pointer;
}
</style>
