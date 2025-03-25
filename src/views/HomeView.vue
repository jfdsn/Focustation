<!-- 
  - View principal do Focus app. Integrando os componentes Timer, ScheduleList,
  - CatGenerator e Video.
-->
<template>
  <Layout>
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
    <ReturnTopBtn />
  </Layout>
</template>

<script setup>
import Layout from '../layouts/Layout.vue'
import Video from '../components/Video.vue'
import CatGenerator from '../components/CatGenerator.vue'
import ScheduleList from '../components/ScheduleList.vue'
import Timer from '../components/Timer.vue'
import ReturnTopBtn from '../components/ReturnTopBtn.vue'
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: 1fr;
  grid-template-areas: 'esquerda direita';
  justify-items: center;
  gap: 2rem;
  height: 100%;
  padding: 1rem;
}

.header-item {
  grid-area: cima;
}

.right-item {
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: 2rem;
  grid-area: direita;
  max-width: 300px;
}

.left-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 500px;
  height: 100%;
  grid-area: esquerda;
}

@media (max-width: 850px) {
  .grid-container {
    grid-template-areas:
      'cima'
      'esquerda'
      'direita';
    gap: 1rem;
    padding: 0.5rem;
  }

  .right-item {
    row-gap: 1rem;
    flex-direction: column-reverse;
    max-width: 100%;
  }

  .left-item {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .grid-container {
    gap: 0.5rem;
    padding: 0.25rem;
  }
}
</style>
