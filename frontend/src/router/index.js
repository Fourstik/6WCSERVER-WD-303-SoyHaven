import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BrowsePage from '../pages/BrowsePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import AdminPage from '../pages/AdminPage.vue'

const ADMIN_KEY = 'soyhaven_admin_pw'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/browse', component: BrowsePage },
    { path: '/about', component: AboutPage },
    { path: '/admin', component: AdminPage, meta: { requiresAdmin: true } },
    { path: '/manage', redirect: '/admin' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAdmin && !sessionStorage.getItem(ADMIN_KEY)) {
    return { path: '/', query: { adminLogin: '1' } }
  }
})

export default router
