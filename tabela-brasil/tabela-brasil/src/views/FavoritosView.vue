<script setup>
import { computed } from 'vue'
import { useFavoritosStore } from '../stores/favoritosStore'
import { useRodadasStore } from '../stores/rodadasStore'
import { useTabelaStore } from '../stores/tabelaStore'
import { carregarEscudo } from '../utils/escudos'

const favoritosStore = useFavoritosStore()
const rodadasStore = useRodadasStore()
const tabelaStore = useTabelaStore()

const time = computed(() =>
  tabelaStore.classificacao.find((item) => item.id === favoritosStore.timeId)
)
const partidasDoTime = computed(() =>
  rodadasStore.rodadas
    .flatMap((rodada) =>
      rodada.partidas
        .filter((partida) =>
          (partida.mandante === favoritosStore.timeId || partida.visitante === favoritosStore.timeId) &&
          partida.golsMandante !== null &&
          partida.golsVisitante !== null
        )
        .map((partida) => ({ ...partida, rodada: rodada.numero }))
    )
    .sort((a, b) => b.rodada - a.rodada)
)
const aproveitamento = computed(() =>
  time.value.jogos ? Math.round((time.value.pontos / (time.value.jogos * 3)) * 100) : 0
)

function nomeTime(id) {
  return rodadasStore.times.find((clube) => clube.id === id)?.nome ?? 'Time'
}

function resultado(partida) {
  const golsPro = partida.mandante === time.value.id ? partida.golsMandante : partida.golsVisitante
  const golsContra = partida.mandante === time.value.id ? partida.golsVisitante : partida.golsMandante
  if (golsPro > golsContra) return { texto: 'Vitória', classe: 'win' }
  if (golsPro < golsContra) return { texto: 'Derrota', classe: 'loss' }
  return { texto: 'Empate', classe: 'draw' }
}
</script>

<template>
  <section class="container page-shell">
    <div class="page-heading">
      <div>
        <span class="eyebrow">Paixão que não se explica</span>
        <h1 class="page-title">Meu time do coração</h1>
        <p class="page-description">Uma área especial para acompanhar de perto o seu clube.</p>
      </div>
      <label class="team-picker">
        <span>Trocar meu time</span>
        <select
          :value="favoritosStore.timeId"
          aria-label="Selecionar time favorito"
          @change="favoritosStore.selecionarTime($event.target.value)"
        >
          <option v-for="clube in rodadasStore.times" :key="clube.id" :value="clube.id">
            {{ clube.nome }}
          </option>
        </select>
      </label>
    </div>

    <section class="favorite-hero card">
      <div class="hero-club">
        <div class="hero-crest-wrap">
          <img :src="carregarEscudo(time.escudo)" :alt="`Escudo do ${time.nome}`">
        </div>
        <div>
          <span class="favorite-label"><span>★</span> MEU TIME</span>
          <h2>{{ time.nome }}</h2>
          <p>{{ time.posicao }}º colocado <span>·</span> {{ time.pontos }} pontos</p>
        </div>
      </div>
      <div class="hero-rank">
        <span>POSIÇÃO ATUAL</span>
        <strong>{{ String(time.posicao).padStart(2, '0') }}<small>º</small></strong>
      </div>
    </section>

    <div class="favorite-stats">
      <article class="card favorite-stat">
        <span>Pontos</span>
        <strong>{{ time.pontos }}</strong>
        <small>em {{ time.jogos }} jogos</small>
      </article>
      <article class="card favorite-stat">
        <span>Aproveitamento</span>
        <strong>{{ aproveitamento }}<small>%</small></strong>
        <div class="progress-track"><i :style="{ width: `${aproveitamento}%` }"></i></div>
      </article>
      <article class="card favorite-stat">
        <span>Saldo de gols</span>
        <strong>{{ time.saldoGols > 0 ? `+${time.saldoGols}` : time.saldoGols }}</strong>
        <small>{{ time.golsPro }} pró · {{ time.golsContra }} contra</small>
      </article>
      <article class="card favorite-stat">
        <span>Campanha</span>
        <strong class="record">{{ time.vitorias }}V <i>·</i> {{ time.empates }}E <i>·</i> {{ time.derrotas }}D</strong>
        <small>vitórias, empates e derrotas</small>
      </article>
    </div>

    <section class="card history-card">
      <div class="section-heading">
        <div>
          <h2>Últimos resultados</h2>
          <p>Histórico das partidas já disputadas pelo {{ time.nome }}.</p>
        </div>
        <span class="history-count">{{ partidasDoTime.length }} jogos</span>
      </div>
      <div v-if="partidasDoTime.length" class="history-list">
        <article v-for="partida in partidasDoTime.slice(0, 6)" :key="partida.id" class="history-row">
          <span class="history-round">{{ partida.rodada }}ª rodada</span>
          <span class="opponent">
            <span>{{ partida.mandante === time.id ? 'vs.' : '@' }}</span>
            {{ nomeTime(partida.mandante === time.id ? partida.visitante : partida.mandante) }}
          </span>
          <strong class="history-score">
            {{ partida.golsMandante }} <span>–</span> {{ partida.golsVisitante }}
          </strong>
          <span class="result-pill" :class="resultado(partida).classe">{{ resultado(partida).texto }}</span>
        </article>
      </div>
      <div v-else class="history-empty">
        <span>⚽</span>
        <strong>A temporada está só começando</strong>
        <p>Quando você preencher os placares, os resultados do {{ time.nome }} aparecem aqui.</p>
      </div>
    </section>
  </section>
