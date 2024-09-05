<template>
  <button
    class="text-xl font-bold border-2 rounded px-2 py-1 hover:text-black hover:bg-white"
    @click="toggleModal = true"
  >
    Add Memo
  </button>

  <div class="form-overlay" v-show="toggleModal" @click="toggleModal = false">
    <div
      class="w-1/2 min-h-2/5 flex flex-col bg-slate-500 rounded-xl p-4"
      @click.stop
    >
      <div class="flex justify-between items-center pb-5 basis-1/5">
        <h1 class="text-2xl">Add Memo</h1>
        <button class="text-xl w-fit h-fit" @click="toggleModal = false">
          X
        </button>
      </div>

      <form
        class="w-full flex flex-col gap-2 basis-full"
        @submit.prevent="handlerAddMemo"
      >
        <div class="flex gap-2">
          <label for="title">Title</label>
          <p class="text-red-400" v-show="formErrorHandler.title">
            | Title tidak boleh kosong!
          </p>
        </div>
        <input
          class="px-2 rounded p-2"
          placeholder="insert title here"
          id="title"
          v-model="inputMemo.title"
        />
        <div class="flex gap-2">
          <label for="desc">Description</label>
          <p class="text-red-400" v-show="formErrorHandler.content">
            | content tidak boleh kosong!
          </p>
        </div>
        <textarea
          v-model="inputMemo.content"
          class="w-full basis-full rounded px-2 pt-2"
          id="desc"
          placeholder="insert description here"
        ></textarea>
        <button
          class="bg-slate-400 rounded px-2 py-1 w-fit self-end hover:bg-[#121212]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useMemosStore } from '../utils/store'
  import type { formErrorHandler, formMemo } from '../types'

  const storeMemo = useMemosStore()
  const toggleModal = ref<boolean>(false)

  const inputMemo = ref<formMemo>({
    title: '',
    content: '',
  })

  const formErrorHandler = ref<formErrorHandler>({
    title: false,
    content: false,
  })

  const handlerAddMemo = () => {
    if (inputMemo.value.title && inputMemo.value.content) {
      storeMemo.addMemo(inputMemo)
      toggleModal.value = false
      formErrorHandler.value.content = false
      formErrorHandler.value.title = false
      inputMemo.value.content = ""
      inputMemo.value.title = ""
    } else {
      if (!inputMemo.value.title) {
        formErrorHandler.value.title = true
      } else {
        formErrorHandler.value.title = false
      }
      if (!inputMemo.value.content) {
        formErrorHandler.value.content = true
      } else {
        formErrorHandler.value.content = false
      }
    }
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
