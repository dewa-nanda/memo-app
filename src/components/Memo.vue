<template>
  <div
    class="border-2 rounded-lg px-2 py-3 flex flex-col justify-between gap-1 h-[220px] bg-slate-400"
  >
    <h2
      class="break-all line-clamp-1 text-[#6C4E31] text-3xl font-extrabold basis-1/4"
    >
      {{ memo.title }}
    </h2>
    <p class="justify-evenly text-[#6C4E31] line-clamp-4 font-bold basis-3/6">
      {{ memo.content }}
    </p>
    <div class="flex justify-between text-[#6C4E31] basis-1/4 items-end">
      <p class="border-t-2 border-[#6C4E31] font-bold w-fit self-end">
        <font-awesome-icon :icon="['fas', 'calendar-day']" /> {{ memo.date }}
      </p>

      <div class="flex gap-2 text-xl">
        <button
          class="hover:text-green-400 self-end text-green-300"
          @click="console.log('proses')"
        >
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </button>
        <button
          class="hover:text-red-400 self-end text-red-300"
          @click="storeMemo.deleteMemo(memo.id)"
        >
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { memoItem } from '../types'
  import { useMemosStore } from '../utils/store'

  defineProps<{ memo: memoItem }>()
  const storeMemo = useMemosStore()
</script>
