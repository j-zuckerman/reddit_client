<script setup lang="ts">
import { ref } from "vue";
import { fetchData } from "@/composables/fetch";
import Modal from "./Modal.vue";

const showModal = ref(false);

const subredditName = ref("");
let isModalOpen = ref(false);

const submitSubreddit = () => {
  fetchData(subredditName.value);
  subredditName.value = "";
  showModal.value = false;
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
              <label for="name">Subreddit Name: </label>
              <input type="text" id="name" v-model="subredditName" />
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <button @click="submitSubreddit" class="submit-btn">Submit</button>
        <button @click="showModal = false" class="close-btn">&times;</button>
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
  background-color: var(--accent-color-hov);
}

.plus-sign {
  font-weight: bold;
}

.submit-btn {
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: var(--accent-color-hov);
  transform: translateY(-2px);
}

.submit-btn:active {
  background-color: var(--accent-color-hov);
  transform: translateY(0);
}

.submit-btn:focus {
  outline: none;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.close-btn:hover {
  color: red;
}

.close-btn:focus {
  outline: none;
  color: red;
}

@media (max-width: 480px) {
  .circular-button {
    height: 32px;
    width: 32px;
  }
}
</style>
