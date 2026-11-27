<script setup>
import { computed } from 'vue'
import { useRodadasStore } from '../stores/rodadasStore'
import { useTabelaStore } from '../stores/tabelaStore'
import { useFavoritosStore } from '../stores/favoritosStore'
import TabelaLinha from '../components/TabelaLinha.vue'

const rodadasStore = useRodadasStore()
const tabelaStore = useTabelaStore()
const favoritosStore = useFavoritosStore()

const classificacao = computed(() => tabelaStore.classificacao)
const partidasConcluidas = computed(() => tabelaStore.partidasConcluidas)
const totalPartidas = computed(() => tabelaStore.totalPartidas)

function resetarCampeonato() {
  if (window.confirm('Tem certeza que deseja apagar todos os placares?')) {
    rodadasStore.resetarCampeonato()
  }
}
</script>

<template>
  <section class="container page-shell">
    <div class="page-heading">
      <div>
        <span class="eyebrow">Temporada em andamento</span>
        <h1 class="page-title">Classificação</h1>
        <p class="page-description">
          Cada gol muda a história. Atualize os resultados e acompanhe a tabela em tempo real.
        </p>
      </div>
      <button class="button" type="button" @click="resetarCampeonato">
        <span aria-hidden="true">↻</span>
        Resetar campeonato
      </button>
    </div>

    <div class="summary-row">
      <div class="summary-card card">
        <span class="summary-icon">⚽</span>
        <span><strong>{{ partidasConcluidas }}<small>/{{ totalPartidas }}</small></strong><small>jogos concluídos</small></span>
      </div>
      <div class="summary-card card">
        <span class="summary-icon">🏆</span>
        <span><strong>{{ classificacao[0]?.nome ?? '—' }}</strong><small>líder do campeonato</small></span>
      </div>
      <div class="summary-card card">
        <span class="summary-icon">★</span>
        <span><strong>{{ classificacao.find((time) => time.id === favoritosStore.timeId)?.nome }}</strong><small>seu time do coração</small></span>
      </div>
    </div>

    <section class="card section-card standings-card" aria-labelledby="standings-title">
      <div class="section-heading">
        <div>
          <h2 id="standings-title">Tabela do campeonato</h2>
          <p>Turno e returno · 6 clubes · 10 rodadas</p>
        </div>
        <span class="live-label"><span></span> ATUALIZADA AO VIVO</span>
      </div>
      <div class="table-scroll">
        <table class="standings-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Clube</th>
              <th scope="col">P</th>
              <th scope="col">J</th>
              <th scope="col">V</th>
              <th scope="col">E</th>
              <th scope="col">D</th>
              <th scope="col">GP</th>
              <th scope="col">GC</th>
              <th scope="col">SG</th>
              <th scope="col"><span class="visually-hidden">Favorito</span>★</th>
            </tr>
          </thead>
          <tbody>
            <TabelaLinha
              v-for="time in classificacao"
              :key="time.id"
              :time="time"
              :favorita="favoritosStore.timeId === time.id"
              @favoritar="favoritosStore.selecionarTime"
            />
          </tbody>
        </table>
      </div>
      <div class="table-legend">
        <span><i class="legend-marker leader"></i> Líder</span>
        <span><i class="legend-marker"></i> Demais posições</span>
        <span>P pontos · J jogos · SG saldo de gols</span>
      </div>
    </section>
  </section>
</template>

<style scoped>
.summary-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 21px;
}

.summary-card {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 13px;
  padding: 18px;
}

.summary-icon {
  display: grid;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 12px;
  background: var(--green-soft);
  color: var(--green);
  font-size: 18px;
}

.summary-card > span:last-child {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.summary-card strong {
  overflow: hidden;
  color: var(--ink);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-card strong small {
  color: var(--muted);
  font-size: 11px;
}

.summary-card > span:last-child > small {
  color: var(--muted);
  font-size: 10px;
}

.live-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.7px;
  white-space: nowrap;
}

.live-label span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #46b46b;
  box-shadow: 0 0 0 3px #e4f4e8;
}

.table-legend {
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 14px 20px;
  border-top: 1px solid var(--line-soft);
  color: var(--muted);
  font-size: 10px;
}

.table-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.legend-marker {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c7d0c8;
}

.legend-marker.leader {
  background: var(--green);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 680px) {
  .summary-row {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .summary-card {
    padding: 13px 15px;
  }

  .table-legend {
    flex-wrap: wrap;
    gap: 9px 14px;
  }
}
</style>
