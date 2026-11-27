import { createRouter, createWebHistory } from 'vue-router'
import ClassificacaoView from '../views/ClassificacaoView.vue'
import RodadasView from '../views/RodadasView.vue'
import EstatisticasView from '../views/EstatisticasView.vue'
import FavoritosView from '../views/FavoritosView.vue'
import SobreView from '../views/SobreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'classificacao', component: ClassificacaoView },
    { path: '/rodadas', name: 'rodadas', component: RodadasView },
    { path: '/estatisticas', name: 'estatisticas', component: EstatisticasView },
    { path: '/favoritos', name: 'favoritos', component: FavoritosView },
    { path: '/sobre', name: 'sobre', component: SobreView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
