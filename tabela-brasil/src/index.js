import { createRouter, createWebHistory } from 'vue-router'

import Classificacao from '../views/Classificacao.vue'
import Confrontos from '../views/Confrontos.vue'
import Estatisticas from '../views/Estatisticas.vue'
import MeuTime from '../views/MeuTime.vue'
import Sobre from '../views/Sobre.vue'

const routes = [
  { path: '/', component: Classificacao },
  { path: '/confrontos', component: Confrontos },
  { path: '/estatisticas', component: Estatisticas },
  { path: '/meu-time', component: MeuTime },
  { path: '/sobre', component: Sobre }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router