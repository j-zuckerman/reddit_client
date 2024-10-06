<script setup lang="ts">
const props = defineProps(["post"]);
</script>

<template>
  <p>{{ props.post["title"] }}</p>
  <p>{{ props.post["ups"] }}</p>
  <p>{{ props.post["author"] }}</p>
  <p>{{ props.post["text"] }}</p>
  <p>{{ props.post["url"] }}</p>
</template>
