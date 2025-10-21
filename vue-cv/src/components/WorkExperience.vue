<template>
  <div class="work-experience card">
    <h2>Werdegang</h2>
    <div class="timeline">
      <div v-for="job in jobs" :key="job.company + job.period" class="item">
        <div class="period" aria-hidden="true">{{ job.period }}</div>
        <div class="content">
          <h3 class="title">{{ job.position }} <span class="sep">–</span> {{ job.company }}</h3>
          <p class="meta">
            <i class="ri-briefcase-line" aria-hidden="true"></i>
            <span>{{ job.type }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jobs = [
  { period: '08/2022 – 06/2025', position: 'Grafikdesigner/Webentwickler', company: 'Röbels Früchte', type: 'Freelancer' },
  { period: '03/2020 – 04/2022', position: 'Webentwickler', company: 'INCERT eTourismus GmbH & Co KG', type: 'Vollzeit' },
  { period: '11/2017 – 03/2020', position: 'Webentwickler/Grafikdesigner', company: 'Atikon EDV & Marketing GmbH', type: 'Vollzeit' },
  { period: '01/2014 – 09/2017', position: 'Webentwickler/Grafikdesigner', company: 'Dni Labs', type: 'Lehre' },
  { period: '10/2011 – 01/2014', position: 'Grafikdesigner', company: 'XXXLutz KG', type: 'Vollzeit' },
  { period: '08/2006 – 08/2011', position: 'Grafikdesigner', company: 'MMS Werbeagentur', type: 'Lehre' },
  { period: '10/2010 – 04/2011', position: 'Funker', company: 'Bundesheer', type: 'Grundwehrdienst' }
]
</script>

<style lang="scss" scoped>
.timeline {
  display: grid;
  grid-template-columns: 1fr;
}

.item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1rem;
  padding: 0.75rem 0; /* a bit more breathing room for a clearer timeline */
  border-bottom: 1px solid var(--border);
}
.item:last-child { border-bottom: 0; }

.period {
  color: var(--text-muted);
  font-weight: 600;
  font-family: 'Montserrat-Custom', 'Montserrat', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: 0.2px;
}

/* Undo timeline rail/dot visuals */
.content {
  position: relative;
  padding-left: 0;
  border-left: 0;
}

.title {
  margin: 0;
  font-weight: 600;
}
.title .sep { color: var(--text-muted); font-weight: 500; }

.meta {
  margin-top: 0.25rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.meta i { color: var(--primary); font-size: 1rem; }

@media (max-width: 640px) {
  .item { grid-template-columns: 1fr; }
  .period { order: 1; }
  .content { order: 2; }
}
</style>
