<template>
  <div class="about">
    <CatGenerator />
    <Video />
  </div>
</template>

<script setup>
  import Video from '../components/Video.vue';
  import CatGenerator from '../components/CatGenerator.vue';
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
