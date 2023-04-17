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
  gap: 1rem;
  height: 100%;
}

.header-item {
  grid-area: cima;
}

.right-item {
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: 5rem;
  grid-area: direita;
}

.left-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  grid-area: esquerda;
}

@media (max-width: 850px) {
  .grid-container {
    grid-template-areas:
      'cima'
      'esquerda'
      'direita';
  }
  .right-item {
    row-gap: 1rem;
    flex-direction: column-reverse;
  }
}
</style>
