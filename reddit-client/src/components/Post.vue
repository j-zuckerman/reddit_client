<script setup lang="ts">
import type Post from "@/types/posts";

//const props = defineProps(["post"]);
const props = defineProps<{ post: Post }>();
</script>

<template>
  <a :href="props.post.url" target="_blank" class="post-link">
    <div class="post-container">
      <div>
        <template v-if="props.post['post_type'] == 'TYPE_VIDEO'">
          <video controls class="post-thumbnail">
            <source :src="props.post.video_url" type="video/mp4" />
          </video>
        </template>
        <template v-else-if="props.post['post_type'] == 'TYPE_GALLERY'">
          <ImageGallery :value="props.post.gallery_image_ids" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false" :showIndicators="true">
            <template #item="slotProps">
              <img :src="slotProps.item" :alt="slotProps.item" style="width: 100%; display: block" />
            </template>
          </ImageGallery>
        </template>
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
          <video controls>
            <source :src="props.post.video_url" type="video/mp4" />
          </video>
        </template>
      </div>
      <div class="post-content">
        <div class="post-header">
          <p>u/{{ props.post.author }}</p>
        </div>
        <div class="post-title">
          <h2 class="title">{{ props.post.title }}</h2>
        </div>
        <div class="post-footer">
          <p class="post-upvotes"><i class="pi pi-arrow-up"></i>{{ props.post.upvotes }}</p>
          <p class="post-comments">{{ props.post.num_comments }} comments</p>
          <h2 class="type">{{ props.post.post_type }}</h2>
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
  padding: 8px 4px;
  margin: 10px 0;
  font-family: Arial, sans-serif;
  font-size: 12px;
}

.post-container:hover {
  background-color: darkgrey;
}

.post-thumbnail {
  width: 110px;
  height: 90px;
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
}

.post-body {
  margin: 10px 0;
  line-height: 1.4;
}

.post-footer {
  display: flex;
  align-items: center;
}

.post-footer > * {
  margin: 0 5px;
}

.post-author,
.post-upvotes,
.post-comments {
  color: #555;
}

.post-upvotes,
.post-comments {
  background-color: #ff4500;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
}
</style>
