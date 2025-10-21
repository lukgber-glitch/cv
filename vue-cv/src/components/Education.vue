<template>
  <div class="card">
    <h2>Ausbildung</h2>
    <div class="timeline">
      <div v-for="edu in education" :key="edu.school + edu.period" class="item">
        <div class="period" aria-hidden="true">{{ edu.period }}</div>
        <div class="content">
          <h3 class="title">{{ edu.school }}</h3>
          <p v-if="edu.details" class="meta">
            <i class="ri-graduation-cap-line" aria-hidden="true"></i>
            <span>{{ edu.details }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const education = [
  { period: '11/2015 – 07/2016', school: 'Dnilabs Wallern a.d. Trattnach', details: 'Lehre als Informationstechniker' },
  { period: '08/2006 – 07/2010', school: 'MMS-Werbeagentur Linz', details: 'Lehre als Mediendesigner/Techniker' },
  { period: '01/2005 – 01/2006', school: 'Polytechnischer Lehrgang St. Martin', details: '' },
  { period: '01/2003 – 01/2005', school: 'Hauptschule Neuhofen', details: '' },
  { period: '01/2000 – 01/2003', school: 'Stiftsgymnasium Kremsmünster', details: '' },
  { period: '01/1996 – 01/2000', school: 'Volksschule Kematen', details: '' }
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
  padding: 0.75rem 0; /* match spacing with WorkExperience timeline */
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
