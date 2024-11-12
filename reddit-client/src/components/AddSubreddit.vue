<script setup lang="ts">
import { ref } from "vue";
import { fetchData } from "@/composables/fetch";
import Modal from "./Modal.vue";

const showModal = ref(false);

const subredditName = ref("");
let isModalOpen = ref(false);

const submitSubreddit = () => {
  isModalOpen.value = false;
  fetchData(subredditName.value);
};
</script>

<template>
  <div>
    <button class="circular-button" @click="showModal = true">
      <span class="plus-sign">+</span>
    </button>

    <Modal :isOpen="showModal" @close="showModal = false">
      <template #header>
        <h2>Add Subreddit</h2>
      </template>
      <template #body>
        <div>
          <form @submit.prevent="submitSubreddit">
            <div>
              <label for="name">Subreddit Name:</label>
              <input type="text" id="name" v-model="subredditName" />
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <button @click="showModal = false">Close</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.circular-button {
  width: 38px;
  height: 38px;
  background-color: var(--accent-color);
  border: none;
  border-radius: 50%;
  color: var(--text-color);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.circular-button:hover {
  background-color: var(--accent-color);
}

.plus-sign {
  font-weight: bold;
}
</style>
