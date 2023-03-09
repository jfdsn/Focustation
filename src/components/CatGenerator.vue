<template>
  <div class="container">
    <img class="cat-img" :src="catUrl.file" />
    <Button title="Meow!" @click-function="getCat"></Button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import Button from './Button.vue'

const catUrl = ref('')

onBeforeMount(async () => {
  await getCat()
})

const getCat = async () => {
  try {
    const response = await fetch('https://aws.random.cat/meow')
    catUrl.value = await response.json()
  } catch (error) {
    console.log('Algo errado ocorreu: ' + error)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 4px;
}

.cat-img {
  width: 300px;
  height: 200px;
  border-radius: 4px;
}
</style>
