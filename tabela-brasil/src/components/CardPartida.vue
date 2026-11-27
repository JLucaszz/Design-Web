<script setup>
import { computed } from 'vue'
import { carregarEscudo } from '../utils/escudos'

const props = defineProps({
  partida: { type: Object, required: true },
  mandante: { type: Object, required: true },
  visitante: { type: Object, required: true }
})

const emit = defineEmits(['atualizar'])
const concluida = computed(() =>
  props.partida.golsMandante !== null && props.partida.golsVisitante !== null
)
const golsMandante = computed({
  get: () => props.partida.golsMandante ?? '',
  set: (valor) => emit('atualizar', 'golsMandante', valor === '' ? null : Number(valor))
})
const golsVisitante = computed({
  get: () => props.partida.golsVisitante ?? '',
  set: (valor) => emit('atualizar', 'golsVisitante', valor === '' ? null : Number(valor))
})
</script>

<template>
  <article class="match-card" :class="{ completed: concluida }">
    <div class="team team-home">
      <img :src="carregarEscudo(mandante.escudo)" :alt="`Escudo do ${mandante.nome}`">
      <span>{{ mandante.nome }}</span>
    </div>

    <div class="score-area">
      <label class="score-input-label">
        <span class="visually-hidden">Gols do {{ mandante.nome }}</span>
        <input
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          v-model.number="golsMandante"
          :aria-label="`Gols do ${mandante.nome}`"
        >
      </label>
      <span class="score-divider">:</span>
      <label class="score-input-label">
        <span class="visually-hidden">Gols do {{ visitante.nome }}</span>
        <input
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          v-model.number="golsVisitante"
          :aria-label="`Gols do ${visitante.nome}`"
        >
      </label>
    </div>

    <div class="team team-away">
      <span>{{ visitante.nome }}</span>
      <img :src="carregarEscudo(visitante.escudo)" :alt="`Escudo do ${visitante.nome}`">
    </div>
    <span class="match-status">{{ concluida ? 'ENCERRADO' : 'PLACAR' }}</span>
  </article>
</template>

<style scoped>
.match-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 112px minmax(0, 1fr);
  align-items: center;
  gap: 15px;
  min-height: 94px;
  padding: 18px 20px 25px;
  border: 1px solid var(--line-soft);
  border-radius: 13px;
  background: #fff;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.match-card:focus-within,
.match-card.completed {
  border-color: #c8dfcc;
  box-shadow: 0 5px 16px rgb(22 91 45 / 5%);
}

.team {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-size: 13px;
  font-weight: 700;
}

.team span {
  overflow: hidden;
  text-overflow: ellipsis;
}

.team img {
  flex: 0 0 auto;
  width: 30px;
  height: 34px;
  object-fit: contain;
}

.team-away {
  justify-content: flex-end;
  text-align: right;
}

.score-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.score-input-label input {
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fbfcfb;
  color: var(--ink);
  font-size: 19px;
  font-weight: 800;
  text-align: center;
}

.score-input-label input:focus {
  border-color: var(--green);
  outline: 3px solid rgb(31 112 57 / 12%);
}

.score-divider {
  color: #a4ada5;
  font-size: 16px;
  font-weight: 700;
}

.match-status {
  position: absolute;
  right: 20px;
  bottom: 8px;
  color: var(--muted-light);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.8px;
}

.completed .match-status {
  color: var(--green);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 540px) {
  .match-card {
    grid-template-columns: minmax(0, 1fr) 94px minmax(0, 1fr);
    gap: 7px;
    padding: 15px 11px 25px;
  }

  .team {
    gap: 6px;
    font-size: 11px;
  }

  .team img {
    width: 25px;
    height: 29px;
  }

  .score-input-label input {
    width: 36px;
    height: 38px;
  }

  .score-area {
    gap: 4px;
  }
}
</style>
