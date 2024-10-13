<script setup lang="ts">
import { ref } from "vue";
import { fetchData } from "@/composables/fetch";

const subredditName = ref("");
let isModalOpen = ref(false);

const submitSubreddit = () => {
  isModalOpen.value = false;
  fetchData(subredditName.value);
};
</script>

<template>
  <div class="rectangle">
    <Button label="+" @click="isModalOpen = true" />
  </div>

  <Dialog v-model:visible="isModalOpen" modal header="Enter Subreddit Name" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Subreddit</label>
      <InputText type="text" v-model="subredditName" class="flex-auto" autocomplete="off" variant="filled" />
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="isModalOpen = false"></Button>
      <Button type="button" label="Add Subreddit" @click="submitSubreddit"></Button>
    </div>
  </Dialog>
</template>

<style scoped>
.rectangle {
  flex: 1;
  background-color: lightcoral;
  border: 1px solid #000;
}
</style>
