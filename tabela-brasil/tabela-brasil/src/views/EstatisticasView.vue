<script setup>
import { computed } from 'vue'
import { useTabelaStore } from '../stores/tabelaStore'

const tabelaStore = useTabelaStore()

const timesComJogos = computed(() =>
  tabelaStore.classificacao.filter((time) => time.jogos > 0)
)
const destaques = computed(() => {
  const times = timesComJogos.value
  if (!times.length) return []

  const melhor = (comparador) => [...times].sort(comparador)[0]
  return [
    { titulo: 'Líder', detalhe: 'Mais pontos conquistados', time: tabelaStore.classificacao[0], icone: '🏆' },
    { titulo: 'Melhor ataque', detalhe: 'Mais gols marcados', time: melhor((a, b) => b.golsPro - a.golsPro || b.saldoGols - a.saldoGols), icone: '⚽', metrica: (time) => `${time.golsPro} gols` },
    { titulo: 'Melhor defesa', detalhe: 'Menos gols sofridos', time: melhor((a, b) => a.golsContra - b.golsContra || b.saldoGols - a.saldoGols), icone: '🧤', metrica: (time) => `${time.golsContra} sofridos` },
    { titulo: 'Melhor saldo', detalhe: 'Diferença de gols', time: melhor((a, b) => b.saldoGols - a.saldoGols), icone: '📈', metrica: (time) => `${time.saldoGols > 0 ? '+' : ''}${time.saldoGols} SG` }
  ]
})

const mediaGols = computed(() =>
  tabelaStore.partidasConcluidas
    ? (tabelaStore.golsMarcados / tabelaStore.partidasConcluidas).toFixed(2)
    : '0,00'
)
</script>

<template>
  <section class="container page-shell">
    <div class="page-heading">
      <div>
        <span class="eyebrow">Números que contam histórias</span>
        <h1 class="page-title">Estatísticas</h1>
        <p class="page-description">
          Os destaques são recalculados automaticamente a cada placar informado.
        </p>
      </div>
      <div class="completed-badge">
        <span class="pulse-dot"></span>
        {{ tabelaStore.partidasConcluidas }} / {{ tabelaStore.totalPartidas }} partidas
      </div>
    </div>

    <div class="stat-highlights">
      <article v-for="destaque in destaques" :key="destaque.titulo" class="highlight-card card">
        <div class="highlight-top">
          <span class="highlight-icon">{{ destaque.icone }}</span>
          <span class="highlight-label">{{ destaque.titulo }}</span>
        </div>
        <template v-if="destaque.time">
          <div class="highlight-club">
            <span class="club-position">{{ String(destaque.time.posicao).padStart(2, '0') }}</span>
            <div>
              <strong>{{ destaque.time.nome }}</strong>
              <small>{{ destaque.detalhe }}</small>
            </div>
          </div>
          <div class="highlight-metric">
            {{ destaque.metrica ? destaque.metrica(destaque.time) : `${destaque.time.pontos} pontos` }}
          </div>
        </template>
        <p v-else class="empty-highlight">Insira os primeiros placares para ver os destaques.</p>
      </article>
    </div>

    <section class="card goals-card">
      <div class="goals-copy">
        <span class="eyebrow">Resumo do campeonato</span>
        <h2>A bola já está rolando.</h2>
        <p>Veja como os gols marcados estão movimentando a competição.</p>
      </div>
      <div class="goals-numbers">
        <div><strong>{{ tabelaStore.golsMarcados }}</strong><span>gols marcados</span></div>
        <i></i>
        <div><strong>{{ mediaGols }}</strong><span>gols por partida</span></div>
      </div>
    </section>

    <p class="stats-note">Os números consideram apenas partidas com placar completo.</p>
  </section>
</template>

<style scoped>
.completed-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: white;
  color: var(--muted);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #46b46b;
  box-shadow: 0 0 0 3px #e4f4e8;
}

.stat-highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
}

.highlight-card {
  padding: 20px;
}

.highlight-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 19px;
}

.highlight-icon {
  display: grid;
  width: 35px;
  height: 35px;
  place-items: center;
  border-radius: 11px;
  background: #f1f6f1;
  font-size: 16px;
}

.highlight-label {
  color: var(--muted);
  font-size: 11px;
  font-weight: 700;
}

.highlight-club {
  display: flex;
  align-items: center;
  gap: 12px;
}

.club-position {
  color: #c6d3c8;
  font-family: Manrope, sans-serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
}

.highlight-club div {
  display: grid;
  gap: 3px;
}

.highlight-club strong {
  color: var(--ink);
  font-size: 15px;
}

.highlight-club small {
  color: var(--muted);
  font-size: 10px;
}

.highlight-metric {
  margin-top: 17px;
  padding-top: 12px;
  border-top: 1px solid var(--line-soft);
  color: var(--green-dark);
  font-size: 12px;
  font-weight: 800;
}

.empty-highlight {
  min-height: 52px;
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.goals-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-top: 15px;
  padding: 25px;
  background: #eef6ef;
}

.goals-copy .eyebrow {
  margin-bottom: 8px;
}

.goals-copy h2 {
  margin: 0 0 5px;
  font-family: Manrope, sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.6px;
}

.goals-copy p {
  margin: 0;
  color: var(--muted);
  font-size: 11px;
}

.goals-numbers {
  display: flex;
  align-items: center;
  gap: 22px;
}

.goals-numbers div {
  display: grid;
  gap: 2px;
  text-align: right;
}

.goals-numbers strong {
  color: var(--green-dark);
  font-family: Manrope, sans-serif;
  font-size: 25px;
  font-weight: 800;
}

.goals-numbers span {
  color: var(--muted);
  font-size: 10px;
}

.goals-numbers i {
  width: 1px;
  height: 35px;
  background: #d6e5d8;
}

.stats-note {
  margin: 13px 0 0;
  color: var(--muted-light);
  font-size: 10px;
  text-align: right;
}

@media (max-width: 680px) {
  .stat-highlights {
    grid-template-columns: 1fr;
  }

  .goals-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .goals-numbers {
    width: 100%;
    justify-content: space-between;
  }

  .goals-numbers div {
    text-align: left;
  }
}
</style>
