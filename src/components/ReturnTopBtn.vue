<!--
    Botão de retorno para o topo da pagina, caso a tela seja menor do que 850px.
-->
<template>
  <a class="up-arrow" href="#top"
    ><img src="../components/icons/up-arrow.png" width="40" height="40" alt="up-arrow"
  /></a>
</template>

<style scoped>
.up-arrow {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #d14f04;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  visibility: hidden;
}

@media (max-width: 850px) {
  .up-arrow {
    visibility: visible;
  }
}
</style>
