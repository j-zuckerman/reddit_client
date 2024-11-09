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
    <button @click="showModal = true">Open Modal</button>
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

<style scoped></style>