</template>

<style scoped>
.team-picker {
  display: grid;
  gap: 5px;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
}

.team-picker select {
  min-width: 165px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: white;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
}

.favorite-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  overflow: hidden;
  padding: 25px 30px;
  background: linear-gradient(110deg, #fff 47%, #f0f7f1 100%);
}

.hero-club {
  display: flex;
  align-items: center;
  gap: 20px;
}

.hero-crest-wrap {
  display: grid;
  width: 92px;
  height: 92px;
  place-items: center;
  border: 1px solid #e6efe7;
  border-radius: 24px;
  background: #fff;
}

.hero-crest-wrap img {
  width: 60px;
  height: 68px;
  object-fit: contain;
}

.favorite-label {
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.1px;
}

.favorite-label span {
  margin-right: 4px;
  color: #e9a700;
  font-size: 14px;
}

.hero-club h2 {
  margin: 5px 0 3px;
  font-family: Manrope, sans-serif;
  font-size: clamp(24px, 4vw, 33px);
  font-weight: 800;
  letter-spacing: -1px;
}

.hero-club p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.hero-club p span {
  padding-inline: 5px;
  color: #c1c9c1;
}

.hero-rank {
  display: grid;
  justify-items: end;
  gap: 2px;
}

.hero-rank > span {
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.9px;
}

.hero-rank strong {
  color: var(--green-dark);
  font-family: Manrope, sans-serif;
  font-size: 53px;
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.1;
}

.hero-rank small {
  font-size: 17px;
  letter-spacing: 0;
}

.favorite-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.favorite-stat {
  display: grid;
  min-height: 125px;
  align-content: start;
  gap: 6px;
  padding: 17px;
}

.favorite-stat > span {
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
}

.favorite-stat > strong {
  color: var(--ink);
  font-family: Manrope, sans-serif;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -1px;
}

.favorite-stat > strong small {
  margin-left: 2px;
  color: var(--muted);
  font-size: 14px;
}

.favorite-stat > small {
  color: var(--muted-light);
  font-size: 9px;
}

.favorite-stat .record {
  font-size: 18px;
  letter-spacing: 0;
}

.record i {
  color: #c6d0c7;
  font-style: normal;
}

.progress-track {
  height: 5px;
  overflow: hidden;
  margin-top: 1px;
  border-radius: 5px;
  background: #e9eee9;
}

.progress-track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--green);
  transition: width 180ms ease;
}

.history-card {
  overflow: hidden;
  margin-top: 14px;
}

.history-count {
  padding: 7px 10px;
  border-radius: 8px;
  background: #f3f6f3;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
}

.history-row {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) 85px 82px;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 0 22px;
  border-bottom: 1px solid var(--line-soft);
}

.history-row:last-child {
  border-bottom: 0;
}

.history-round {
  color: var(--muted-light);
  font-size: 10px;
}

.opponent {
  overflow: hidden;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.opponent span {
  margin-right: 5px;
  color: var(--muted-light);
  font-weight: 500;
}

.history-score {
  color: var(--ink);
  font-size: 13px;
  text-align: center;
}

.history-score span {
  padding-inline: 3px;
  color: #aab3ab;
}

.result-pill {
  justify-self: end;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 800;
}

.result-pill.win {
  background: #eaf5ed;
  color: var(--green-dark);
}

.result-pill.draw {
  background: #f2f3ed;
  color: #83845f;
}

.result-pill.loss {
  background: #fbefed;
  color: #b94b40;
}

.history-empty {
  display: grid;
  min-height: 190px;
  align-content: center;
  justify-items: center;
  gap: 7px;
  padding: 25px;
  text-align: center;
}

.history-empty > span {
  font-size: 25px;
}

.history-empty strong {
  color: var(--ink);
  font-size: 13px;
}

.history-empty p {
  max-width: 320px;
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
}

@media (max-width: 760px) {
  .favorite-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 540px) {
  .favorite-hero {
    padding: 18px;
  }

  .hero-club {
    gap: 12px;
  }

  .hero-crest-wrap {
    width: 65px;
    height: 65px;
    border-radius: 17px;
  }

  .hero-crest-wrap img {
    width: 43px;
    height: 49px;
  }

  .hero-rank strong {
    font-size: 38px;
  }

  .history-row {
    grid-template-columns: 59px minmax(0, 1fr) 58px 63px;
    gap: 5px;
    padding-inline: 12px;
  }

  .history-round {
    font-size: 9px;
  }
}
</style>
