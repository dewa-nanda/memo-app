<template>
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-4xl font-bold">
      Memo app
    </h1>

    <button class="text-xl font-bold border-2 rounded px-2 py-1 hover:text-black hover:bg-white"
      @click="toggleModal=true"
    >+</button>
  </div>

  <div class="grid grid-cols-5 gap-4">
    <div class="border-2 rounded-lg px-2 py-3 flex flex-col justify-between gap-2 h-[200px]" :style="{backgroundColor:memo.backgroundColor}" :key="memo.id" v-for="memo in memos">
      <p class="break-all line-clamp-5 text-black">{{ memo.content }}</p>
      <div class="flex justify-between text-black">
        <p class="break-all border-t-2 border-black w-fit">{{ memo.date }}</p>
        <button class="hover:text-white" @click="deleteMemo(memo.id)">Delete</button>
      </div>
    </div>
  </div>

  <div class="form-overlay" v-show="toggleModal">
    <div class="w-1/2 h-2/5 flex flex-col bg-slate-500 rounded-xl p-4">
      <div class="flex justify-between items-center pb-5 basis-1/5">
        <h1 class="text-2xl">Add Memo</h1>
        <button class="text-xl w-fit h-fit"
          @click="toggleModal=false"
        >X</button>
      </div>

      <form class="w-full flex flex-col gap-2 basis-full" @submit.prevent="addMemo">
        <p class="text-red-400" v-show="textAreaErrorHandler">memo tidak boleh kosong!</p>
        <textarea v-model="formNewMemo" class="w-full basis-full rounded ps-2 pt-2"></textarea>
        <button class="bg-slate-400 rounded px-2 py-1 w-fit self-end" type="submit">Submit</button>
      </form>
    </div>
  </div>

    
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface memoItem {
    id: number,
    content: string,
    date: string,
    backgroundColor: string
  }

  const toggleModal = ref<boolean>(false)
  const textAreaErrorHandler = ref<boolean>(false)
  const formNewMemo = ref<string>('')
  const memos = ref< Array<memoItem> >([])

  

  function addMemo() {
    if(formNewMemo.value === '') {
      textAreaErrorHandler.value = true
    }else{
      memos.value.push({
        id: Date.now(),
        content: formNewMemo.value,
        date: new Date().toLocaleDateString("en-GB"),
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      })
      textAreaErrorHandler.value = false
      alert('Memo berhasil ditambahkan !')
      formNewMemo.value = ''
      toggleModal.value = false
    }
  }

  function deleteMemo( id:number ) {
    const data = memos.value.filter(memo => memo.id === id)[0]
    alert("Memo pada id " + data.id + " berhasil dihapus")
    memos.value = memos.value.filter(memo => memo.id !== id)
  }
</script>

<style scoped>
  .form-overlay{
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