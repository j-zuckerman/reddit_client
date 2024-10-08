<script setup lang="ts">
import AddSubreddit from "@/components/AddSubreddit.vue";
import Subreddit from "@/components/Subreddit.vue";
</script>

<template>
  <div class="container">
    <Subreddit />
    <AddSubreddit />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}
</style>
