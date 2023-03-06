<template>
    <div class="schedule-list-container">
        <div class="input-container">
            <Input type="text" v-model="newSchedule" placeholder="Adicionar nova tarefa..." />
            <Button title="Salvar" @click-function="saveSchedule" />    
        </div>
        <div class="list-area">
            <ScheduleItem
            v-for="(schedule, index) in scheduleList"
            :key="schedule.id"
            :title="schedule.schedule"
            @remove="scheduleList.splice(index, 1)"
            />
        </div>
    </div>
</template>

<script setup>
    import Input from './Input.vue';
    import Button from './Button.vue';
    import ScheduleItem from './ScheduleItem.vue';
    import { ref } from 'vue';

    const newSchedule = ref('');
    const scheduleList = ref([]);
    
    let id = 1;

    const saveSchedule = () => {
        scheduleList.value.push({
            id: id++,
            schedule: newSchedule.value});
        
        newSchedule.value = '';
    };
</script>

<style scoped>
    .schedule-list-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .input-container {
        display: flex;
        justify-content: center;
        gap: 5px;
    }
    .list-area {
        padding: 16px;
        width: 100vh;
        min-height: 340px;
    }
</style>

