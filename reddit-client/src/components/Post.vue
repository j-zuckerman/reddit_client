<script setup lang="ts">
const props = defineProps(["post"]);
</script>

<template>
  <Card>
    <template #title>{{ props.post["title"] }}</template>
    <template #content>
      <p class="m-0">
        {{ props.post["text"] }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <p>{{ props.post["ups"] }}</p>
        <p>{{ props.post["author"] }}</p>
        <a href="props.post['url']" />
      </div>
    </template>
  </Card>
</template>
