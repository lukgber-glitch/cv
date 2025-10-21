<template>
  <div class="card" ref="rootEl">
    <h2>Projekte</h2>
    <p v-if="loadError" class="notice">
      Projekte konnten nicht geladen werden. Bitte versuchen Sie es später erneut.
    </p>
    <p v-else-if="allScreenshotsFailed" class="notice">
      Vorschaubilder sind aktuell nicht verfügbar. Die Projekte sind trotzdem unten aufgelistet und verlinkt.
    </p>

    <!-- Placeholder grid while loading the list -->
    <div v-if="loading && projects.length === 0" class="projects-grid placeholders" aria-hidden="true">
      <div v-for="n in 4" :key="n" class="project">
        <div class="thumb">
          <div class="skeleton"></div>
        </div>
        <div class="caption">
          <div class="line w-60"></div>
          <div class="line w-40"></div>
        </div>
      </div>
    </div>

    <div v-else class="projects-grid">
      <!-- Only show projects whose screenshots load successfully (reachable) -->
      <div
        v-for="(project, idx) in projects"
        :key="(project && project.link) ? project.link : idx"
        class="project"
      >
        <a :href="project.link" target="_blank" rel="noopener" class="thumb" :aria-label="`Besuche ${project.name}`">
          <!-- skeleton while loading or until failure -->
          <div class="skeleton" v-show="!status[project.link]?.loaded && !status[project.link]?.failed"></div>
          <!-- show screenshot when available -->
          <img
            v-if="!status[project.link]?.failed"
            :src="currentSrc(project.link)"
            :alt="`Screenshot von ${project.name}`"
            loading="lazy"
            sizes="(min-width: 1024px) 600px, 100vw"
            @load="onLoad(project.link)"
            @error="onImgError(project.link)"
          />
          <!-- fallback when screenshot not available -->
          <div v-else class="fallback" aria-hidden="true">
            <i class="ri-image-line" aria-hidden="true"></i>
            <span>Vorschau nicht verfügbar</span>
          </div>
        </a>
        <div class="caption">
          <h3 class="title">{{ project.name }}</h3>
          <p class="meta">{{ project.period }} – {{ project.role }}</p>
          <a class="visit" :href="project.link" target="_blank" rel="noopener">
            <i class="ri-external-link-line" aria-hidden="true"></i>
            <span>Website öffnen</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted, onBeforeUnmount } from 'vue'

// Lazy-loaded projects data
const projects = ref([])
const loading = ref(false)
const loadError = ref(false)

const rootEl = ref(null)
let io

async function fetchProjects() {
  if (loading.value || projects.value.length) return
  loading.value = true
  loadError.value = false
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 10000)
    const base = (import.meta.env?.BASE_URL || './')
    const url = base.endsWith('/') ? base + 'projects.json' : base + '/projects.json'
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'accept': 'application/json' } })
    clearTimeout(t)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    // basic validation and sanitize
    const valid = Array.isArray(data) ? data.filter(p => p && p.link && p.name) : []
    projects.value = valid
  } catch (e) {
    console.error('Failed to load projects.json', e)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fetchProjects()
          io && io.disconnect()
        }
      })
    }, { threshold: 0.15 })
    if (rootEl.value) io.observe(rootEl.value)
  } else {
    // fallback: fetch immediately
    fetchProjects()
  }
})

onBeforeUnmount(() => { io && io.disconnect() })

// Track load/error states per URL
// { loaded?: boolean, failed?: boolean, src?: string, triedSecondary?: boolean }
const status = reactive({})

function primaryUrl(url) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1000`
}
function secondaryUrl(url) {
  // public screenshot fallback provider
  return `https://image.thum.io/get/width/1000/${encodeURIComponent(url)}`
}

function currentSrc(link) {
  const s = status[link]
  return (s && s.src) ? s.src : primaryUrl(link)
}

function onLoad(link) {
  status[link] = { ...(status[link] || {}), loaded: true, failed: false, src: currentSrc(link) }
}
function onImgError(link) {
  const s = status[link] || {}
  if (!s.triedSecondary) {
    status[link] = { ...s, triedSecondary: true, loaded: false, failed: false, src: secondaryUrl(link) }
  } else {
    status[link] = { ...s, failed: true, loaded: false }
  }
}

const allScreenshotsFailed = computed(() => {
  const total = projects.value.length
  if (total === 0) return false
  let failedCount = 0
  for (const p of projects.value) {
    if (status[p.link]?.failed) failedCount++
  }
  return failedCount === total
})
</script>

<style scoped lang="scss">
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.project {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.thumb {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--border);
  background: #fff;
  opacity: 0.25;
  transition: opacity .25s ease;
}

/* Keep a pleasant aspect ratio for screenshots */
.thumb img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
  filter: grayscale(100%);
  transition: transform .25s ease, filter .25s ease;
}


/* Skeleton placeholder while loading */
.skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.08) 37%, rgba(0,0,0,0.05) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }

.thumb:hover img,
.thumb:focus-visible img { transform: scale(1.02); filter: none; }

.caption {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem 0.5rem;
  align-items: center;
}
.title { margin: 0; font-weight: 600; }
.meta { color: var(--text-muted); grid-column: 1 / -1; }

.visit {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  text-decoration: none;
}
.visit i { font-size: 1rem; color: var(--primary); }
.visit:hover { text-decoration: underline; }

/* Fallback placeholder for unreachable screenshots */
.fallback {
  display: grid;
  place-items: center;
  aspect-ratio: 16/9;
  width: 100%;
  background: #fff;
  color: var(--text-muted);
}
.fallback i { font-size: 1.75rem; color: var(--text-muted); }
.fallback span { font-size: 0.9rem; }

/* Placeholder styling while AJAX is loading */
.placeholders .thumb { opacity: 1; }
.caption .line {
  height: 12px;
  background: rgba(0,0,0,0.08);
  border-radius: 4px;
}
.caption .line + .line { margin-top: 8px; }
.caption .w-60 { width: 60%; }
.caption .w-40 { width: 40%; }

/* Notice when all screenshots fail */
.notice {
  margin: 0 0 var(--space-6) 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Opacity interaction: make each project half opacity, full on hover/focus */
.thumb:hover,
.thumb:focus-visible {
  opacity: 1;
}
</style>
