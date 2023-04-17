<!--
    Botão de retorno para o topo da pagina, caso a tela seja menor do que 850px.
-->
<template>
  <a class="up-arrow"
   v-show="showTopBtn" @click="scrollToTop">
    <img src="../components/icons/up-arrow.png" width="40" height="40" alt="up-arrow"/>
  </a>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

  const showTopBtn = ref(false)

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    showTopBtn.value = window.scrollY > 180
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } 

</script>

<style scoped>
.up-arrow {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #d14f04;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

</style>
