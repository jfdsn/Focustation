<template>
    <input />
</template>

<style scoped>
    input[type="text"],
    input[type="email"],
    input[type="password"] {
        padding: 12px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
        background-color: #ecf0f1;
        color: #333;
        box-shadow: none;
        transition: box-shadow 0.3s ease-in-out;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="password"]:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
</style>