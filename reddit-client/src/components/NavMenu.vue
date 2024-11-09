<script setup lang="ts">
import { ref, watch } from "vue";
import { store } from "@/store";
import { fetchData } from "@/composables/fetch";
import AddSubreddit from "./AddSubreddit.vue";

const checked = ref(false);

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
        <select v-model="selected" @change="handleSelectChange">
          <option v-for="option in options" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <AddSubreddit />
    </div>
    <div class="navbar-right">
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
  background-color: #333;
  width: 100%;
}

.navbar a {
  color: white;
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
</style>
