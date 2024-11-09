<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array as () => string[],
    required: true,
  },
});

const selected = ref<string | null>(null);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: string) => {
  selected.value = option;
  isOpen.value = false;
};
</script>

<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selected || "Select an option" }}
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="option in options" :key="option" @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
  z-index: 1000;
}

.dropdown-menu li {
  list-style: none;
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
