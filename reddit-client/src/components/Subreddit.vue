<script setup lang="ts">
import Post from "./Post.vue";
import Loading from "./Loading.vue";
import { store } from "@/store";
import { onMounted } from "vue";
import { fetchData } from "@/composables/fetch";
import { ref } from "vue";

const props = defineProps<{ name: string }>();
const menu = ref();
const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Refresh",
        icon: "pi pi-refresh",
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
      },
    ],
  },
]);

const toggle = (event: any) => {
  console.log(menu);
  menu.value[0].toggle(event);
};

onMounted(() => {
  fetchData(props.name);
});
</script>

<template>
  <Loading v-if="store.loading" />
  <div v-else v-for="subreddit in store.data" class="rectangle">
    <h2 class="subreddit-title">r/{{ subreddit.name }}</h2>
    <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
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
