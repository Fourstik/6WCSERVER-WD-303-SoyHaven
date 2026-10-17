<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'

let loaded = []
let manageStylesheet
let cancelled = false

function loadLegacyScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src + '?v=' + Date.now()

    s.onload = () => {
      loaded.push(s)
      resolve()
    }

    s.onerror = () => {
      s.remove()
      reject(new Error(`Failed to load ${src}`))
    }

    document.body.appendChild(s)
  })
}

onMounted(async () => {
  // Do not load the admin interface unless a password is saved.
  manageStylesheet = document.createElement('link')
  manageStylesheet.rel = 'stylesheet'
  manageStylesheet.href = '/css/manage.css'
  document.head.appendChild(manageStylesheet)

  try {

    if (cancelled) return

    await loadLegacyScript('/js/manage.js')
  } catch (error) {
    console.error('Could not initialize the admin page:', error)
  }
})

onBeforeUnmount(() => {
  cancelled = true

  loaded.forEach(script => script.remove())
  loaded = []

  if (manageStylesheet) {
    manageStylesheet.remove()
    manageStylesheet = null
  }

  // Legacy manage.js appends notifications directly to document.body.
  // Remove them when leaving Admin so they cannot remain below other pages.
  document.getElementById('successOverlay')?.remove()
  document.getElementById('toastBox')?.remove()
})
</script>

<template>
  <SiteNav />


  <section class="page-hero">
    <div class="page-hero__overlay"></div>
    <img class="page-hero__bg"
      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=70"
      alt="Restaurant interior" />
    <div class="page-hero__content container">
      <p class="hero__eyebrow">Admin Panel</p>
      <h1 class="page-hero__title">Manage Restaurants</h1>
      <p class="page-hero__sub">Add, edit, or remove restaurants.</p>
    </div>
  </section>

  <!-- Only mounted after the router admin guard allows access. -->
  <main class="manage hidden" id="manageMain">
    <div class="container">
      <div class="manage__bar">
        <p class="results__count" id="manageCount">Loading...</p>
        <div class="manage__actions">
          <input type="text" class="manage__search" id="manageSearch" placeholder="Search..." autocomplete="off" />
          <select class="manage__search" id="manageSort" aria-label="Sort restaurants">
            <option value="id-asc">ID (lowest first)</option>
            <option value="id-desc">ID (highest first)</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="rating-desc">Rating (highest first)</option>
            <option value="rating-asc">Rating (lowest first)</option>
          </select>
          <button class="btn btn--primary" id="addBtn" type="button">+ Add restaurant</button>
          <button class="btn btn--ghost" id="logoutBtn" type="button">Log out</button>
        </div>
      </div>

      <p class="manage__message" id="manageMessage" role="status"></p>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>
    </div>
  </main>

  <!-- Add / Edit popup -->
  <div class="modal" id="formModal">
    <div class="modal__box modal__box--wide" role="dialog" aria-modal="true" aria-labelledby="formTitle">
      <h2 class="modal__title" id="formTitle">Add restaurant</h2>
      <form id="restaurantForm" novalidate>
        <div class="form-field">
          <label for="fName">Name</label>
          <input class="modal__input" id="fName" maxlength="80" />
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="fCuisine">Cuisine</label>
            <select class="modal__input" id="fCuisine"></select>
            <input class="modal__input hidden" id="fCuisineOther" maxlength="30" placeholder="(e.g. Thai)"
              style="margin-top:.5rem" />
          </div>
          <div class="form-field">
            <label for="fAddress">Location</label>
            <select class="modal__input" id="fAddress"></select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="fRating">Rating (0–5)</label>
            <input class="modal__input" id="fRating" type="number" min="0" max="5" step="0.1" />
          </div>
          <div class="form-field">
            <label for="fContact">Contact</label>
            <input class="modal__input" id="fContact" maxlength="11" inputmode="numeric" placeholder="09171234567" />
          </div>
        </div>
        <p class="modal__error" id="formError" role="alert"></p>
        <div class="modal__actions">
          <button type="button" class="btn btn--ghost" id="formCancel">Cancel</button>
          <button type="submit" class="btn btn--primary" id="formSave">Save</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete confirmation popup -->
  <div class="modal" id="deleteModal">
    <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="deleteTitle">
      <h2 class="modal__title" id="deleteTitle">Delete restaurant?</h2>
      <p class="modal__text" id="deleteText"></p>
      <p class="modal__error" id="deleteError" role="alert"></p>
      <div class="modal__actions">
        <button type="button" class="btn btn--ghost" id="deleteCancel">Cancel</button>
        <button type="button" class="btn btn--danger" id="deleteConfirm">Delete</button>
      </div>
    </div>
  </div>

  <SiteFooter />
</template>
