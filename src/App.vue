<template>
  <div class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
    <h1 class="text-4xl font-bold">Memo app</h1>

    <modal-form />
  </div>

  <div class="border-2 border-[#b4a2a2] rounded-md h-fit md:min-h-[550px] p-2">
    <template v-if="storeMemo.memos.length != 0">
      <div
        :class="[
          'flex justify-between border-b-2 rounded-xl border-[#b4a2a2] my-1 py-1 px-1',
        ]"
      >
        <h2 class="font-bold text-2xl">List of Memos</h2>
        <div
          class="flex gap-2 items-center rounded-md bg-[#FFEAC5] border-2 border-[#6C4E31]"
        >
          <label for="search">
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="ms-2"
            />
          </label>
          <input
            id="search"
            class="focus:outline-none focus:shadow-inner h-full bg-transparent"
            v-model.lazy.trim="inputSearch"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <memo v-for="memo in storeMemo.memos" :key="memo.id" :memo="memo" />
      </div>
    </template>

    <div v-else class="h-full flex flex-col">
      <img :src="nothingIllustration" class="mx-auto" />
      <h1 class="text-2xl font-bold text-center -mt-9">
        Nothing Memo Here Yet!
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
  import nothingIllustration from './assets/image/nothing-illustration.svg'
  import dataMemoJson from './assets/data/memo.json'
  import { useMemosStore } from './utils/store'
  import { onBeforeMount, onUpdated, ref } from 'vue'
  import { memoItem } from './types'
  import Memo from './components/Memo.vue'
  import ModalForm from './components/Form.vue'
  const storeMemo = useMemosStore()
  const inputSearch = ref('')

  onBeforeMount(() => {
    const tempMemos = localStorage.getItem('memos')

    if (!tempMemos) {
      localStorage.setItem('memos', JSON.stringify(dataMemoJson))
      dataMemoJson.map((memo: any) => {
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
