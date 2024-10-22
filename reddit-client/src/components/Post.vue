<script setup lang="ts">
import type Post from "@/types/posts";

//const props = defineProps(["post"]);
const props = defineProps<{ post: Post }>();
</script>

<template>
  <div class="container" v-if="props.post['post_type'] == 'TYPE_VIDEO'">
    <h2 class="title">{{ props.post.post_type }}</h2>
    <h2 class="title">{{ props.post.title }}</h2>
    <video controls>
      <source :src="props.post.video_url" type="video/mp4" />
    </video>
    <p>{{ props.post.video_url }}</p>
    <div class="footer">
      <p><i class="pi pi-arrow-up"></i>{{ props.post.upvotes }}</p>
      <p>{{ props.post.author }}</p>
      <a :href="props.post.url" />
    </div>
  </div>

  <div class="container" v-else-if="props.post['post_type'] == 'TYPE_GALLERY'">
    <h2 class="title">{{ props.post.post_type }}</h2>
    <h2 class="title">{{ props.post.title }}</h2>

    <ImageGallery :value="props.post.gallery_image_ids" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false" :showIndicators="true">
      <template #item="slotProps">
        <img :src="slotProps.item" :alt="slotProps.item" style="width: 100%; display: block" />
      </template>
    </ImageGallery>
    <div class="footer">
      <p><i class="pi pi-arrow-up"></i>{{ props.post.upvotes }}</p>
      <p>{{ props.post.author }}</p>
      <a :href="props.post.url" />
    </div>
  </div>

  <div class="container" v-else-if="props.post['post_type'] == 'TYPE_IMAGE'">
    <h2 class="title">{{ props.post.post_type }}</h2>
    <h2 class="title">{{ props.post.title }}</h2>
    <Image class="image" :src="props.post.thumbnail_url" width="400px" />
    <div class="footer">
      <p><i class="pi pi-arrow-up"></i>{{ props.post.upvotes }}</p>
      <p>{{ props.post.author }}</p>
      <a :href="props.post.url" />
    </div>
  </div>

  <div class="container" v-else>
    <h2 class="title">{{ props.post.post_type }}</h2>
    <h2 class="title">{{ props.post.title }}</h2>
    <p class="text">{{ props.post.text }}</p>
    <div class="footer">
      <p><i class="pi pi-arrow-up"></i>{{ props.post.upvotes }}</p>
      <p>{{ props.post.author }}</p>
      <a :href="props.post.url" />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
}

.image {
  margin: auto;
}

.video {
}

.text {
  font-size: 0.9rem;
  font-weight: 400;
}

.footer {
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
  font-weight: 400;
}

.upvotes {
}

.link {
}

.username {
}
</style>
