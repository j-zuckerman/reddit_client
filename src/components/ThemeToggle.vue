<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const checked = ref(false);
const updateTheme = (isDark: boolean) => {
  const newTheme = isDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};
watch(checked, (newValue) => {
  updateTheme(newValue);
});
const toggleTheme = () => {
  checked.value = !checked.value;
};
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    checked.value = savedTheme === "dark";
    updateTheme(checked.value);
  }
});
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="checked" @click="toggleTheme" />
    <span class="slider round">
      <span v-if="checked" class="icon dark">
        <v-icon name="fa-regular-moon" />
      </span>
      <span v-else class="icon light">
        <v-icon name="fa-sun" />
      </span>
    </span>
  </label>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgray;
  transition: 0.4s;
  border-radius: 34px;
}

.icon {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  font-size: 16px;
  pointer-events: none;
}

input:checked + .slider {
  background-color: darkgray;
}

input:checked + .slider > .icon {
  transform: translateX(26px);
  background-color: black;
}

.icon.dark {
  color: white;
}
.icon.light {
  color: black;
}
</style>
