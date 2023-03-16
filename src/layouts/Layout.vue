<!--
    Layout base das views.
-->
<template>
  <header>
    <Logo />
  </header>

  <slot></slot>
</template>

<script setup>
import Logo from '../components/Logo.vue'
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  max-height: fit-content;
  padding-bottom: 1.5rem;
}
</style>
