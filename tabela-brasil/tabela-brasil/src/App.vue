<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main class="app-main">
    <RouterView />
  </main>
  <footer class="site-footer">
    <div class="container footer-content">
      <span>Tabela Brasil <span class="footer-dot">●</span> Simule do seu jeito.</span>
      <span>Feito para quem vive futebol.</span>
    </div>
  </footer>
</template>

<style scoped>
.app-main {
  min-height: calc(100vh - 150px);
}

.site-footer {
  border-top: 1px solid var(--line);
  background: #fff;
}

.footer-content {
  display: flex;
  min-height: 65px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--muted);
  font-size: 11px;
}

.footer-dot {
  padding: 0 4px;
  color: var(--green);
  font-size: 7px;
}

@media (max-width: 520px) {
  .footer-content {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }
}
</style>
