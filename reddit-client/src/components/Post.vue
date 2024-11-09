<script setup lang="ts">
import type Post from "@/types/posts";

//const props = defineProps(["post"]);
const props = defineProps<{ post: Post }>();
</script>

<template>
  <a :href="props.post.url" target="_blank" class="post-link">
    <div class="post-container">
      <template v-if="props.post['post_type'] == 'TYPE_VIDEO'">
        <video controls class="post-thumbnail">
          <source :src="props.post.video_url" type="video/mp4" />
        </video>
      </template>
      <template v-else-if="props.post['post_type'] == 'TYPE_GALLERY'"> </template>
      <template v-else-if="props.post['post_type'] == 'TYPE_LINK'">
        <div class="thumbnail-container">
          <img class="post-thumbnail" :src="props.post.image_url" />
          <a :href="props.post.external_link" class="post-external-link">article link</a>
        </div>
      </template>
      <template v-else-if="props.post['post_type'] == 'TYPE_IMAGE'">
        <img class="post-thumbnail" :src="props.post.image_url" />
      </template>
      <template v-else>
        <img class="post-thumbnail" :src="props.post.image_url" />
      </template>

      <div class="post-content">
        <div class="post-header">
          <p>u/{{ props.post.author }}</p>
        </div>
        <div class="post-title">
          <h2 class="title">{{ props.post.title }}</h2>
        </div>
        <div class="post-footer">
          <p class="post-upvotes"><i class="pi pi-arrow-up"></i>{{ props.post.upvotes }}</p>
          <span v-if="props.post['post_type'] == 'TYPE_VIDEO'" class="post-type"> <v-icon name="fa-video" />Video</span>
          <span v-else-if="props.post['post_type'] == 'TYPE_GALLERY'" class="post-type"><v-icon name="fa-images" /> Gallery</span>
          <span v-else-if="props.post['post_type'] == 'TYPE_LINK'" class="post-type"> <v-icon name="fa-link" />Link</span>
          <span v-else-if="props.post['post_type'] == 'TYPE_IMAGE'" class="post-type"><v-icon name="fa-image" /> Image</span>
          <span v-else class="post-type"> Text </span>
          <p class="post-comments">{{ props.post.num_comments }} comments</p>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-container {
  display: flex;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 4px 2px;
  margin: 10px 0;
  font-family: Arial, sans-serif;
  font-size: 12px;
}

.post-container:hover {
  background-color: darkgrey;
}

.post-thumbnail {
  width: 140px;
  height: 120px;
  margin-right: 10px;
  object-fit: cover;
  border-radius: 5px;
}

.thumbnail-container {
  position: relative;
}

.post-external-link {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  text-decoration: none;
  border-radius: 0 0 0 5px;
}

.post-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-details {
  display: flex;
  flex-direction: column;
}

.post-title {
  font-weight: bold;
  color: white;
}

.post-footer {
  display: flex;
  align-items: center;
}

.post-footer > * {
  margin: 0 5px;
}

.post-author {
  color: #555;
}

.post-upvotes,
.post-type {
  background-color: gray;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
}
.post-comments {
  color: white;
}
</style>
