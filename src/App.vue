<template>
  <div class="grid-container">
    <div class="timer-item">aaaaaaaaaaaaaaaaaa Div do Timer</div>
    <ScheduleList class="schedule-item" />
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
</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-areas: 
    'timer timer direita'
    'schedule schedule direita'
    'schedule schedule direita';
    justify-items: end;
    gap: 50px;
  }

  .right-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 64px;
    grid-area: direita;
  }

  .timer-item {
    grid-area: timer;
    background-color: aqua;
    width: 100%;
    height: 200px;
  }

  .schedule-item {
    grid-area: schedule;
    background-color: blueviolet;
    width: 100%;
  }

  @media (min-width: 1024px) {

  }
</style>
