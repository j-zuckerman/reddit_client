<script setup lang="ts">
import { ref, watch } from "vue";
import { store } from "@/store";
import { fetchData } from "@/composables/fetch";
import AddSubreddit from "./AddSubreddit.vue";

const checked = ref(false);

const selectedOption = ref({ name: "Best" });
const sortByOptions = ref([{ name: "Best" }, { name: "Hot" }, { name: "New" }, { name: "Top" }, { name: "Rising" }]);

watch(selectedOption, async (newOption, oldOption) => {
  for (let i = 0; i < store.data.length; i++) {
    await fetchData(store.data[i].name, newOption.name.toLowerCase());
  }
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="card flex justify-center">
        <Select v-model="selectedOption" :options="sortByOptions" optionLabel="name" class="w-full md:w-56" />
      </div>
      <AddSubreddit />
    </div>
    <div class="navbar-right">
      <a href="#"><i class="pi pi-reddit" style="font-size: 1.2rem"></i></a>
      <a href="#"><i class="pi pi-github"></i></a>
      <a href="#"><i class="pi pi-cog"></i></a>
      <ToggleSwitch v-model="checked">
        <template #handle="{ checked }">
          <i :class="['!text-xs pi', { 'pi-sun': checked, 'pi-moon': !checked }]" />
        </template>
      </ToggleSwitch>
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
