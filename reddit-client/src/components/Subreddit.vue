<script setup lang="ts">
import Post from "./Post.vue";
import Loading from "./Loading.vue";
import { store } from "@/store";
import { onMounted } from "vue";
import { fetchData } from "@/composables/fetch";
import { ref } from "vue";
import Dropdown from "./Dropdown.vue";

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

const selectedSubreddit = ref(props.name);

const dropdownOptions = ["Refresh", "Delete"];
const toggle = (event: any) => {
  console.log(menu);
  menu.value[0].toggle(event);
};

const changeSubreddit = (name: string) => {
  selectedSubreddit.value = name;
};

onMounted(() => {
  fetchData(props.name);
});
</script>

<template>
  <Loading v-if="store.loading" />
  <div v-else>
    <nav class="breadcrumb">
      <ul>
        <li v-for="(subreddit, index) in store.data" :key="subreddit.name">
          <a @click.prevent="changeSubreddit(subreddit.name)" :class="{ active: subreddit.name === selectedSubreddit }"> r/{{ subreddit.name }} </a>
          <span v-if="index < store.data.length - 1">/</span>
        </li>
      </ul>

      <div>
        <Dropdown :options="dropdownOptions" />
      </div>
      <v-icon name="fa-ellipsis-h" @click="toggle" />

      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </nav>

    <div v-if="store.data && store.data.length" v-for="subreddit in store.data" :key="subreddit.name">
      <div v-if="subreddit.name === selectedSubreddit" v-for="post in subreddit.posts" :key="post.id">
        <Post :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  padding: 10px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.breadcrumb ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb li a {
  text-decoration: none;
  color: #007bff;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.breadcrumb li a.active {
  background-color: #007bff;
  color: white;
}

.breadcrumb li a:hover {
  background-color: #e2e6ea;
}

.breadcrumb li span {
  margin: 0 5px;
  color: #6c757d;
}
.subreddit-list {
}
.subreddit-title {
  text-align: center;
}
</style>
