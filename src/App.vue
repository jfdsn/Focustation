<template>
  <div class="grid-container">
    <div class="left-item">
      <Timer />
      <ScheduleList />
    </div>
    <div class="right-item">
      <CatGenerator />
      <Video />
    </div>
  </div>
</template>

<script setup>
  import Video from './components/Video.vue';
  import CatGenerator from './components/CatGenerator.vue';
  import ScheduleList from './components/ScheduleList.vue';
  import Timer from './components/Timer.vue';
</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-areas: 
    'esquerda esquerda direita'
    'esquerda esquerda direita'
    'esquerda esquerda direita';
    justify-items: end;
    gap: 10px;
    height: 100%;
  }

  .right-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    row-gap: 60px;
    grid-area: direita;
  }

  .left-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    grid-area: esquerda;
  }

  @media (min-width: 1024px) {

  }
</style>
