<template>
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-4xl font-bold">
      Memo app
    </h1>

    <div class="flex gap-3">
      <input class="rounded-xl bg-slate-400 px-2" v-model="searchInput">
      <button class="text-xl font-bold border-2 rounded px-2 py-1 hover:text-black hover:bg-white"
        @click="toggleModal=true"
      >Add Memo</button>
    </div>
  </div>

  <div class="grid grid-cols-5 gap-4">
    <div class="border-2 rounded-lg px-2 py-3 flex flex-col justify-between gap-2 h-[220px]" :style="{backgroundColor:memo.backgroundColor}" :key="memo.id" v-for="memo in displayedMemos">
      <h2 class="break-all line-clamp-1 text-black text-3xl font-bold">{{ memo.title }}</h2>
      <p class="justify-evenly text-black line-clamp-4">{{ memo.content }}</p>
      <div class="flex justify-between text-black">
        <p class="border-t-2 border-black w-fit self-end">{{ memo.date }}</p>
        <button class="hover:text-white self-end" @click="deleteMemo(memo.id)">Delete</button>
      </div>
    </div>
  </div>

  <div class="form-overlay" v-show="toggleModal">
    <div class="w-1/2 h-2/5 flex flex-col bg-slate-500 rounded-xl p-4">
      <div class="flex justify-between items-center pb-5 basis-1/5">
        <h1 class="text-2xl">Add Memo</h1>
        <button class="text-xl w-fit h-fit"
          @click="closeModal"
        >X</button>
      </div>

      <form class="w-full flex flex-col gap-2 basis-full" @submit.prevent="addMemo">
        <div class="flex gap-2">
          <label for="title">Title</label>
          <p class="text-red-400" v-show="formErrorHandler.title">| Title tidak boleh kosong!</p>
        </div>
        <input class="px-2 rounded p-2" placeholder="insert title here" id="title" v-model="inputMemo.title">
        <div class="flex gap-2">
          <label for="desc">Description</label>
          <p class="text-red-400" v-show="formErrorHandler.content">| content tidak boleh kosong!</p>
        </div>
        <textarea v-model="inputMemo.content" class="w-full basis-full rounded px-2 pt-2" id="desc" placeholder="insert description here"></textarea>
        <button class="bg-slate-400 rounded px-2 py-1 w-fit self-end hover:bg-[#121212]" type="submit">Submit</button>
      </form>
    </div>
  </div>

    
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  // define data types
  interface memoItem {
    id: number,
    title: string,
    content: string,
    date: string,
    backgroundColor: string
  }

  interface formErrorHandler {
    title: boolean,
    content: boolean
  }

  interface formMemo {
    title: string,
    content: string
  }

  // define variables
  const toggleModal = ref<boolean>(false)
  const searchInput = ref<string>('')

  const formErrorHandler = ref<formErrorHandler>(
    {
      title : false,
      content : false
    }
  )

  const inputMemo = ref<formMemo>(
    {
      title: '', 
      content: ''
    }
  )
  
  const memos = ref< Array<memoItem> >([])
  const displayedMemos = ref< Array<memoItem> >([])

  // define function
  function addMemo() {
    if(inputMemo.value.title === '' || inputMemo.value.content === '') {
      inputMemo.value.title === '' ? (formErrorHandler.value.title = true) : (formErrorHandler.value.title = false)
      inputMemo.value.content === '' ? (formErrorHandler.value.content = true) : (formErrorHandler.value.content = false)
    }else{
      memos.value.push({
        id: Date.now(),
        title: inputMemo.value.title,
        content: inputMemo.value.content,
        date: new Date().toLocaleDateString("en-GB"),
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      })
      displayedMemos.value.push({
        id: Date.now(),
        title: inputMemo.value.title,
        content: inputMemo.value.content,
        date: new Date().toLocaleDateString("en-GB"),
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      })
      alert('Memo berhasil ditambahkan !')
      inputMemo.value.content = ''
      inputMemo.value.title = ''
      formErrorHandler.value.content = false
      formErrorHandler.value.title = false
      toggleModal.value = false
    }
  }

  function deleteMemo( id:number ) {
    const data = memos.value.filter(memo => memo.id === id)[0]
    alert("Memo pada id " + data.id + " berhasil dihapus")
    memos.value = memos.value.filter(memo => memo.id !== id)
  }

  function closeModal() {
    toggleModal.value = false
    inputMemo.value.title = ''
    formErrorHandler.value.title = false
    inputMemo.value.content = ''
    formErrorHandler.value.content = false
  }

  watch(searchInput, () => {
    displayedMemos.value = memos.value.filter(memo => memo.title.includes(searchInput.value))
  })
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