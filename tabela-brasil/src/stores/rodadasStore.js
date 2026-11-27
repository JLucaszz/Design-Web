import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'tabela-brasil:rodadas'

export const timesBase = [
  { id: 'flamengo', nome: 'Flamengo', sigla: 'FLA', escudo: 'flamengo.png', cor: '#d62828' },
  { id: 'palmeiras', nome: 'Palmeiras', sigla: 'PAL', escudo: 'palmeiras.png', cor: '#087f5b' },
  { id: 'botafogo', nome: 'Botafogo', sigla: 'BOT', escudo: 'botafogo.png', cor: '#252525' },
  { id: 'fortaleza', nome: 'Fortaleza', sigla: 'FOR', escudo: 'fortaleza.png', cor: '#2563eb' },
  { id: 'saopaulo', nome: 'São Paulo', sigla: 'SAO', escudo: 'saopaulo.png', cor: '#c92a2a' },
  { id: 'bahia', nome: 'Bahia', sigla: 'BAH', escudo: 'bahia.png', cor: '#2563eb' }
]

const confrontosPrimeiroTurno = [
  [['flamengo', 'bahia'], ['palmeiras', 'saopaulo'], ['botafogo', 'fortaleza']],
  [['flamengo', 'saopaulo'], ['bahia', 'fortaleza'], ['palmeiras', 'botafogo']],
  [['flamengo', 'fortaleza'], ['saopaulo', 'botafogo'], ['bahia', 'palmeiras']],
  [['flamengo', 'botafogo'], ['fortaleza', 'palmeiras'], ['saopaulo', 'bahia']],
  [['flamengo', 'palmeiras'], ['botafogo', 'bahia'], ['fortaleza', 'saopaulo']]
]

function criarRodadas() {
  const primeiroTurno = confrontosPrimeiroTurno.map((confrontos, indice) => ({
    numero: indice + 1,
    partidas: confrontos.map(([mandante, visitante], partidaIndice) => ({
      id: `r${indice + 1}-p${partidaIndice + 1}`,
      mandante,
      visitante,
      golsMandante: null,
      golsVisitante: null
    }))
  }))

  const returno = primeiroTurno.map((rodada, indice) => ({
    numero: indice + 6,
    partidas: rodada.partidas.map((partida, partidaIndice) => ({
      id: `r${indice + 6}-p${partidaIndice + 1}`,
      mandante: partida.visitante,
      visitante: partida.mandante,
      golsMandante: null,
      golsVisitante: null
    }))
  }))

  return [...primeiroTurno, ...returno]
}

function carregarRodadas() {
  const salvo = localStorage.getItem(STORAGE_KEY)
  if (!salvo) return criarRodadas()

  const dados = JSON.parse(salvo)
  const estruturaBase = criarRodadas()
  const estruturaValida =
    Array.isArray(dados) &&
    dados.length === estruturaBase.length &&
    dados.every((rodada, indice) =>
      rodada !== null &&
      typeof rodada === 'object' &&
      rodada.numero === estruturaBase[indice].numero &&
      Array.isArray(rodada.partidas) &&
      rodada.partidas.length === estruturaBase[indice].partidas.length &&
      rodada.partidas.every((partida, partidaIndice) =>
        partida !== null &&
        typeof partida === 'object' &&
        partida.id === estruturaBase[indice].partidas[partidaIndice].id &&
        partida.mandante === estruturaBase[indice].partidas[partidaIndice].mandante &&
        partida.visitante === estruturaBase[indice].partidas[partidaIndice].visitante &&
        [partida.golsMandante, partida.golsVisitante].every(
          (gols) => gols === null || (Number.isInteger(gols) && gols >= 0)
        )
      )
    )

  if (!estruturaValida) {
    console.warn('Os placares salvos são inválidos. O campeonato foi reiniciado.')
  }

  return estruturaValida ? dados : criarRodadas()
}

export const useRodadasStore = defineStore('rodadas', () => {
  const rodadas = ref(carregarRodadas())

  watch(
    rodadas,
    (novasRodadas) => localStorage.setItem(STORAGE_KEY, JSON.stringify(novasRodadas)),
    { deep: true }
  )

  function atualizarPlacar(partidaId, lado, valor) {
    if (lado !== 'golsMandante' && lado !== 'golsVisitante') {
      throw new Error(`Campo de placar inválido: ${lado}`)
    }

    const gols = valor === '' || valor === null ? null : Number(valor)
    if (gols !== null && (!Number.isInteger(gols) || gols < 0)) {
      throw new Error('O placar deve ser um número inteiro não negativo.')
    }

    const partida = rodadas.value
      .flatMap((rodada) => rodada.partidas)
      .find((item) => item.id === partidaId)

    if (!partida) throw new Error(`Partida não encontrada: ${partidaId}`)
    partida[lado] = gols
  }

  function resetarCampeonato() {
    rodadas.value = criarRodadas()
  }

  return { rodadas, times: timesBase, atualizarPlacar, resetarCampeonato }
})
