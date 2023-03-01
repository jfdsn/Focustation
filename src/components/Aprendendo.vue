<template>
    <button @click="decrement">-</button>
    {{ count }}
    <button @click="increment">+</button>
    <p>{{ testeComputed }}</p>
    <h1 v-show="testeBind.active" :class="testeBind">Oi, passou de 10!</h1>
    <li v-for="(value, key, index) in myObject" :key="index">
        {{ index }} - {{ key }} : {{ value }}
    </li>

</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const count = ref(0);
const myObject = {
        nome: "Juca",
        sobrenome: "Semnome",
        idade: 18,
        sexo: "M"
};

const increment = () => {
    count.value++
}

function decrement() {
    count.value--
}

const testeComputed = computed(() => {
    return count.value > 3 ? true : false
});

const testeBind = computed(() => ({
    active: count.value > 10 ? true : false
}));

</script>
    
<style scoped>
    .active {
        color: rgb(204, 37, 15);
    }
</style>

