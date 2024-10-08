<script setup lang="ts">
import Post from "./Post.vue";
import Loading from "./Loading.vue";
import { store } from "@/store";
</script>

<template>
  <Loading v-if="store.loading" />
  <div v-else v-for="subreddit in store.data" class="rectangle">
    <h2>{{ subreddit.name }}</h2>
    <Post v-for="post in subreddit.posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped>
.rectangle {
  flex: 1;
  background-color: lightcoral;
  border: 1px solid #000;
}
</style>
