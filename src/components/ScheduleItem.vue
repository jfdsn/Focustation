<!-- 
  - Retorna o elemento de uma lista contendo o title e um button 
  - com a função de remover o elemento. Recebe as Props 'title' e
  - uma função '@remove'.
 -->
<template>
  <li class="li-container">
    <p>{{ title }}</p>
    <Button title="-" @click-function="$emit('remove')" />
  </li>
</template>

<script setup>
import Button from './Button.vue'
defineProps(['title'])
defineEmits(['remove'])
</script>

<style scoped>
.li-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
  gap: 10px;
  font-size: 16px;
}
</style>
