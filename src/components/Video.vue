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
  import { onMounted, ref } from 'vue';
  import Button from './Button.vue';
  import Input from './Input.vue';

  const videoUrl = ref('https://www.youtube-nocookie.com/embed/jfKfPfyJRdk');// default video URL
  const newVideoUrl= ref('');

  onMounted(()=> {
    if(localStorage.getItem('videoUrl')) videoUrl.value = localStorage.getItem('videoUrl'); 
  });
  
  function getVideoId() {
    const urlParams = new URLSearchParams(new URL(newVideoUrl.value).search);
    return urlParams.get('v');
  };
  
  function updateVideo() {
    try {
        const videoId = getVideoId();
        videoUrl.value = `https://www.youtube-nocookie.com/embed/${videoId}`
        localStorage.setItem('videoUrl', videoUrl.value);
    } catch (error) {
        alert("Url inválida!");
    }
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

    iframe {
        border-radius: 4px;
    }
</style>
  