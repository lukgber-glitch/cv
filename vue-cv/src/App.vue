<template>
  <div class="app-root">
    <!-- Full-width hero with background video -->
    <section class="hero">
      <video class="hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true" crossorigin="anonymous">
        <!-- Primary: local source served from public based on BASE_URL -->
        <source :src="baseUrl + 'bewerbung_low.mp4'" type="video/mp4" />
        <!-- Fallback: keep 720p remote in case local is missing or blocked -->
        <source src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-while-sitting-on-a-sofa-1051/720p.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>
      <div class="container">
        <header class="header header-hero">
          <h1>Frontend Developer & UI/UX Enthusiast</h1>
          <p class="subheadline">Spezialisiert auf die Entwicklung moderner, responsiver Benutzeroberflächen mit Fokus auf Performance, Usability und Wiederverwendbarkeit.</p>
          <nav>
            <button :class="{ active: currentView === 'cv' }" @click="currentView = 'cv'">
              <i class="ri-file-user-line" aria-hidden="true"></i>
              <span>CV</span>
            </button>
            <button :class="{ active: currentView === 'job' }" @click="currentView = 'job'">
              <i class="ri-briefcase-2-line" aria-hidden="true"></i>
              <span>Job Application</span>
            </button>
          </nav>
        </header>
      </div>
    </section>

    <!-- Content uses the same container width as the header above -->
    <main class="container">
      <CVView v-if="currentView === 'cv'" />
      <JobApplicationView v-else />
    </main>

    <!-- Scroll to Top Button -->
    <button
      v-show="showScrollTop"
      class="scroll-top"
      type="button"
      @click="scrollToTop"
      aria-label="Nach oben scrollen"
    >
      <i class="ri-arrow-up-line" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'

// Lazy-load the top-level views to enable code splitting
const CVView = defineAsyncComponent(() => import('./views/CVView.vue'))
const JobApplicationView = defineAsyncComponent(() => import('./views/JobApplicationView.vue'))

const currentView = ref('cv')

const baseUrl = (import.meta.env?.BASE_URL || './').replace(/\/?$/, '/')

const showScrollTop = ref(false)
let ticking = false

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      showScrollTop.value = window.scrollY > 600
      ticking = false
    })
    ticking = true
  }
}

function scrollToTop() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    window.scrollTo(0, 0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh; /* make hero full viewport height on mobile */
  display: flex;
  align-items: center;
  overflow: hidden; /* ensure bottom is cleanly cropped */
}

@media (min-width: 768px) {
  .hero { height: 460px; }
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top; /* keep top visible, crop more at bottom to mimic efsta */
}

.hero-overlay {
  position: absolute;
  inset: 0;
  /* Darken like efsta to make text readable */
  background: linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.35));
}

.header-hero {
  position: relative;
  /* override default header divider and spacing inside hero */
  border-bottom: 0;
  margin-bottom: 0;
  padding: 2.25rem var(--space-6);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.header-hero h1 { color: #fff; }

/* Subheadline styling inside hero */
.header-hero .subheadline {
  color: rgba(255, 255, 255, 0.92);
  max-width: 980px;
  margin: 0; /* left aligned like efsta */
  line-height: 1.5;
  font-weight: 500;
  font-size: clamp(0.95rem, 0.85rem + 0.6vw, 1.125rem);
}

/* Hero nav buttons: outlined, transparent background like efsta */
.header-hero nav { margin-top: 0.25rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
.header-hero nav button {
  color: #fff;
  border-color: rgba(255,255,255,0.85);
  background: transparent;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
  padding: 0.75rem 1.25rem;
  min-height: 44px; /* larger, like efsta header CTA */
  border-width: 2px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Slightly larger icon inside hero buttons */
.header-hero nav button i { font-size: 1.2em; }

.header-hero nav button:hover,
.header-hero nav button:focus-visible {
  background: rgba(255,255,255,0.12);
  border-color: #ffffff;
}

.header-hero nav button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

/* Scroll-to-top button */
.scroll-top {
  position: fixed;
  right: clamp(0.75rem, 1.5vw, 1rem);
  bottom: clamp(0.75rem, 2vw, 1.25rem);
  z-index: 1001;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: saturate(120%) blur(2px);
  transition: background-color .2s ease, transform .06s ease, opacity .2s ease;
  opacity: 0.96;
}
.scroll-top:hover, .scroll-top:focus-visible { background: rgba(0,0,0,0.75); outline: 3px solid rgba(255,255,255,0.35); outline-offset: 2px; }
.scroll-top:active { transform: translateY(1px); }
.scroll-top i { font-size: 1.25rem; line-height: 1; }
</style>
