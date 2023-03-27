import { createRouter, createWebHashHistory } from 'vue-router'
import Chat from '@/views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
