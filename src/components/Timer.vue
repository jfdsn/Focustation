<!-- 
  - Componente com a função de um timer baseado na técnica de pomodoro.
  - Possui um timer que alterna de Work para Rest ao terminar o tempo,
  - tocando um audio de sinalização. O tempo de work e rest são
  - customizaveis pelo input de type range.
 -->
<template>
  <div class="pomodoro-container">
    <div class="timer-container">
      <h1>{{ timerTitle }}</h1>
      <p>{{ formattedTime }}</p>
      <Button
        v-if="!timerState.isTimerRunning && !timerState.isRestRunning"
        title="Start"
        @click-function="startTimer"
      />
      <Button
        v-if="timerState.isTimerRunning || timerState.isRestRunning"
        title="Reset"
        @click-function="resetTimer"
      />
    </div>

    <div class="range-container">
      <label for="vol">Work: {{ work }}min</label>
      <input
        v-model="work"
        :disabled="timerState.isTimerRunning || timerState.isRestRunning"
        type="range"
        name="work"
        min="25"
        max="60"
      />

      <label for="rest">Rest: {{ rest }}min</label>
      <input
        v-model="rest"
        :disabled="timerState.isTimerRunning || timerState.isRestRunning"
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
import { timerState } from '../stores/timerState'

const work = ref(45)
const rest = ref(15)
const pomodoroDuration = ref(45 * 60) //default 45 minutes in seconds
const restDuration = ref(15 * 60) //default 15 minutes in seconds

const timeElapsed = ref(0)

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
  timerState.isTimerRunning = true
}

const resetTimer = () => {
  timerTitle.value = 'Work'
  timerState.isTimerRunning = false
  timerState.isRestRunning = false
  timeElapsed.value = 0
}

const startRest = () => {
  timerTitle.value = 'Rest'
  timerState.isRestRunning = true
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
  if (timerState.isTimerRunning) {
    timeElapsed.value += 1

    if (timeElapsed.value >= pomodoroDuration.value) {
      timerState.isTimerRunning = false
      timeElapsed.value = 0

      playAudio()

      if (!timerState.isRestRunning) {
        startRest()
      }
    }
  }

  if (timerState.isRestRunning) {
    timeElapsed.value += 1

    if (timeElapsed.value >= restDuration.value) {
      timerState.isRestRunning = false
      timeElapsed.value = 0

      playAudio()
      timerTitle.value = 'Work'
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
  gap: 4rem;
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
