<script setup lang="ts">
import { defineProps, ref, computed } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const startIndex = ref(0);
const visibleCount = 3;
const endIndex = computed(() => startIndex.value + visibleCount);

const visibleImages = computed(() => props.images.slice(startIndex.value, endIndex.value));

const prevImages = () => {
  if (startIndex.value > 0) {
    startIndex.value -= visibleCount;
  }
};

const nextImages = () => {
  if (endIndex.value < props.images.length) {
    startIndex.value += visibleCount;
  }
};
</script>

<template>
  <div class="gallery">
    <button class="gallery-arrow" @click="prevImages" :disabled="startIndex === 0">←</button>
    <div class="gallery-items">
      <div v-for="(image, index) in visibleImages" :key="index" class="gallery-item">
        <img :src="image" />
      </div>
    </div>
    <button class="gallery-arrow" @click="nextImages" :disabled="endIndex >= props.images.length">→</button>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  align-items: center;
}

.gallery-items {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.gallery-item {
  flex: 0 0 calc(33.333% - 10px);
  margin: 5px;
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
}

button.gallery-arrow {
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  cursor: not-allowed;
}
</style>
