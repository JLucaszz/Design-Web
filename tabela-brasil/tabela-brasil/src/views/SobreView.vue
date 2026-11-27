<script setup>
const criterios = [
  { numero: '01', titulo: 'Pontos', descricao: 'O principal critério: vitória vale 3 pontos, empate vale 1 e derrota não soma.' },
  { numero: '02', titulo: 'Vitórias', descricao: 'Em caso de igualdade na pontuação, fica à frente quem venceu mais partidas.' },
  { numero: '03', titulo: 'Saldo de gols', descricao: 'Persistindo o empate, comparamos gols marcados menos gols sofridos.' },
  { numero: '04', titulo: 'Gols pró', descricao: 'Se o saldo também for igual, o ataque mais goleador leva vantagem.' }
]
</script>

<template>
  <section class="container page-shell">
    <div class="page-heading">
      <div>
        <span class="eyebrow">Entenda a competição</span>
        <h1 class="page-title">Sobre o campeonato</h1>
        <p class="page-description">
          Um torneio de pontos corridos para você imaginar, simular e decidir os resultados.
        </p>
      </div>
    </div>

    <section class="intro-card card">
      <span class="intro-ball">⚽</span>
      <div>
        <span class="eyebrow">O formato</span>
        <h2>Todos contra todos. Duas vezes.</h2>
        <p>
          Sete clubes disputam o turno e o returno. Cada time enfrenta os outros em casa e fora,
          em uma temporada com 14 rodadas e 42 partidas.
        </p>
      </div>
    </section>

    <div class="about-columns">
      <section class="card rules-card">
        <div class="section-heading">
          <div>
            <h2>Como funciona a pontuação</h2>
            <p>As regras clássicas dos pontos corridos.</p>
          </div>
        </div>
        <div class="points-grid">
          <div class="points-item win">
            <span>Vitória</span>
            <strong>3 <small>pontos</small></strong>
          </div>
          <div class="points-item draw">
            <span>Empate</span>
            <strong>1 <small>ponto</small></strong>
          </div>
          <div class="points-item loss">
            <span>Derrota</span>
            <strong>0 <small>pontos</small></strong>
          </div>
        </div>
        <div class="scoring-note">
          <span>↗</span>
          A classificação é atualizada automaticamente a cada placar completo.
        </div>
      </section>

      <section class="card criteria-card">
        <div class="section-heading">
          <div>
            <h2>Critérios de desempate</h2>
            <p>Aplicados nesta ordem, do primeiro ao quarto.</p>
          </div>
        </div>
        <ol class="criteria-list">
          <li v-for="criterio in criterios" :key="criterio.numero">
            <span class="criteria-number">{{ criterio.numero }}</span>
            <div><strong>{{ criterio.titulo }}</strong><p>{{ criterio.descricao }}</p></div>
          </li>
        </ol>
      </section>
    </div>

    <p class="about-footnote">Projeto de simulação independente e sem vínculo com as competições oficiais.</p>
  </section>
</template>

<style scoped>
.intro-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px;
}

.intro-ball {
  display: grid;
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  place-items: center;
  border-radius: 21px;
  background: var(--green-soft);
  font-size: 32px;
}

.intro-card .eyebrow {
  margin-bottom: 7px;
}

.intro-card h2 {
  margin: 0 0 7px;
  font-family: Manrope, sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.intro-card p {
  max-width: 720px;
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.65;
}

.about-columns {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  align-items: start;
  gap: 14px;
  margin-top: 14px;
}

.rules-card,
.criteria-card {
  overflow: hidden;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  padding: 17px;
}

.points-item {
  display: grid;
  gap: 8px;
  padding: 13px 10px;
  border-radius: 11px;
  background: #f8faf8;
}

.points-item span {
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
}

.points-item strong {
  color: var(--ink);
  font-family: Manrope, sans-serif;
  font-size: 20px;
  font-weight: 800;
}

.points-item strong small {
  font-family: 'DM Sans', sans-serif;
  color: var(--muted);
  font-size: 9px;
  font-weight: 600;
}

.points-item.win {
  background: #eff7f0;
}

.points-item.win strong {
  color: var(--green-dark);
}

.scoring-note {
  display: flex;
  gap: 7px;
  padding: 0 18px 18px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.scoring-note span {
  color: var(--green);
}

.criteria-list {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0 19px;
  list-style: none;
}

.criteria-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid var(--line-soft);
}

.criteria-list li:last-child {
  border-bottom: 0;
}

.criteria-number {
  display: grid;
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 8px;
  background: #f1f6f1;
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
}

.criteria-list li div {
  padding-top: 2px;
}

.criteria-list strong {
  color: var(--ink);
  font-size: 11px;
}

.criteria-list p {
  margin: 3px 0 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.about-footnote {
  margin: 16px 0 0;
  color: var(--muted-light);
  font-size: 10px;
  text-align: center;
}

@media (max-width: 760px) {
  .about-columns {
    grid-template-columns: 1fr;
  }

  .intro-card {
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .intro-ball {
    width: 52px;
    height: 52px;
    border-radius: 15px;
    font-size: 24px;
  }

  .intro-card h2 {
    font-size: 18px;
  }
}
</style>
