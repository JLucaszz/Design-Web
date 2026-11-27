<script setup>
import { computed } from 'vue'
import { carregarEscudo } from '../utils/escudos'

const props = defineProps({
  time: { type: Object, required: true },
  favorita: { type: Boolean, default: false }
})

const emit = defineEmits(['favoritar'])
const escudo = computed(() => carregarEscudo(props.time.escudo))
</script>

<template>
  <tr :class="{ 'is-favorite': favorita }">
    <td class="position-cell">
      <span class="position-number">{{ time.posicao }}</span>
    </td>
    <td class="club-cell">
      <img class="club-crest" :src="escudo" :alt="`Escudo do ${time.nome}`">
      <span class="club-name">{{ time.nome }}</span>
    </td>
    <td class="points-cell">{{ time.pontos }}</td>
    <td>{{ time.jogos }}</td>
    <td>{{ time.vitorias }}</td>
    <td>{{ time.empates }}</td>
    <td>{{ time.derrotas }}</td>
    <td>{{ time.golsPro }}</td>
    <td>{{ time.golsContra }}</td>
    <td :class="{ positive: time.saldoGols > 0, negative: time.saldoGols < 0 }">
      {{ time.saldoGols > 0 ? `+${time.saldoGols}` : time.saldoGols }}
    </td>
    <td>
      <button
        class="favorite-button"
        :class="{ selected: favorita }"
        type="button"
        :aria-label="favorita ? `Remover ${time.nome} dos favoritos` : `Favoritar ${time.nome}`"
        :aria-pressed="favorita"
        @click="emit('favoritar', time.id)"
      >
        {{ favorita ? '★' : '☆' }}
      </button>
    </td>
  </tr>
</template>

<style scoped>
tr {
  border-bottom: 1px solid var(--line-soft);
  transition: background 150ms ease;
}

tr:hover {
  background: #f9fbf9;
}

tr.is-favorite {
  background: #f1f8f2;
}

td {
  height: 66px;
  padding: 0 12px;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
  white-space: nowrap;
}

.position-cell {
  width: 52px;
  padding-left: 17px;
  text-align: left;
}

.position-number {
  display: inline-grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 8px;
  background: #f1f4f1;
  color: var(--ink);
  font-size: 12px;
  font-weight: 750;
}

.club-cell {
  display: flex;
  min-width: 190px;
  align-items: center;
  gap: 11px;
  color: var(--ink);
  font-weight: 700;
  text-align: left;
}

.club-crest {
  width: 30px;
  height: 34px;
  object-fit: contain;
}

.club-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.points-cell {
  color: var(--ink);
  font-size: 14px;
  font-weight: 800;
}

.positive {
  color: var(--green-dark);
  font-weight: 700;
}

.negative {
  color: #c64a4a;
  font-weight: 700;
}

.favorite-button {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #a3aca4;
  cursor: pointer;
  font-size: 21px;
}

.favorite-button:hover,
.favorite-button.selected {
  background: #fff5d8;
  color: #e9a700;
}
</style>
