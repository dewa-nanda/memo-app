<template>
  <div
    class="border-2 rounded-lg px-2 py-3 flex flex-col justify-between gap-2 h-[220px]"
    :style="{ backgroundColor: memo.backgroundColor }"
  >
    <h2 class="break-all line-clamp-1 text-black text-3xl font-bold">
      {{ memo.title }}
    </h2>
    <p class="justify-evenly text-black line-clamp-4">{{ memo.content }}</p>
    <div class="flex justify-between text-black">
      <p class="border-t-2 border-black w-fit self-end">{{ memo.date }}</p>
      <button
        class="hover:text-white self-end"
        @click="storeMemo.deleteMemo(memo.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import { memoItem } from '../types'
  import { useMemosStore } from '../utils/store'

  defineProps<{ memo: memoItem }>()
  const storeMemo = useMemosStore()
</script>
