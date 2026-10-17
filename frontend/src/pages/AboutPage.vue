<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'

let loaded = []
let aboutStylesheet

function loadLegacyScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src + '?v=' + Date.now()
    s.onload = () => {
      loaded.push(s)
      resolve()
    }
    s.onerror = reject
    document.body.appendChild(s)
  })
}

onMounted(async () => {
  aboutStylesheet = document.createElement('link')
  aboutStylesheet.rel = 'stylesheet'
  aboutStylesheet.href = '/css/about_styles.css'
  document.head.appendChild(aboutStylesheet)

  await Promise.all([
    // Add About page scripts here if needed.
  ])
})

onBeforeUnmount(() => {
  loaded.forEach(s => s.remove())

  if (aboutStylesheet) {
    aboutStylesheet.remove()
  }
})
</script>

<template>
  <SiteNav />


  <!-- ══════════════════════════════════════════
       ANIMATED GRADIENT HERO
  ══════════════════════════════════════════ -->
  <section class="about-hero">
    <div class="about-hero__content">
      <h1 class="about-hero__title">About <em>SoyHaven</em></h1>
      <p class="about-hero__sub">
        Get to know more about our 6WCSERVER project. Read about how we got the name, why we made it the way it is, the tech stack we've used to create it, and the developers behind it all.
      </p>
    </div>
  </section>

  <!-- ══════════════════════════════════════════
       WHAT IS SOYHAVEN & WHY WE BUILT THIS (SPLIT)
  ══════════════════════════════════════════ -->
  <section class="about-what">
    <div class="container">
      <div class="about-split-grid">
        
        <!-- Left: What is SoyHaven -->
        <div class="about-what__card">
          <p class="about-what__label">What is SoyHaven?</p>
          <h2 class="about-what__title">Make 'Find Dining' Easy.</h2>
          <p class="about-what__text">
            SoyHaven is a MongoDB-powered restaurant finder designed specifically for diners across Angeles City, Clark, San Fernando, and Mabalacat. The name starts with “soy,” a Kapampangan term of address for a friend or companion, much like “pre,” “pare,” or “tol.” Add “haven,” a place where you feel at home, and SoyHaven becomes the spot a friend points you to when you ask, “Where should we eat?”
          </p>
          <p class="about-what__text">
            Whatever you’re craving for, SoyHaven helps you find exactly where to go, filtered by cuisine, location, and rating.
          </p>
        </div>

        <!-- Right: Why We Built This -->
        <div class="about-why-card">
          <p class="about-what__label" style="color: var(--amber-300);">Our motivation</p>
          <h2 class="about-what__title" style="color: var(--white);">Why we built this</h2>
          <p class="about-why-card__text">
            In Pampanga, food is rarely a solo decision. Ask a Kapampangan where to eat and the answer usually starts with a friend: “Soy, try this place.” Those tips travel through barkada group chats and word of mouth, which is what makes them trustworthy, and also what makes them hard to find if you’re new in town or just don’t know the right person. We wanted to put that same feeling in one place. Soyhaven is our answer: a simple, fast, locally-focused directory that works like a good friend with great taste, pointing you to Pampanga’s best dining spots without the guesswork.
          </p>
          <blockquote class="about-why-card__quote">
            "Soy, nokarin tamu mangan? — the question every Kapampangan asks a friend."
          </blockquote>
        </div>

      </div>
    </div>
  </section>

