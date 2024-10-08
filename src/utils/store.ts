import { defineStore } from 'pinia'
import { memoItem, formMemo } from '../types'
import { Ref } from 'vue'

export const useMemosStore = defineStore('memos', {
  state: () => ({
    memos: [] as Array<memoItem>,
  }),
  actions: {
    addMemo(memo: Ref<formMemo>) {
      this.memos.push({
        id: Date.now(),
        title: memo.value.title,
        content: memo.value.content,
        date: new Date().toLocaleDateString('en-GB'),
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`,
      })

      localStorage.setItem('memos', JSON.stringify(this.memos))
    },

    deleteMemo(id: number) {
      const index = this.memos.findIndex(memo => memo.id === id)
      if (index !== -1) {
        this.memos.splice(index, 1)
        localStorage.setItem('memos', JSON.stringify(this.memos))
      }
    },

    editMemo(id: number) {
      const index = this.memos.findIndex(memo => memo.id === id)
      this.memos[index].title = 'ganti'
      localStorage.setItem('memos', JSON.stringify(this.memos))
    },
  },
})
