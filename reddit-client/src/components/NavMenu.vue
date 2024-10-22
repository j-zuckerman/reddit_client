<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Features",
    icon: "pi pi-star",
  },
]);
</script>

<template>
  <div class="card">
    <Menubar :model="items" />
  </div>
</template>

<style scoped></style>
