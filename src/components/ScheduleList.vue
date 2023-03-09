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
import Input from './Input.vue'
import Button from './Button.vue'
import ScheduleItem from './ScheduleItem.vue'
import { onMounted, ref, watch } from 'vue'

const newSchedule = ref('')
const scheduleList = ref([])

let id = 1

onMounted(() => {
  if (localStorage.getItem('list')) {
    scheduleList.value = JSON.parse(localStorage.getItem('list'))
  }
  if (localStorage.getItem('id')) id = localStorage.getItem('id')
})

const saveSchedule = () => {
  scheduleList.value.push({
    id: id++,
    schedule: newSchedule.value
  })

  newSchedule.value = ''
}

watch(
  scheduleList,
  (newValue) => {
    localStorage.setItem('list', JSON.stringify(newValue))
    localStorage.setItem('id', id)
  },
  { deep: true }
)
</script>

<style scoped>
.schedule-list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 30px;
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
