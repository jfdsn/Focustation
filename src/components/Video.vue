<template>
    <div class="container">
        <div class="inputBox">
            <Input type="text" v-model="newVideoUrl" placeholder="YouTube video URL" />
            <Button title="Trocar" @click-function="updateVideo" />
        </div> 
        <iframe :src="embedUrl" width="300" height="200" frameborder="0"></iframe>
    </div>
</template>
  
<script setup>

  import { ref, computed } from 'vue';
  import Button from './Button.vue';
  import Input from './Input.vue';


  const videoUrl = ref('https://www.youtube.com/watch?v=jfKfPfyJRdk');// default video URL
  const newVideoUrl= ref('');


  const embedUrl = computed(() => {
      const videoId = getVideoId();
      return `https://www.youtube.com/embed/${videoId}`;
  });


  function getVideoId() {
      const urlParams = new URLSearchParams(new URL(videoUrl.value).search);
      return urlParams.get('v');
  };
  
  function updateVideo() {
      videoUrl.value = newVideoUrl.value;
      const videoId = getVideoId();
      $el.querySelector('iframe').setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
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
  