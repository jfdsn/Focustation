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
