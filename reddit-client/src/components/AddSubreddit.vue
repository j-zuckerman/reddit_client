<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <p>Add Subreddit</p>

  <button @click="openModal" class="circular-button">+</button>
  <Modal v-if="isModalOpen" @close="closeModal" />
</template>

<style scoped>
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
