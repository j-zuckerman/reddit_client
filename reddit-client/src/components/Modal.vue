<script setup lang="ts">
import { ref } from "vue";
import { fetchData } from "@/composables/fetch";

const subredditName = ref("");
const emit = defineEmits(["close"]);

function buttonClick() {
  emit("close");
}
</script>

<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>

      <p>Enter the name of subreddit</p>
      <input type="text" v-model="subredditName" />
      <button @click="fetchData(subredditName)">Add Subreddit</button>

      <p>{{ subredditName }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  color: black;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
