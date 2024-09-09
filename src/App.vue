<template>
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-4xl font-bold">Memo app</h1>

    <div class="flex gap-3">
      <modal-form />
    </div>
  </div>

  <div class="border-2 border-[#b4a2a2] rounded-md min-h-[550px] p-2">
    <template v-if="storeMemo.memos.length != 0">
      <div
        :class="[
          'flex justify-between border-b-2 rounded-xl border-[#b4a2a2] my-1 py-1 px-1',
        ]"
      >
        <h2 class="font-bold text-2xl">List of Memos</h2>
        <input
          class="rounded-md px-2 bg-[#FFEAC5] border-2 border-[#6C4E31] focus:outline-none focus:shadow-inner focus:shadow-[#b4a2a2] placeholder:text-[#b4a2a2]"
          v-model.lazy.trim="inputSearch"
        />
      </div>
      <div class="grid grid-cols-5 gap-4">
        <memo v-for="memo in storeMemo.memos" :key="memo.id" :memo="memo" />
      </div>
    </template>

    <div v-else>
      <img :src="nothingIllustration" class="mx-auto" />
      <h1 class="text-2xl font-bold text-center -mt-9">
        Nothing Memo Here Yet!
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Memo from './components/Memo.vue'
  import ModalForm from './components/modalForm.vue'
  import nothingIllustration from './assets/image/nothing-illustration.svg'
  import dataMemoJson from './assets/data/memo.json'
  import { useMemosStore } from './utils/store'
  import { onBeforeMount, ref, watch } from 'vue'
  import { memoItem } from './types'

  const storeMemo = useMemosStore()
  const inputSearch = ref('')

  watch(inputSearch, e => {
    storeMemo.searchMemo(e)
  })

  onBeforeMount(() => {
    const tempMemos = localStorage.getItem('memos')

    if (!tempMemos) {
      localStorage.setItem('memos', JSON.stringify(dataMemoJson))
      dataMemoJson.map(memo => {
        const data = ref(memo)
        storeMemo.addMemo(data)
      })
    } else {
      const memos = ref(JSON.parse(localStorage.getItem('memos') || '[]'))

      memos.value.map((memo: memoItem) => {
        const data = ref(memo)
        storeMemo.addMemo(data)
      })
    }
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
