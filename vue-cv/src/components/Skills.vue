<template>
  <div class="card" ref="sectionEl">
    <h2>Fähigkeiten</h2>
    <div class="skills-grid">
      <div v-for="skill in computedSkills" :key="skill.name" class="skill">
        <div class="left">
          <i :class="['ri-fw', skill.icon]" aria-hidden="true"></i>
          <span class="name">{{ skill.name }}</span>
        </div>
        <div class="right">
          <div class="progress" :aria-label="`${skill.name} ${skill.level}`" role="progressbar"
               :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="animated ? skill.percent : 0">
            <div class="bar" :style="{ width: (animated ? skill.percent : 0) + '%' }"></div>
          </div>
          <span class="percent">{{ skill.percent }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const rawSkills = [
  { name: 'Bootstrap', level: 'Ausgezeichnet' },
  { name: 'CSS', level: 'Ausgezeichnet' },
  { name: 'HTML/XHTML', level: 'Ausgezeichnet' },
  { name: 'Illustrator', level: 'Ausgezeichnet' },
  { name: 'Indesign', level: 'Ausgezeichnet' },
  { name: 'Photoshop', level: 'Ausgezeichnet' },
  { name: 'SCSS', level: 'Ausgezeichnet' },
  { name: 'JavaScript', level: 'Fortgeschritten' },
  { name: 'jQuery', level: 'Fortgeschritten' },
  { name: 'Magento', level: 'Fortgeschritten' },
  { name: 'TYPO3', level: 'Fortgeschritten' },
  { name: 'UI UX', level: 'Fortgeschritten' },
  { name: 'Angular', level: 'Basiswissen' },
  { name: 'Markup', level: 'Basiswissen' },
  { name: 'mySQL', level: 'Basiswissen' },
  { name: 'PHP', level: 'Basiswissen' },
  { name: 'Python', level: 'Basiswissen' },
  { name: 'View', level: 'Basiswissen' },
  { name: 'Wordpress', level: 'Basiswissen' }
]

// Map textual level to a percentage for the progress bar
const levelToPercent = (level) => {
  switch ((level || '').toLowerCase()) {
    case 'ausgezeichnet':
      return 95
    case 'fortgeschritten':
      return 75
    case 'basiswissen':
      return 50
    default:
      return 60
  }
}

// Map skill name to a Remix Icon name
const iconFor = (name) => {
  const n = (name || '').toLowerCase()
  if (n.includes('bootstrap')) return 'ri-bootstrap-line'
  if (n === 'css') return 'ri-css3-line'
  if (n.includes('html')) return 'ri-html5-line'
  if (n.includes('illustrator')) return 'ri-brush-line'
  if (n.includes('indesign')) return 'ri-layout-2-line'
  if (n.includes('photoshop')) return 'ri-image-edit-line'
  if (n === 'scss' || n === 'sass') return 'ri-hashtag'
  if (n === 'javascript') return 'ri-javascript-line'
  if (n === 'jquery') return 'ri-code-s-slash-line'
  if (n.includes('magento')) return 'ri-store-2-line'
  if (n.includes('typo3')) return 'ri-terminal-box-line'
  if (n.includes('ui ux') || n.includes('ui') || n.includes('ux')) return 'ri-pantone-line'
  if (n.includes('angular')) return 'ri-angularjs-line'
  if (n.includes('markup')) return 'ri-code-box-line'
  if (n.includes('mysql') || n.includes('sql')) return 'ri-database-2-line'
  if (n === 'php') return 'ri-php-line'
  if (n === 'python') return 'ri-python-line'
  if (n === 'view' || n === 'vue') return 'ri-vuejs-line'
  if (n.includes('wordpress')) return 'ri-wordpress-line'
  return 'ri-tools-line'
}

const computedSkills = computed(() =>
  rawSkills.map(s => ({
    ...s,
    icon: iconFor(s.name),
    percent: levelToPercent(s.level)
  }))
)

// Animation trigger when the section enters the viewport
const animated = ref(false)
const sectionEl = ref(null)
let observer

onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animated.value = true
          observer?.disconnect()
        }
      })
    }, { threshold: 0.2 })
    if (sectionEl.value) observer.observe(sectionEl.value)
  } else {
    // Fallback: animate after mount
    requestAnimationFrame(() => (animated.value = true))
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style lang="scss" scoped>
.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem 1rem;
}

/* Two columns on desktop for the skills list */
@media (min-width: 992px) {
  .skills-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.skill {
  display: grid;
  grid-template-columns: 1fr minmax(220px, 360px);
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid var(--border);
}

.left {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.left i { font-size: 1.1rem; color: var(--primary); }
.name { font-weight: 500; }

.right {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.5rem;
}

.progress {
  position: relative;
  height: 8px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 0; // square progress bar
  overflow: hidden;
  border: 1px solid var(--border);
}

.bar {
  height: 100%;
  background: var(--primary);
  transition: width 900ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .bar { transition: none; }
}

.percent {
  font-size: 0.85rem;
  color: var(--text-muted);
  min-width: 2.5rem;
  text-align: right;
}

@media (max-width: 720px) {
  .skill {
    grid-template-columns: 1fr;
  }
  .right { grid-template-columns: 1fr auto; }
}
</style>
