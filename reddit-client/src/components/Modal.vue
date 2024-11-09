<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-container" @click.stop :style="modalStyle">
      <div class="modal-header">
        <slot name="header">Default Header</slot>
      </div>
      <div class="modal-body">
        <slot name="body">Default Body</slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button @click="close">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  position: {
    type: Object,
    default: () => ({ top: "50%", left: "50%" }),
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const modalStyle = computed(() => ({
  top: props.position.top,
  left: props.position.left,
  transform: props.position.transform || "translate(-50%, -50%)",
}));
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  position: absolute;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-header,
.modal-body,
.modal-footer {
  margin-bottom: 10px;
}

.modal-footer {
  text-align: right;
}
</style>
