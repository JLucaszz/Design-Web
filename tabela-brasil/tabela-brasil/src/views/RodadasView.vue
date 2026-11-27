<script setup>
import { computed, ref } from 'vue'
import CardPartida from '../components/CardPartida.vue'
import { useRodadasStore } from '../stores/rodadasStore'

const rodadasStore = useRodadasStore()
const rodadaSelecionada = ref(1)

const rodada = computed(() =>
  rodadasStore.rodadas.find((item) => item.numero === Number(rodadaSelecionada.value))
)
const partidasConcluidas = computed(() =>
  rodada.value.partidas.filter(
    (partida) => partida.golsMandante !== null && partida.golsVisitante !== null
  ).length
)

function atualizarPlacar(partidaId, campo, valor) {
  rodadasStore.atualizarPlacar(partidaId, campo, valor)
}
</script>

<template>
  <section class="container page-shell">
    <div class="page-heading">
      <div>
        <span class="eyebrow">Simule cada confronto</span>
        <h1 class="page-title">Jogos e rodadas</h1>
        <p class="page-description">
          Digite os gols de cada partida. A classificação e as estatísticas mudam na hora.
        </p>
      </div>
      <label class="round-picker">
        <span>Rodada</span>
        <select v-model="rodadaSelecionada" aria-label="Selecionar rodada">
          <option v-for="item in rodadasStore.rodadas" :key="item.numero" :value="item.numero">
            {{ item.numero }}ª rodada
          </option>
        </select>
      </label>
    </div>

    <nav class="round-tabs" aria-label="Escolher rodada">
      <button
        v-for="item in rodadasStore.rodadas"
        :key="item.numero"
        class="round-tab"
        :class="{ active: rodadaSelecionada === item.numero }"
        type="button"
        :aria-pressed="rodadaSelecionada === item.numero"
        @click="rodadaSelecionada = item.numero"
      >
        {{ item.numero }}
      </button>
    </nav>

    <section class="round-panel card" :aria-labelledby="`round-${rodada.numero}`">
      <header class="round-heading">
        <div>
          <span class="round-kicker">{{ rodada.numero <= 7 ? 'TURNO' : 'RETURNO' }}</span>
          <h2 :id="`round-${rodada.numero}`">{{ rodada.numero }}ª rodada</h2>
        </div>
        <span class="round-progress">{{ partidasConcluidas }} de {{ rodada.partidas.length }} jogos</span>
      </header>
      <div class="matches-grid">
        <CardPartida
          v-for="partida in rodada.partidas"
          :key="partida.id"
          :partida="partida"
          :mandante="rodadasStore.times.find((time) => time.id === partida.mandante)"
          :visitante="rodadasStore.times.find((time) => time.id === partida.visitante)"
          @atualizar="(campo, valor) => atualizarPlacar(partida.id, campo, valor)"
        />
      </div>
      <p class="round-tip"><span>↗</span> Os resultados ficam salvos automaticamente neste dispositivo.</p>
    </section>
  </section>
</template>

<style scoped>
.round-picker {
  display: grid;
  gap: 5px;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
}

.round-picker select {
  min-width: 150px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: white;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
}

.round-tabs {
  display: flex;
  gap: 7px;
  overflow-x: auto;
  margin-bottom: 14px;
  padding-bottom: 3px;
}

.round-tab {
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: white;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}

.round-tab:hover,
.round-tab.active {
  border-color: var(--green);
  background: var(--green);
  color: white;
}

.round-panel {
  padding: 22px;
}

.round-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.round-kicker {
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.round-heading h2 {
  margin: 3px 0 0;
  font-family: Manrope, sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.round-progress {
  padding: 8px 11px;
  border-radius: 8px;
  background: #f2f6f2;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.matches-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;
}

.round-tip {
  margin: 17px 0 0;
  color: var(--muted);
  font-size: 11px;
}

.round-tip span {
  margin-right: 4px;
  color: var(--green);
}

@media (max-width: 720px) {
  .round-panel {
    padding: 15px;
  }

  .matches-grid {
    grid-template-columns: 1fr;
  }
}
</style>
