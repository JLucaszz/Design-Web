import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useRodadasStore } from './rodadasStore'

function estatisticasIniciais(time) {
  return {
    ...time,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0
  }
}

export const useTabelaStore = defineStore('tabela', () => {
  const rodadasStore = useRodadasStore()

  const classificacao = computed(() => {
    const tabela = new Map(
      rodadasStore.times.map((time) => [time.id, estatisticasIniciais(time)])
    )

    for (const rodada of rodadasStore.rodadas) {
      for (const partida of rodada.partidas) {
        const { golsMandante, golsVisitante } = partida
        if (golsMandante === null || golsVisitante === null) continue

        const mandante = tabela.get(partida.mandante)
        const visitante = tabela.get(partida.visitante)
        mandante.jogos += 1
        visitante.jogos += 1
        mandante.golsPro += golsMandante
        mandante.golsContra += golsVisitante
        visitante.golsPro += golsVisitante
        visitante.golsContra += golsMandante

        if (golsMandante > golsVisitante) {
          mandante.vitorias += 1
          visitante.derrotas += 1
          mandante.pontos += 3
        } else if (golsMandante < golsVisitante) {
          visitante.vitorias += 1
          mandante.derrotas += 1
          visitante.pontos += 3
        } else {
          mandante.empates += 1
          visitante.empates += 1
          mandante.pontos += 1
          visitante.pontos += 1
        }
      }
    }

    return [...tabela.values()]
      .map((time) => ({ ...time, saldoGols: time.golsPro - time.golsContra }))
      .sort((a, b) =>
        b.pontos - a.pontos ||
        b.vitorias - a.vitorias ||
        b.saldoGols - a.saldoGols ||
        b.golsPro - a.golsPro ||
        a.nome.localeCompare(b.nome, 'pt-BR')
      )
      .map((time, indice) => ({ ...time, posicao: indice + 1 }))
  })

  const totalPartidas = computed(() =>
    rodadasStore.rodadas.reduce((total, rodada) => total + rodada.partidas.length, 0)
  )
  const partidasConcluidas = computed(() =>
    rodadasStore.rodadas.reduce(
      (total, rodada) =>
        total + rodada.partidas.filter(
          (partida) => partida.golsMandante !== null && partida.golsVisitante !== null
        ).length,
      0
    )
  )
  const golsMarcados = computed(() =>
    classificacao.value.reduce((total, time) => total + time.golsPro, 0)
  )

  return { classificacao, totalPartidas, partidasConcluidas, golsMarcados }
})
