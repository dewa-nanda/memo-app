<template>
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-4xl font-bold">Memo app</h1>

    <div class="flex gap-3">
      <input class="rounded-xl bg-slate-400 px-2" v-model="searchInput" />
      <modalForm />
    </div>
  </div>

  <div class="grid grid-cols-5 gap-4">
    <div
      class="border-2 rounded-lg px-2 py-3 flex flex-col justify-between gap-2 h-[220px]"
      :style="{ backgroundColor: memo.backgroundColor }"
      :key="memo.id"
      v-for="memo in displayedMemos"
    >
      <h2 class="break-all line-clamp-1 text-black text-3xl font-bold">
        {{ memo.title }}
      </h2>
      <p class="justify-evenly text-black line-clamp-4">{{ memo.content }}</p>
      <div class="flex justify-between text-black">
        <p class="border-t-2 border-black w-fit self-end">{{ memo.date }}</p>
        <button class="hover:text-white self-end" @click="deleteMemo(memo.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { memoItem, formErrorHandler, formMemo } from './types'
  import { useMemosStore } from './utils/store'
  import modalForm from './components/modalForm.vue'

  const store = useMemosStore()
  // define variables
  const toggleModal = ref<boolean>(false)
  const searchInput = ref<string>('')
  const formErrorHandler = ref<formErrorHandler>({
    title: false,
    content: false,
  })
  const inputMemo = ref<formMemo>({
    title: '',
    content: '',
  })
  const memos = ref<Array<memoItem>>([])
  const displayedMemos = ref<Array<memoItem>>([])

  watch(searchInput, () => {
    displayedMemos.value = memos.value.filter(memo =>
      memo.title.includes(searchInput.value)
    )
  })
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
