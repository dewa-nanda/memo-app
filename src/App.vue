<template>
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-4xl font-bold">Memo app</h1>

    <div class="flex gap-3">
      <ModalForm />
    </div>
  </div>

  <div class="grid grid-cols-5 gap-4">
    <Memo v-for="memo in storeMemo.memos" :key="memo.id" :memo="memo" />
  </div>
</template>

<script setup lang="ts">
  import { useMemosStore } from './utils/store'
  import ModalForm from './components/modalForm.vue'
  import Memo from './components/memo.vue'

  const storeMemo = useMemosStore()
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
