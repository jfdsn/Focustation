<template>
    <div class="timer-container">
        <h1>{{ timerTitle }}</h1> 
        <p>{{ formattedTime }}</p>
        <Button v-if="!isTimerRunning && !isRestRunning" title="Iniciar" @click-function="startTimer" />
        <Button v-if="isTimerRunning || isRestRunning" title="Resetar" @click-function="resetTimer" />
    </div>
    
    <audio ref="myAudio">
        <source src="./audio/magic-notification-ring.wav" type="audio/mpeg">
    </audio>
</template>
  
<script setup>
    import { ref, watch, onMounted } from 'vue';
    import Button from './Button.vue';
  
    const pomodoroDuration = 45 * 60; // 45 minutes in seconds
    const restDuration = 15 * 60; // 15 minutes in seconds
    
    const timeElapsed = ref(0);
    const isTimerRunning = ref(false);
    const isRestRunning = ref(false);
    
    const timerTitle = ref('Work');
    const formattedTime = ref('00:00');
    const myAudio = ref(null);
    
    onMounted(() => {
      myAudio.value.load();
    });
 
    const startTimer = () => {
        timerTitle.value = 'Work';
        isTimerRunning.value = true;
    };

    const resetTimer = () => {
        timerTitle.value = 'Work';
        isTimerRunning.value = false;
        isRestRunning.value = false;
        timeElapsed.value = 0;
    };

    const startRest = () => {
        timerTitle.value = 'Rest';
        isRestRunning.value = true;
    };

    watch(timeElapsed, (newValue) => {
        const minutes = Math.floor(newValue / 60);
        const seconds = Math.floor(newValue % 60);
        formattedTime.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });

    const playAudio = () => {
        myAudio.value.play();
    };

    setInterval(() => {
        if (isTimerRunning.value) {
            timeElapsed.value += 1;

            if (timeElapsed.value >= pomodoroDuration) {
                isTimerRunning.value = false;
                timeElapsed.value = 0;

                playAudio();

                if (!isRestRunning.value) {
                    startRest();
                };
            };
        };

        if (isRestRunning.value) {
            timeElapsed.value += 1;

            if (timeElapsed.value >= restDuration) {
                isRestRunning.value = false;
                timeElapsed.value = 0;

                playAudio();
            };
        };
    }, 1000);

</script>

<style scoped>
    h1 {
        font-weight: bold;
    }

    p {
        font-size: 24px;
    }

    .timer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
  