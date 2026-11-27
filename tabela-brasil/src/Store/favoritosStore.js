import { defineStore } from 'pinia'

export const useFavoritosStore = defineStore('favoritos', {
  state: () => ({
    timeId: 1
  }),

  actions: {
    selecionarTime(id) {
      this.timeId = id
    }
  }
})