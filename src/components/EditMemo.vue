<template>
  <button
    class="hover:text-green-400 self-end text-green-300"
    @click="toggleModal = true"
  >
    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
  </button>

  <div
    class="form-overlay"
    v-show="toggleModal"
    @click="handlerCloseModal"
  ></div>
</template>

<script setup lang="ts">
  import { useMemosStore } from '@/utils/store';
import { ref } from 'vue'

  const toggleModal = ref(false)
  const storeMemo = useMemosStore()

  const props = defineProps<{
    targetId: number
  }>()

  const handlerCloseModal = () => {
    toggleModal.value = false
    storeMemo.editMemo(props.targetId)
  }
</script>

<style scoped>
  .form-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.77);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
