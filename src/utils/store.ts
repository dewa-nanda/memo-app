import { defineStore } from 'pinia'
import { memoItem, formMemo } from '../types'
import { Ref } from 'vue'

export const useMemosStore = defineStore('memos', {
  state: () => {
    return {
      memos: [] as Array<memoItem>,
    }
  },
  actions: {
    addMemo(memo: Ref<formMemo>) {
      this.memos.push({
        id: Date.now(),
        title: memo.value.title,
        content: memo.value.content,
        date: new Date().toLocaleDateString("en-GB"),
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      })
    },
  },
})
