<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
input[type='text'],
input[type='email'],
input[type='password'] {
  min-width: 66%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid transparent;
  border-bottom: 1px solid #d14f04;
  background-color: transparent;
  color: #f8f8f8;
  transition: 0.4s;
}

input[type='text']:focus,
input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  transition: 0.4s;
  border: 1px solid #d14f04;
  border-radius: 4px;
}
</style>