<!-- ══════════════════════════════════════════
       TECH STACK (Animated Dark Theme)
  ══════════════════════════════════════════ -->
  <section class="about-tech">
    <div class="tech-bg-mesh"></div>
    <div class="container tech-container">
      <div class="section-header">
        <p class="section-eyebrow">Under the hood</p>
        <h2 class="section-title tech-title">The tech behind SoyHaven</h2>
      </div>
      <div class="tech-grid">
        <div class="tech-card">
          <div class="tech-card__icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg" alt="" aria-hidden="true" />
          </div>
          <div class="tech-card__name">MongoDB</div>
          <div class="tech-card__desc">NoSQL database storing all restaurant records as JSON documents</div>
        </div>
        <div class="tech-card">
          <div class="tech-card__icon tech-card__icon--light">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/express/express-original.svg" alt="" aria-hidden="true" />
          </div>
          <div class="tech-card__name">Express.js</div>
          <div class="tech-card__desc">Backend framework handling API routes and CRUD operations</div>
        </div>
        <div class="tech-card">
          <div class="tech-card__icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/vuejs/vuejs-original.svg" alt="" aria-hidden="true" />
          </div>
          <div class="tech-card__name">Vue.js</div>
          <div class="tech-card__desc">Component-based frontend with reactive filtering, search, and live restaurant data</div>
        </div>
        <div class="tech-card">
          <div class="tech-card__icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg" alt="" aria-hidden="true" />
          </div>
          <div class="tech-card__name">Node.js</div>
          <div class="tech-card__desc">Runtime environment running the Express server and connecting to MongoDB</div>
        </div>
        <div class="tech-card">
          <div class="tech-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#f0c850" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </div>
          <div class="tech-card__name">MongoDB Atlas</div>
          <div class="tech-card__desc">Cloud database hosting for live deployment and remote data access</div>
        </div>
        <div class="tech-card">
          <div class="tech-card__icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/vitejs/vitejs-original.svg" alt="" aria-hidden="true" />
          </div>
          <div class="tech-card__name">Vite</div>
          <div class="tech-card__desc">Fast build tool and dev server powering the Vue frontend with instant hot reloads</div>
        </div>
      </div>
    </div>
  </section>

<!-- ══════════════════════════════════════════
       THE TEAM SECTION
  ══════════════════════════════════════════ -->
  <section class="about-team">
    <div class="team-bg-glow"></div>
    <div class="container team-container">
      <div class="section-header">
        <p class="section-eyebrow">The people behind it</p>
        <h2 class="section-title">Meet the team</h2>
        <p class="section-sub">The minds dedicated to bringing SoyHaven to life for every hungry Kapampangan.</p>
      </div>
      <div class="team-grid">
        
        <!-- Member 1: JAM -->
        <div class="team-card">
          <div class="team-card__glow"></div>
          <div class="team-card__avatar">
            <img src="/assets/images/team/JAM.png" alt="James Picture" />
          </div>
          <p class="team-card__nickname">"JAM"</p>
          <h3 class="team-card__name">Almariego, James Michael E.</h3>
          <p class="team-card__role">Vue.js Developer & Frontend Contributor</p>
        </div>

        <!-- Member 2: Fourstik -->
        <div class="team-card">
          <div class="team-card__glow"></div>
          <div class="team-card__avatar">
            <img src="/assets/images/team/FOURSTIK.png" alt="Incognito Picture" />
          </div>
          <p class="team-card__nickname">"Fourstik"</p>
          <h3 class="team-card__name">Incognito, Rich Cristoff C.</h3>
          <p class="team-card__role">Project Leader & Backend Developer</p>
        </div>

        <!-- Member 3: Don Mel -->
        <div class="team-card">
          <div class="team-card__glow"></div>
          <div class="team-card__avatar">
            <img src="/assets/images/team/MEL.png" alt="Jose Picture" />
          </div>
          <p class="team-card__nickname">"Don Mel"</p>
          <h3 class="team-card__name">Jose, Adrian Meldrich C.</h3>
          <p class="team-card__role">UI/UX Lead & Creative Director</p>
        </div>

        <!-- Member 4: D3 -->
        <div class="team-card">
          <div class="team-card__glow"></div>
          <div class="team-card__avatar">
            <img src="/assets/images/team/D3.png" alt="Montoya Picture" />
          </div>
          <p class="team-card__nickname">"D3"</p>
          <h3 class="team-card__name">Montoya, Dohn Diehllon Djan D.</h3>
          <p class="team-card__role">Systems Analyst & QA</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════
       FOOTER
  ══════════════════════════════════════════ -->

  <!-- Shared component script -->

  <SiteFooter />
</template>
