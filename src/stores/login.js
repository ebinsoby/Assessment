import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useLoginDetails = defineStore('loggedInUser', {

  state: () => {
    return {
      isLoggedIn: false,
      lastThreeTrx: []
    }
  },
  getters: {
    // automatically infers the return type as a number
    getLastThreeTrx(state) {
      return state.lastThreeTrx
    },
  },
  actions: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn
    },
    stackHistory(value) {
      // debugger
      this.lastThreeTrx = [value, ...this.lastThreeTrx]
      this.lastThreeTrx.length = 3;
    }
  }
})
