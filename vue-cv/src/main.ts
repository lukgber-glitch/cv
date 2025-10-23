import './assets/main.css'
import './assets/theme.scss'

import { createApp, nextTick } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// Smooth scroll fallback for mobile browsers where CSS scroll-behavior may be unreliable
// Intercept in-page anchor clicks and use scrollIntoView with behavior: 'smooth'.
// Respects prefers-reduced-motion and avoids interfering with external links.
const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    // Find nearest anchor
    const anchor = target.closest && (target.closest('a[href^="#"]') as HTMLAnchorElement | null)
    if (!anchor) return
    const href = anchor.getAttribute('href') || ''
    if (href.length <= 1) return
    const id = decodeURIComponent(href.slice(1))
    const el = document.getElementById(id)
    if (!el) return
    // Same-page only
    if (anchor.pathname !== location.pathname || anchor.host !== location.host) return
    e.preventDefault()
    // Ensure layout is ready (especially after Vue updates)
    nextTick(() => {
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } catch {
        // Fallback plain jump if smooth not supported
        el.scrollIntoView()
      }
      // Update hash without extra jump
      history.pushState(null, '', '#' + id)
    })
  }, { capture: true })
}
