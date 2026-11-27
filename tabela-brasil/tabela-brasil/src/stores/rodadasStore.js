import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'tabela-brasil:rodadas'

export const timesBase = [
  { id: 'flamengo', nome: 'Flamengo', sigla: 'FLA', escudo: 'flamengo.png' },
  { id: 'palmeiras', nome: 'Palmeiras', sigla: 'PAL', escudo: 'palmeiras.png' },
  { id: 'atletico', nome: 'Atlético Mineiro', sigla: 'CAM', escudo: 'atletico.png' },
  { id: 'fluminense', nome: 'Fluminense', sigla: 'FLU', escudo: 'fluminense.png' },
  { id: 'saopaulo', nome: 'São Paulo', sigla: 'SAO', escudo: 'saopaulo.png' },
  { id: 'corinthians', nome: 'Corinthians', sigla: 'COR', escudo: 'corinthians.png' },
  { id: 'santos', nome: 'Santos', sigla: 'SAN', escudo: 'santos.png' }
]

function criarPrimeiroTurno() {
  const clubes = timesBase.map((time) => time.id)
  if (clubes.length % 2 !== 0) clubes.push(null)
  let ordem = [...clubes]

  return Array.from({ length: clubes.length - 1 }, (_, indice) => {
    const confrontos = []
    for (let partidaIndice = 0; partidaIndice < clubes.length / 2; partidaIndice += 1) {
      const mandante = ordem[partidaIndice]
      const visitante = ordem[ordem.length - 1 - partidaIndice]
      if (mandante && visitante) confrontos.push([mandante, visitante])
    }

    ordem = [ordem[0], ordem.at(-1), ...ordem.slice(1, -1)]

    return {
      numero: indice + 1,
      partidas: confrontos.map(([mandante, visitante], partidaIndice) => ({
        id: `r${indice + 1}-p${partidaIndice + 1}`,
        mandante,
        visitante,
        golsMandante: null,
        golsVisitante: null
      }))
    }
  })
}

function criarRodadas() {
  const primeiroTurno = criarPrimeiroTurno()
  const rodadasPorTurno = primeiroTurno.length
  const returno = primeiroTurno.map((rodada, indice) => ({
    numero: indice + rodadasPorTurno + 1,
    partidas: rodada.partidas.map((partida, partidaIndice) => ({
      id: `r${indice + rodadasPorTurno + 1}-p${partidaIndice + 1}`,
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
