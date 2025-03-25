<!-- 
  - Componente com a função de um timer baseado na técnica de pomodoro.
  - Possui um timer que alterna de Work para Rest ao terminar o tempo,
  - tocando um audio de sinalização. O tempo de work e rest são
  - customizaveis pelo input de type range.
 -->
<template>
  <div class="pomodoro-container">
    <div class="timer-container" :class="{ 'timer-active': timerState.isTimerRunning || timerState.isRestRunning }">
      <h1>{{ timerTitle }}</h1>
      <p class="timer-display">{{ formattedTime }}</p>
      <div class="timer-controls">
        <Button
          v-if="!timerState.isTimerRunning && !timerState.isRestRunning"
          title="Start"
          @click-function="startTimer"
          class="start-button"
        />
        <Button
          v-if="timerState.isTimerRunning || timerState.isRestRunning"
          title="Reset"
          @click-function="resetTimer"
          class="reset-button"
        />
      </div>
    </div>

    <div class="range-container">
      <div class="range-group">
        <label for="work">Work: {{ work }}min</label>
        <input
          id="work"
          v-model="work"
          :disabled="timerState.isTimerRunning || timerState.isRestRunning"
          type="range"
          name="work"
          min="25"
          max="60"
          aria-label="Work duration in minutes"
        />
      </div>

      <div class="range-group">
        <label for="rest">Rest: {{ rest }}min</label>
        <input
          id="rest"
          v-model="rest"
          :disabled="timerState.isTimerRunning || timerState.isRestRunning"
          type="range"
          name="rest"
          min="5"
          max="25"
          aria-label="Rest duration in minutes"
        />
      </div>
    </div>

    <audio ref="myAudio" preload="auto">
      <source src="./audio/magic-notification-ring.wav" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import Button from './Button.vue'
import { timerState } from '../stores/timerState'

const work = ref(45)
const rest = ref(15)
const pomodoroDuration = ref(45 * 60)
const restDuration = ref(15 * 60)
const timeElapsed = ref(0)
const timerTitle = ref('Work')
const formattedTime = ref('00:00')
const myAudio = ref(null)
let timerInterval = null
let startTime = 0

onMounted(() => {
  myAudio.value.load()
  if (localStorage.getItem('work')) work.value = parseInt(localStorage.getItem('work'))
  if (localStorage.getItem('rest')) rest.value = parseInt(localStorage.getItem('rest'))
})

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const startTimer = () => {
  timerTitle.value = 'Work'
  timerState.isTimerRunning = true
  document.title = 'Focus - Work Time'
  startTime = Date.now()
  timeElapsed.value = 0
  updateTimer()
}

const resetTimer = () => {
  timerTitle.value = 'Work'
  timerState.isTimerRunning = false
  timerState.isRestRunning = false
  timeElapsed.value = 0
  document.title = 'Focus App'
  if (timerInterval) clearInterval(timerInterval)
}

const startRest = () => {
  timerTitle.value = 'Rest'
  timerState.isRestRunning = true
  document.title = 'Focus - Rest Time'
  startTime = Date.now()
  timeElapsed.value = 0
  updateTimer()
}

const updateTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    if (timerState.isTimerRunning || timerState.isRestRunning) {
      timeElapsed.value = Math.floor((Date.now() - startTime) / 1000)
    }
  }, 1000)
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
  myAudio.value.play().catch(error => {
    console.error('Error playing audio:', error)
  })
}

// Check timer completion
setInterval(() => {
  if (timerState.isTimerRunning && timeElapsed.value >= pomodoroDuration.value) {
    timerState.isTimerRunning = false
    timeElapsed.value = 0
    playAudio()
    if (!timerState.isRestRunning) {
      startRest()
    }
  }

  if (timerState.isRestRunning && timeElapsed.value >= restDuration.value) {
    timerState.isRestRunning = false
    timeElapsed.value = 0
    playAudio()
    timerTitle.value = 'Work'
    document.title = 'Focus App'
  }
}, 1000)
</script>

<style scoped>
.pomodoro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px groove #f8f8f8;
  padding-bottom: 1.5rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.timer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.timer-container.timer-active {
  background: rgba(209, 79, 4, 0.1);
  box-shadow: 0 0 20px rgba(209, 79, 4, 0.1);
}

.timer-display {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 1rem 0;
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
}

.timer-controls {
  display: flex;
  gap: 1rem;
}

.range-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  gap: 1.5rem;
}

.range-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

label {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.9;
}

input[type="range"] {
  appearance: none;
  width: 100%;
  max-width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  outline: none;
  opacity: 1;
  transition: all 0.2s ease;
}

input[type="range"]:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

input[type="range"]:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d14f04;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover:not(:disabled) {
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d14f04;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

input[type="range"]::-moz-range-thumb:hover:not(:disabled) {
  transform: scale(1.1);
}

@media (max-width: 480px) {
  .pomodoro-container {
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .timer-container {
    padding: 1rem;
  }

  .timer-display {
    font-size: 2.5rem;
  }

  input[type="range"] {
    max-width: 150px;
  }
}
</style>
