<!-- 
  - Componente responsável por renderizar uma imagem baseado no consumo
  - de uma API(random cat). Composto por uma tag img e um botão com a
  - função de buscar uma nova imagem na API.
 -->
<template>
  <div class="cat-container">
    <img v-if="catUrl == 'error'" class="cat-img" src="./imgs/cat-error.png" />
    <img v-else-if="timerState.isTimerRunning" class="cat-img" src="./imgs/cat-focus.png" />
    <img v-else class="cat-img" :src="catUrl.file" />
    <Button title="Meow!" @click-function="getCat" :disabled="timerState.isTimerRunning" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import Button from './Button.vue'
import { timerState } from '../stores/timerState'

const catUrl = ref('')

onBeforeMount(async () => {
  await getCat()
})

const getCat = async () => {
  try {
    const response = await fetch('https://aws.random.cat/meow')
    catUrl.value = await response.json()
  } catch (error) {
    catUrl.value = 'error'
    console.log('Algo errado ocorreu: ' + error)
  }
}
</script>

<style scoped>
.cat-container {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 4px;
}

.cat-img {
  max-width: 300px;
  height: 200px;
  border-radius: 4px;
}

@media (max-width: 850px) {
  .cat-container {
    flex-direction: column-reverse;
  }
}
</style>
