<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)
const scrolled = ref(false)
const adminModalOpen = ref(false)
const password = ref('')
const error = ref('')
const submitting = ref(false)
const adminKey = 'soyhaven_admin_pw'

function isUnlocked() {
  return Boolean(sessionStorage.getItem(adminKey))
}

function handleAdminClick() {
  menuOpen.value = false

  if (isUnlocked()) {
    router.push('/admin')
    return
  }

  password.value = ''
  error.value = ''
  adminModalOpen.value = true
}

function closeModal() {
  adminModalOpen.value = false
  error.value = ''
}

async function submitPassword() {
  if (!password.value) {
    error.value = 'Please enter the password.'
    return
  }

  submitting.value = true
  error.value = ''
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'x-admin-password': password.value }
    })

    if (response.ok) {
      sessionStorage.setItem(adminKey, password.value)
      adminModalOpen.value = false
      menuOpen.value = false
      await router.push('/admin')
    } else {
      error.value = response.status === 429
        ? 'Too many failed attempts. Try again in 15 minutes.'
        : 'Incorrect password.'
    }
  } catch {
    error.value = "Couldn't reach the server. Please try again."
  } finally {
    submitting.value = false
  }
}

function onKeydown(event) {
  if (event.key === 'Escape') closeModal()
}

function updateScroll() {
  scrolled.value = route.path !== '/' || window.scrollY > 80
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', updateScroll, { passive: true })
  updateScroll()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }" id="mainNav">
    <RouterLink to="/" class="nav__logo" @click="menuOpen = false">
      <img src="/assets/images/Soyhaven_Logo.png" alt="" class="nav__logo-img" />
      <span class="nav__logo-text"><span class="nav__logo-soy">Soy</span><span class="nav__logo-haven">Haven</span></span>
    </RouterLink>

    <button class="nav__burger" :class="{ 'is-open': menuOpen }" id="burger"
      aria-label="Toggle menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
      <span></span><span></span><span></span>
    </button>

    <ul class="nav__links" :class="{ open: menuOpen }" id="navLinks" role="list">
      <li><RouterLink to="/" class="nav__link" :class="{ active: route.path === '/' }" @click="menuOpen = false">Home</RouterLink></li>
      <li><RouterLink to="/browse" class="nav__link" :class="{ active: route.path === '/browse' }" @click="menuOpen = false">Browse</RouterLink></li>
      <li><RouterLink to="/about" class="nav__link" :class="{ active: route.path === '/about' }" @click="menuOpen = false">About</RouterLink></li>
      <li>
        <a
          href="/admin"
          id="adminLink"
          class="nav__link nav__link--manage"
          :class="{ active: route.path === '/admin' }"
          @click.prevent="handleAdminClick"
        >Admin</a>
      </li>
    </ul>
  </nav>

  <div v-if="adminModalOpen" class="modal is-open" @click.self="closeModal">
    <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="adminModalTitle">
      <h2 class="modal__title" id="adminModalTitle">Admin access</h2>
      <p class="modal__text">Enter the admin password to add, edit, or delete restaurants.</p>
      <form id="adminForm" novalidate @submit.prevent="submitPassword">
        <input v-model="password" type="password" id="adminPassword" class="modal__input"
          placeholder="Password" autocomplete="current-password" />
        <p class="modal__error" id="adminError" role="alert">{{ error }}</p>
        <div class="modal__actions">
          <button type="button" class="btn btn--ghost" id="adminCancel" @click="closeModal">Cancel</button>
          <button type="submit" class="btn btn--primary" id="adminSubmit" :disabled="submitting">
            {{ submitting ? 'Checking...' : 'Unlock' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
