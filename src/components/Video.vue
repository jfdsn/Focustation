<template>
    <div class="container">
        <div class="inputBox">
            <Input type="text" v-model="newVideoUrl" placeholder="YouTube video URL" />
            <Button title="Trocar" @click-function="updateVideo" />
        </div> 
        <iframe :src="videoUrl" width="300" height="200" frameborder="0"></iframe>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import Button from './Button.vue';
  import Input from './Input.vue';

  const videoUrl = ref('https://www.youtube.com/embed/jfKfPfyJRdk');// default video URL
  const newVideoUrl= ref('');

  function getVideoId() {
      const urlParams = new URLSearchParams(new URL(newVideoUrl.value).search);
      return urlParams.get('v');
  };
  
  function updateVideo() {
      const videoId = getVideoId();
      videoUrl.value = `https://www.youtube.com/embed/${videoId}`
  };
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 300px;
    }

    .inputBox{
        display: flex;
        justify-content: space-around;
        margin-bottom: 6px;
        max-width: 300px;
        gap: 6px;
    }
</style>
  