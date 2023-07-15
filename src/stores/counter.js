import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const personal = ref('') //存放个人信息
  const count = ref(100)
  const add = (n) => {
    count.value = n
  }
  const send = (n) => {
    personal.value = n
  }
  return {personal,count,add,send}
},
  {
    persist: true,
  },
)
