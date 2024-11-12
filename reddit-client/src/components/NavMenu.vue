<script setup lang="ts">
import { ref, watch } from "vue";
import { store } from "@/store";
import { fetchData } from "@/composables/fetch";
import AddSubreddit from "./AddSubreddit.vue";
import ThemeToggle from "./ThemeToggle.vue";

const selected = ref("Best");
const options = ref(["Best", "Hot", "New", "Top", "Rising"]);

const handleSelectChange = async () => {
  console.log(selected.value);
  for (let i = 0; i < store.data.length; i++) {
    await fetchData(store.data[i].name, selected.value.toLowerCase());
  }
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="card flex justify-center">
        <div class="select-container">
          <select v-model="selected" @change="handleSelectChange" class="styled-select">
            <option v-for="option in options" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <AddSubreddit />
    </div>
    <div class="navbar-right">
      <div>
        <ThemeToggle />
      </div>

      <a href="#"><v-icon name="fa-reddit-square" /></a>
      <a href="#"><v-icon name="fa-github-square" /></a>
      <a href="#"><v-icon name="fa-cog" /></a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 90%;
  margin: auto;
}

.navbar a {
  color: var(--text-color);
  text-decoration: none;
  padding: 10px;
  border-bottom: 2px solid transparent;
}

.navbar a:hover {
  border-bottom: 2px solid white;
}

.navbar-left,
.navbar-right {
  display: flex;
  gap: 10px;
  align-items: center;
}

.select-container {
  position: relative;
  display: inline-block;
  width: 150px;
}

.styled-select {
  appearance: none;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}
.select-container::after {
  content: "▼";
  position: absolute;
  color: black;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.styled-select:hover {
  background-color: #e0e0e0;
}
.styled-select:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
