<script setup lang="ts">
import { ref, onMounted } from "vue";
import type Post from "@/types/posts";
import ImageGallery from "./ImageGallery.vue";

//const props = defineProps(["post"]);
const props = defineProps<{ post: Post }>();
const showExpanded = ref(false);

const toggleExpanded = () => {
  showExpanded.value = !showExpanded.value;
};

const preventLinkNavigation = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
};

onMounted(() => {
  const elementsToStopPropagation = document.querySelectorAll(".post-expand, .gallery-arrow");
  elementsToStopPropagation.forEach((element) => {
    element.addEventListener("click", preventLinkNavigation);
  });
});
</script>

<template>
  <a :href="props.post.url" target="_blank" class="post post-link">
    <div class="post-container">
      <template v-if="props.post['post_type'] == 'TYPE_VIDEO'">
        <video controls class="post-thumbnail">
          <source :src="props.post.video_url" type="video/mp4" />
        </video>
      </template>
      <template v-else-if="props.post['post_type'] == 'TYPE_GALLERY'">
        <div class="thumbnail-container">
          <img class="post-thumbnail" :src="props.post.gallery_image_urls?.[0] ?? ''" />
          <span v-if="!showExpanded" class="post-gallery-size"><v-icon name="fa-images" /> {{ props.post.gallery_image_urls?.length ?? 0 }} </span>
        </div>
      </template>
      <template v-else-if="props.post['post_type'] == 'TYPE_LINK'">
        <div class="thumbnail-container">
          <img class="post-thumbnail" :src="props.post.image_url" />
        </div>
      </template>
      <template v-else-if="props.post['post_type'] == 'TYPE_IMAGE'">
        <img class="post-thumbnail" :src="props.post.image_url" />
      </template>
      <template v-else>
        <div v-if="!showExpanded" class="no-image-thumbnail">
          <v-icon name="fa-image" />
        </div>
      </template>

      <div class="post-content">
        <div class="post-header">
          <p class="post-author">u/{{ props.post.author }}</p>
        </div>
        <div class="post-title">
          <h2 class="title">{{ props.post.title }}</h2>
        </div>

        <div class="post-footer">
          <span class="post-expand" @click="toggleExpanded">
            <v-icon v-if="showExpanded" v-icon name="fa-window-close" />
            <v-icon v-else name="fa-expand" />
          </span>
          <p class="post-upvotes"><v-icon name="fa-arrow-up" />{{ props.post.upvotes }}</p>
          <span v-if="props.post['post_type'] == 'TYPE_VIDEO'" class="post-type"> <v-icon name="fa-video" /> Video</span>
          <span v-else-if="props.post['post_type'] == 'TYPE_GALLERY'" class="post-type"><v-icon name="fa-images" /> Gallery</span>
          <span v-else-if="props.post['post_type'] == 'TYPE_LINK'" class="post-type"> <v-icon name="fa-link" /> Link</span>
          <span v-else-if="props.post['post_type'] == 'TYPE_IMAGE'" class="post-type"><v-icon name="fa-image" /> Image</span>
          <span v-else class="post-type"> Text </span>
          <p class="post-comments">{{ props.post.num_comments }} comments</p>
        </div>

        <div v-if="showExpanded" class="post-expanded">
          <template v-if="props.post['post_type'] == 'TYPE_VIDEO'">
            <video controls class="post-image">
              <source :src="props.post.video_url" type="video/mp4" />
            </video>
          </template>
          <template v-else-if="props.post['post_type'] == 'TYPE_GALLERY'">
            <div class="gallery-container">
              <ImageGallery :images="props.post['gallery_image_urls']" />
            </div>
          </template>
          <template v-else-if="props.post['post_type'] == 'TYPE_LINK'">
            <div class="image-container">
              <img class="post-image" :src="props.post.image_url" />
              <a :href="props.post.external_link" class="post-external-link" target="_blank">article link</a>
            </div>
          </template>
          <template v-else-if="props.post['post_type'] == 'TYPE_IMAGE'">
            <img class="post-image" :src="props.post.image_url" />
          </template>
          <template v-else>
            <p class="post-expanded-text">{{ props.post.text }}</p>
          </template>
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
  border-top: 1px solid var(--underline-color);
  border-bottom: 1px solid var(--underline-color);
  padding: 4px 2px;
  margin: 10px 0;
  font-family: Arial, sans-serif;
  font-size: 12px;
}

.post-container:hover {
  background-color: var(--gray-5);
}

.post-thumbnail {
  width: 140px;
  height: 120px;
  margin-right: 10px;
  object-fit: cover;
  border-radius: 5px;
}

.no-image-thumbnail {
  width: 140px;
  height: 120px;
  margin-right: 10px;
  object-fit: cover;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--text-color);
}

.image-container,
.thumbnail-container {
  position: relative;
}

.post-external-link,
.post-gallery-size {
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
  color: var(--text-color);
}

.post-footer {
  display: flex;
  align-items: center;
}

.post-footer > * {
  margin: 0 5px;
}

.post-author {
  color: var(--gray-1);
}

.post-expanded .post-image {
  width: auto;
  height: auto;
  max-width: 75%;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
}

.post-expand {
  padding: 5px 10px;
  border-radius: 20px;
}

.post-expand:hover {
  background-color: var(--gray-4);
  color: var(--text-color);
}

.post-upvotes,
.post-type {
  background-color: var(--gray-4);
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 20px;
}

.post-comments {
  color: var(--text-color);
}

.post-expanded-text {
  max-width: 85%;
  padding: 1rem;
  font-size: 14px;
}

@media (max-width: 768px) {
}

@media (max-width: 480px) {
  .post-container {
    flex-direction: column;
    align-items: center;
  }

  .post-thumbnail {
    width: 250px;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
    padding-top: 5px;
  }

  .post-title {
    margin-bottom: 5px;
  }

  .no-image-thumbnail {
    display: none;
  }

  .post-expand,
  .post-expanded {
    display: none;
  }
}
</style>
