<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', label: 'Classificação', icon: '▤' },
  { to: '/rodadas', label: 'Rodadas', icon: '◷' },
  { to: '/estatisticas', label: 'Estatísticas', icon: '▥' },
  { to: '/favoritos', label: 'Meu time', icon: '★' },
  { to: '/sobre', label: 'Sobre', icon: 'ⓘ' }
]
</script>

<template>
  <header class="site-header">
    <div class="container header-content">
      <RouterLink class="brand" to="/" aria-label="Tabela Brasil, início">
        <span class="brand-mark">TB</span>
        <span class="brand-copy">
          <strong>TABELA<span>BRASIL</span></strong>
          <small>SEU CAMPEONATO, SUAS REGRAS</small>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navegação principal">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :aria-label="link.label"
        >
          <span class="nav-icon" aria-hidden="true">{{ link.icon }}</span>
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid var(--line);
  background: rgb(255 255 255 / 94%);
  backdrop-filter: blur(14px);
}

.header-content {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--ink);
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 13px;
  background: var(--green);
  color: white;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: -1px;
}

.brand-copy {
  display: grid;
  gap: 2px;
}

.brand-copy strong {
  font-size: 16px;
  letter-spacing: -0.5px;
}

.brand-copy strong span {
  color: var(--green);
}

.brand-copy small {
  color: var(--muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-radius: 9px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 650;
  text-decoration: none;
  transition: color 160ms ease, background 160ms ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background: var(--green-soft);
  color: var(--green-dark);
}

.nav-icon {
  font-size: 15px;
}

@media (max-width: 760px) {
  .header-content {
    min-height: 68px;
    flex-wrap: wrap;
    gap: 0;
    padding-top: 10px;
  }

  .main-nav {
    width: calc(100% + 32px);
    overflow-x: auto;
    margin: 0 -16px;
    padding: 6px 16px 10px;
    scrollbar-width: none;
  }

  .main-nav::-webkit-scrollbar {
    display: none;
  }

  .nav-link {
    flex: 0 0 auto;
    padding-inline: 10px;
    font-size: 12px;
  }
}
</style>
