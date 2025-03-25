<!--
  - Composto pela área de input de dados que são inseridos em um array
  - e os dados deste são renderizados em uma lista logo abaixo e de
  - forma dinâmica.
 -->
<template>
  <div class="schedule-list-container">
    <div class="input-container">
      <Input
        type="text"
        v-model="newSchedule"
        @on-press-enter="saveSchedule"
        placeholder="Add new task..."
      />
      <Button title="Save" @click-function="saveSchedule" />
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
  if (newSchedule.value == '') return
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
  gap: 1rem;
  padding-top: 1.5rem;
  width: 100%;
}

.input-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0 1rem;
}

.list-area {
  padding: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

@media (max-width: 850px) {
  .schedule-list-container {
    border-bottom: 1px groove #f8f8f8;
    padding-bottom: 1rem;
  }

  .input-container {
    padding: 0 0.5rem;
  }

  .list-area {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .schedule-list-container {
    padding-top: 1rem;
  }

  .input-container {
    flex-direction: column;
    align-items: stretch;
  }

  .list-area {
    padding: 0.25rem;
  }
}
</style>
