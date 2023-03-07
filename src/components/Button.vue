<template>
    <button @click="$emit('click-function')">{{ title }}</button>
</template>

<script setup>
    defineProps(['title']);
    defineEmits(['click-function']);
</script>

<style scoped>
    button {
        padding: 4px 8px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        border: none;
        border-radius: 4px;
        background-color: #d14f04;
        color: #f8f8f8;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }

    button:hover {
        background-color: #963903;
    }
</style>