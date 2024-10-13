<script setup lang="ts">
import Post from "./Post.vue";
import Loading from "./Loading.vue";
import { store } from "@/store";
import { onMounted } from "vue";
import { fetchData } from "@/composables/fetch";

const defaultSubreddit = "all";

onMounted(() => {
  fetchData(defaultSubreddit);
});
</script>

<template>
  <Loading v-if="store.loading" />
  <div v-else v-for="subreddit in store.data" class="rectangle">
    <h2>r/{{ subreddit.name }}</h2>
    <Post v-for="post in subreddit.posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped>
.rectangle {
  flex: 1;
  max-width: 500px;
  border: 1px solid gray;
}
</style>
