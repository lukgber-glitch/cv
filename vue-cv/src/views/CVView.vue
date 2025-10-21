<template>
  <!-- Intro: three columns under the header with full-width white background and no card borders -->
  <section class="intro-section">
    <div class="container">
      <div class="intro-grid">
        <PersonalInfo />
        <Interests />
        <Languages />
      </div>
    </div>
  </section>

  <!-- Full-width skills band with background extending outside the container -->
  <section class="skills-band">
    <div class="container">
      <Skills />
    </div>
  </section>

  <!-- Work Experience + Education: full-bleed white band, two columns -->
  <section class="work-edu-band">
    <div class="container">
      <div class="work-edu-grid">
        <WorkExperience />
        <Education />
      </div>
    </div>
  </section>

  <!-- Projects: full-bleed band with #f3f5f8 background and two-column layout inside -->
  <section class="projects-band">
    <div class="container">
      <Projects />
    </div>
  </section>
</template>

<script setup lang="ts">
import PersonalInfo from '../components/PersonalInfo.vue'
import WorkExperience from '../components/WorkExperience.vue'
import Education from '../components/Education.vue'
import Projects from '../components/Projects.vue'
import Skills from '../components/Skills.vue'
import Languages from '../components/Languages.vue'
import Interests from '../components/Interests.vue'
</script>

<style scoped lang="scss">
/* Intro section: full-bleed white background; remove card borders */
.intro-section {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100dvw; /* use dynamic viewport to exclude scrollbar width */
  background: #fff;
  padding: var(--space-8) 0;
}

.intro-section :deep(.card) {
  background: transparent;
  border: 0;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .intro-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .intro-grid { grid-template-columns: 1fr 1fr 1fr; }
}

/* Full-bleed skills band */
.skills-band {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100dvw; /* use dynamic viewport to exclude scrollbar width */
  background: var(--band);
  padding: var(--space-8) 0;
}

/* Make the skills card flat within the band */
.skills-band :deep(.card) {
  background: transparent;
  border: 0;
}

/* Work and Education: full-bleed white band with two columns */
.work-edu-band {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100dvw; /* use dynamic viewport to exclude scrollbar width */
  background: #fff;
  padding: var(--space-8) 0;
}

.work-edu-band :deep(.card) {
  background: transparent;
  border: 0;
}

.work-edu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .work-edu-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.projects-band {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100dvw; /* exclude scrollbar width to avoid horizontal overflow */
  background: var(--band);
  padding: var(--space-8) 0;
}

.projects-band :deep(.card) {
  background: transparent;
  border: 0;
}
</style>
