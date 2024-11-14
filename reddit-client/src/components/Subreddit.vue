<script setup lang="ts">
import Post from "./Post.vue";
import Loading from "./Loading.vue";
import { store, deleteSubreddit } from "@/store";
import { onMounted, watch } from "vue";
import { fetchData } from "@/composables/fetch";
import { ref } from "vue";

const props = defineProps<{ name: string }>();
const menu = ref();

const selectedSubreddits = ref<string[]>([props.name]);
const allSubreddits = ref<string[]>([]);

const toggle = (event: any) => {
  console.log(menu);
  menu.value[0].toggle(event);
};

const changeSubreddit = (name: string) => {
  if (selectedSubreddits.value.includes(name)) {
    selectedSubreddits.value = selectedSubreddits.value.filter((sub) => sub !== name);
  } else {
    selectedSubreddits.value.push(name);
  }
};

const removeSubreddit = (name: string, id: string) => {
  selectedSubreddits.value = selectedSubreddits.value.filter((sub) => sub !== name);
  deleteSubreddit(id);
};

watch(
  selectedSubreddits,
  (newSubreddits) => {
    localStorage.setItem("selectedSubreddits", JSON.stringify(newSubreddits));
  },
  { deep: true }
);

onMounted(async () => {
  const savedSubreddits = localStorage.getItem("selectedSubreddits");

  if (savedSubreddits) {
    selectedSubreddits.value = JSON.parse(savedSubreddits);

    for (let i = 0; i < selectedSubreddits.value.length; i++) {
      await fetchData(selectedSubreddits.value[i].toLowerCase());
    }
  } else fetchData(props.name);
});
</script>

<template>
  <Loading v-if="store.loading" />
  <div v-else>
    <nav class="breadcrumb">
      <ul>
        <li v-for="(subreddit, index) in store.data" :key="subreddit.name" class="breadcrumb-item">
          <a @click.prevent="changeSubreddit(subreddit.name)" :class="{ active: selectedSubreddits.includes(subreddit.name) }"> r/{{ subreddit.name }} </a>
          <span v-if="selectedSubreddits.includes(subreddit.name)" class="delete-btn" @click.prevent="removeSubreddit(subreddit.name, subreddit.id)">×</span>
        </li>
      </ul>
    </nav>
    <div></div>
    <div v-if="store.data && store.data.length">
      <div v-for="subreddit in store.data" :key="subreddit.name">
        <div v-if="selectedSubreddits.includes(subreddit.name)" v-for="post in subreddit.posts" :key="post.id"><Post :post="post" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  padding: 10px;
}

.breadcrumb ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  position: relative;
  display: inline-block;
  padding-right: 20px;
}
.breadcrumb-item .delete-btn {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  display: none;
  color: red;
  font-size: 18px;
}

.breadcrumb-item:hover .delete-btn {
  display: inline;
}

.breadcrumb-item a {
  text-decoration: none;
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.breadcrumb-item a.active {
  background-color: var(--gray-1);
}

.breadcrumb-item a:hover {
  background-color: var(--gray-2);
}

.breadcrumb-item span {
  margin: 0 5px;
  color: #6c757d;
}

.subreddit-title {
  text-align: center;
}

@media (max-width: 768px) {
}

@media (max-width: 480px) {
}
</style>
