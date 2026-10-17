<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'

let loaded = []

function loadLegacyScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.dataset.legacyScript = src

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

async function ensureSharedScript() {
  const existing = document.querySelector(
    'script[data-legacy-script="/js/shared.js"]'
  )

  if (existing) return

  await loadLegacyScript('/js/shared.js')
}

onMounted(async () => {
  try {
    await ensureSharedScript()
    await loadLegacyScript('/js/home.js')
  } catch (error) {
    console.error('Could not initialize the homepage:', error)
  }
})

onBeforeUnmount(() => {
  loaded.forEach(s => {
    if (s.dataset.legacyScript === '/js/home.js') {
      s.remove()
    }
  })
})
</script>

<template>
  <SiteNav />



  <!-- ══════════════════════════════════════════
        HERO
  ══════════════════════════════════════════ -->
  <section class="hero">
    <div class="hero__overlay"></div>
    <img
      class="hero__bg"
      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=80"
      alt="Delicious food spread"
    />
    <div class="hero__content">
      <p class="hero__eyebrow">Find Dining in Pampanga</p>
      <h1 class="hero__title">
        SoyHaven
      </h1>
      <p class="hero__sub">Mangan Tamu!</p>
      <p class="hero__desc">
        Discover the best restaurants across Angeles City, Clark,
        San Fernando, and Mabalacat. Filtered by cuisine, location, and rating.
      </p>
      <div class="hero__actions">
        <RouterLink to="/browse" class="btn btn--primary">Browse Restaurants</RouterLink>
        <RouterLink to="/about" class="btn btn--outline">Learn More</RouterLink>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true">
      <span>scroll down</span>
      <div class="hero__scroll-line"></div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════
        HOW IT WORKS
  ══════════════════════════════════════════ -->
  <section class="how">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Simple as that</p>
        <h2 class="section-title">How it works</h2>
      </div>
      <div class="how__steps">
        <div class="how__step">
          <div class="how__num">01</div>
          <div class="how__icon">🔍</div>
          <h3 class="how__title">Search and Filter</h3>
          <p class="how__desc">Browse by cuisine type, location, or star rating to narrow down your options.</p>
        </div>
        <div class="how__step">
          <div class="how__num">02</div>
          <div class="how__icon">📍</div>
          <h3 class="how__title">Pick a Spot</h3>
          <p class="how__desc">Find a restaurant that fits your craving. From Filipino classics to Japanese, Korean, and more.</p>
        </div>
        <div class="how__step">
          <div class="how__num">03</div>
          <div class="how__icon">🍽️</div>
          <h3 class="how__title">Kain Na!</h3>
          <p class="how__desc">Get the contact number and head on over. Simple, fast, and local.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════
        TOP RATED
  ══════════════════════════════════════════ -->
  <section class="top-rated">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Highest rated</p>
        <h2 class="section-title">Featured Restaurants</h2>
        <p class="section-sub">The most loved spots across Pampanga right now.</p>
      </div>
      <div class="cards" id="featuredCards">
        <div class="card-skeleton"></div>
        <div class="card-skeleton"></div>
        <div class="card-skeleton"></div>
      </div>
      <div class="section-footer">
        <RouterLink to="/browse" class="btn btn--primary">View All Restaurants</RouterLink>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════
        BROWSE BY CUISINE
  ══════════════════════════════════════════ -->
  <section class="cuisines">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">What are you craving?</p>
        <h2 class="section-title">Browse by Cuisine</h2>
      </div>
      <div class="cuisine-grid">
        <RouterLink to="/browse?cuisine=Filipino" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/philippines.jpg" alt="PH Flag" /></div><span class="cuisine-card__name">Filipino</span></RouterLink>
        <RouterLink to="/browse?cuisine=Japanese" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/japan.jpg" alt="JP Flag" /></div><span class="cuisine-card__name">Japanese</span></RouterLink>
        <RouterLink to="/browse?cuisine=Korean" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/korea.jpg" alt="KR Flag" /></div><span class="cuisine-card__name">Korean</span></RouterLink>
        <RouterLink to="/browse?cuisine=Chinese" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/china.jpg" alt="CN Flag" /></div><span class="cuisine-card__name">Chinese</span></RouterLink>
        <RouterLink to="/browse?cuisine=Italian" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/italy.jpg" alt="IT Flag" /></div><span class="cuisine-card__name">Italian</span></RouterLink>
        <RouterLink to="/browse?cuisine=American" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/america.jpg" alt="US Flag" /></div><span class="cuisine-card__name">American</span></RouterLink>
        <RouterLink to="/browse?cuisine=Mexican" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/mexico.jpg" alt="MX Flag" /></div><span class="cuisine-card__name">Mexican</span></RouterLink>
        <RouterLink to="/browse?cuisine=Indian" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/india.jpg" alt="IN Flag" /></div><span class="cuisine-card__name">Indian</span></RouterLink>
        <RouterLink to="/browse?cuisine=Seafood" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/seafood.jpg" alt="Seafood" /></div><span class="cuisine-card__name">Seafood</span></RouterLink>
        <RouterLink to="/browse?cuisine=Vegetarian" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/vegetarian.jpg" alt="Vegetarian" /></div><span class="cuisine-card__name">Vegetarian</span></RouterLink>
        <RouterLink to="/browse?cuisine=Cafe" class="cuisine-card"><div class="cuisine-card__icon-box"><img src="/assets/images/cuisines/cafe.jpg" alt="Cafe" /></div><span class="cuisine-card__name">Cafe</span></RouterLink>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════
        BROWSE BY LOCATION
  ══════════════════════════════════════════ -->
  <section class="locations">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Where are you?</p>
        <h2 class="section-title">Browse by Location</h2>
      </div>
      
        <div class="location-grid">
          <RouterLink to="/browse?location=Angeles%20City" class="location-card">
            <div class="location-card__bg" style="background-image:url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=70')"></div>
            <div class="location-card__overlay"></div>
            <div class="location-card__content"><h3 class="location-card__name">Angeles City</h3><p class="location-card__sub">The food capital</p></div>
          </RouterLink>

          <RouterLink to="/browse?location=Clark" class="location-card">
            <div class="location-card__bg" style="background-image:url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=70')"></div>
            <div class="location-card__overlay"></div>
            <div class="location-card__content"><h3 class="location-card__name">Clark</h3><p class="location-card__sub">International flavors</p></div>
          </RouterLink>

          <RouterLink to="/browse?location=San%20Fernando" class="location-card">
            <div class="location-card__bg" style="background-image:url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=70')"></div>
            <div class="location-card__overlay"></div>
            <div class="location-card__content"><h3 class="location-card__name">San Fernando</h3><p class="location-card__sub">Local favorites</p></div>
          </RouterLink>

          <RouterLink to="/browse?location=Mabalacat" class="location-card">
            <div class="location-card__bg" style="background-image:url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&auto=format&fit=crop&q=70')"></div>
            <div class="location-card__overlay"></div>
            <div class="location-card__content"><h3 class="location-card__name">Mabalacat</h3><p class="location-card__sub">Hidden gems</p></div>
          </RouterLink>
        </div>

    </div>
  </section>


  <!-- Scripts -->

  <SiteFooter />
</template>
