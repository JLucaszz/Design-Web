import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { timesBase } from './rodadasStore'

const STORAGE_KEY = 'tabela-brasil:time-favorito'
const IDS_TIMES = new Set(timesBase.map((time) => time.id))

function carregarFavorito() {
  const salvo = localStorage.getItem(STORAGE_KEY)
  if (!salvo) return timesBase[0].id
  if (!IDS_TIMES.has(salvo)) {
    console.warn('O time favorito salvo não existe. O favorito padrão foi selecionado.')
    return timesBase[0].id
  }
  return salvo
}

export const useFavoritosStore = defineStore('favoritos', () => {
  const timeId = ref(carregarFavorito())

  watch(timeId, (id) => localStorage.setItem(STORAGE_KEY, id))

  function selecionarTime(id) {
    if (!IDS_TIMES.has(id)) throw new Error(`Time favorito inválido: ${id}`)
    timeId.value = id
  }

  return { timeId, selecionarTime }
})
