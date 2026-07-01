import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import UploadView from '@/views/UploadView.vue'
import PaperListView from '@/views/PaperListView.vue'
import PaperDetailView from '@/views/PaperDetailView.vue'
import SearchView from '@/views/SearchView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/upload', name: 'upload', component: UploadView },
    { path: '/papers', name: 'papers', component: PaperListView },
    { path: '/papers/:id', name: 'paper-detail', component: PaperDetailView, props: true },
    { path: '/search', name: 'search', component: SearchView },
    { path: '/chat', name: 'chat', component: ChatView }
  ]
})

export default router
