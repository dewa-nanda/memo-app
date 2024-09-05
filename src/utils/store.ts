import { defineStore } from 'pinia'
import { memoItem, formMemo } from '../types'

export const useMemosStore = defineStore('memos', {
  state: () => {
    return {
      memos: [] as memoItem[],
    }
  },
  actions: {
    addMemo(memo: formMemo) {
      console.log(memo)
    },
  },
})
