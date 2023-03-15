<!-- 
  - Componente simples que retorna um input, o estilo para os types
  - 'text', 'email' e 'password' e recebe a Prop v-model que irá 
  - armazenar o valor inserido no input.
 -->
<template>
  <input
    :value="modelValue"
    @keydown.enter="$emit('on-press-enter')"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue', 'on-press-enter'])
</script>

<style scoped>
input[type='text'],
input[type='email'],
input[type='password'] {
  min-width: 60%;
  padding: 8px;
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
