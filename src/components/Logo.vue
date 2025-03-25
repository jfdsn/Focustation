<!--
    Componente Logo. Enquanto o projeto não escalar, retorna apenas o logo do site.
-->
<template>
  <div class="logo-container">
    <img 
      src="@/components/imgs/page-logo.png"
      alt="Focus App Logo"
      class="logo-image"
      loading="eager"
      @error="handleImageError"
    />
  </div>
</template>

<script setup>
const handleImageError = (e) => {
  console.error('Failed to load logo image')
  e.target.style.display = 'none'
}
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.logo-image {
  max-width: 200px;
  width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 480px) {
  .logo-container {
    padding: 0.5rem;
  }

  .logo-image {
    max-width: 150px;
  }
}
</style>
