<template>
  <div class="card interests-card">
    <h2>Interessen</h2>
    <p>
      Sohnemann, Mastering (Audio), Produktion (Audio), Videobearbeitung, Programmieren, Alles rund um die Kernsanierung.
    </p>

    <!-- Transcript trigger at the bottom of the card -->
    <div class="transcript-cta">
      <button type="button" class="transcript-btn" @click="openOverlay" aria-label="Zeugnisse öffnen">
        <i class="ri-file-text-line" aria-hidden="true"></i>
        <span>Zeugnisse</span>
      </button>
    </div>

    <!-- Image overlay (modeled after the quote/PDF overlay) -->
    <transition name="modal-fade">
      <div
        v-if="showOverlay"
        class="img-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="img-overlay-title"
        @click.self="closeOverlay"
      >
        <div class="img-dialog" ref="dialogEl" tabindex="-1">
          <div class="img-header">
            <h3 id="img-overlay-title">Zeugnisse</h3>
            <button type="button" class="close" @click="closeOverlay" aria-label="Overlay schließen" ref="closeBtnEl">
              <i class="ri-close-line" aria-hidden="true"></i>
            </button>
          </div>
          <div class="img-body">
            <!-- Show three images in a scrollable column; try fallback path if first fails -->
            <img :src="srcs.mediendesign" alt="Zeugnis Mediendesign" loading="lazy" @error="onImgError('mediendesign')" />
            <img :src="srcs.medientechnik" alt="Zeugnis Medientechnik" loading="lazy" @error="onImgError('medientechnik')" />
            <img :src="srcs.ittechnik" alt="Zeugnis IT-Technik" loading="lazy" @error="onImgError('ittechnik')" />
            <p v-if="allFailed" class="img-notice">Bilder konnten nicht geladen werden. Bitte Seite neu laden oder später erneut versuchen.</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, reactive, computed } from 'vue'

const showOverlay = ref(false)
const dialogEl = ref(null)
const closeBtnEl = ref(null)
let openerEl = null

const baseUrl = (import.meta.env?.BASE_URL || './').replace(/\/?$/, '/')

// Prepare dynamic sources with fallbacks (root and assets/)
const srcs = reactive({
  // Prefer assets/ first because deployment always publishes /assets; root-level images may be absent
  mediendesign: baseUrl + 'assets/zeugnis-mediendesign-002.jpg',
  medientechnik: baseUrl + 'assets/zeugnis-medientechnik-001.jpg',
  ittechnik: baseUrl + 'assets/it-technik-001.jpg',
})
const failures = reactive({ mediendesign: 0, medientechnik: 0, ittechnik: 0 })
const allFailed = computed(() => failures.mediendesign > 1 && failures.medientechnik > 1 && failures.ittechnik > 1)

function onImgError(key) {
  failures[key]++
  const file = key === 'mediendesign' ? 'zeugnis-mediendesign-002.jpg' : key === 'medientechnik' ? 'zeugnis-medientechnik-001.jpg' : 'it-technik-001.jpg'

  // 1) First fallback: try assets/ in case images were emitted there
  if (failures[key] === 1) {
    const url = baseUrl + 'assets/' + file
    srcs[key] = url
    console.debug('[Interests] image fallback #1 →', key, url)
    return
  }

  // 2) Second fallback: resolve against current document base URI
  if (failures[key] === 2) {
    try {
      const url = new URL(file, document.baseURI).toString()
      srcs[key] = url
      console.debug('[Interests] image fallback #2 →', key, url)
      return
    } catch {}
  }

  // 3) Additional case-variant fallbacks for potential filename case issues on GitHub Pages (case-sensitive)
  if (key === 'mediendesign' && failures[key] === 3) {
    const url = baseUrl + 'Zeugnis-mediendesign-002.jpg'
    srcs[key] = url
    console.debug('[Interests] image fallback #3 (case variant) →', key, url)
    return
  }
  if (key === 'mediendesign' && failures[key] === 4) {
    const url = baseUrl + 'Zeugnis-Mediendesign-002.jpg'
    srcs[key] = url
    console.debug('[Interests] image fallback #4 (case variant) →', key, url)
    return
  }
}

function openOverlay(e) {
  openerEl = e && e.currentTarget ? e.currentTarget : null
  showOverlay.value = true
  document.documentElement.style.overflow = 'hidden'
  nextTick(() => {
    (closeBtnEl.value || dialogEl.value)?.focus()
  })
}

function closeOverlay() {
  showOverlay.value = false
  document.documentElement.style.overflow = ''
  if (openerEl && typeof openerEl.focus === 'function') openerEl.focus()
}

function getFocusable() {
  const root = dialogEl.value
  if (!root) return []
  const nodes = root.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
  )
  return Array.from(nodes).filter((el) => el.offsetParent !== null)
}

function onKeydown(e) {
  if (!showOverlay.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    closeOverlay()
    return
  }
  if (e.key === 'Tab') {
    const focusables = getFocusable()
    if (focusables.length === 0) return
    const current = document.activeElement
    let idx = focusables.indexOf(current)
    if (e.shiftKey) {
      idx = idx <= 0 ? focusables.length - 1 : idx - 1
    } else {
      idx = idx === focusables.length - 1 ? 0 : idx + 1
    }
    e.preventDefault()
    focusables[idx].focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.interests-card p { margin: 0 0 var(--space-4); }

.transcript-cta {
  margin-top: var(--space-4);
}

.transcript-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 0.5rem 0.75rem;
}

.transcript-btn i { font-size: 1.1rem; color: var(--primary); }

/* Overlay styles modeled after ApplicationForm modal */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .img-dialog { transform: scale(0.98); }
.modal-fade-enter-active .img-dialog, .modal-fade-leave-active .img-dialog { transition: transform .2s ease; }

.img-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000; /* ensure above any other content */
  padding: 2rem;
}

.img-dialog {
  background: #fff;
  width: min(96vw, 1100px);
  height: min(90vh, 820px);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

.img-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
}
.img-header h3 { margin: 0; color: var(--text); font-weight: 600; }
.img-header .close { background: transparent; border: 0; padding: 0.25rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; }
.img-header .close i { font-size: 1.25rem; color: var(--text); }

.img-body { flex: 1; overflow: auto; padding: 1rem; }
.img-body img { display: block; max-width: 100%; height: auto; margin: 0 auto 1rem; border: 1px solid var(--border); }
.img-body img:last-child { margin-bottom: 0; }

.img-notice { color: var(--text-muted); text-align: center; margin: 0.5rem 0 0; }

@media (max-width: 400px) {
  .img-overlay { padding: 1rem; }
  .img-dialog { width: 96vw; height: 88vh; }
}
</style>
