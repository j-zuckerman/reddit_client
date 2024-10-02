<script setup lang="ts"></script>

<template>
  <button class="circular-button">+</button>
  <p>Add Subreddit</p>
</template>

<style>
.circular-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.circular-button:hover {
  background-color: #0056b3;
}
</style>
