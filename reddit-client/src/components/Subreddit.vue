<script setup lang="ts">
import Post from "./Post.vue";
import Loading from "./Loading.vue";
import { store } from "@/store";
</script>

<template>
  <Loading v-if="store.loading === false" />
  <div v-if="store.loading">
    <h1>Subreddit List</h1>
    <ul>
      <li v-for="subreddit in store.data">
        <h2>{{ subreddit.name }}</h2>
        <Post v-for="post in subreddit.posts" :key="post.id" :post="post" />
      </li>
    </ul>
  </div>
</template>
