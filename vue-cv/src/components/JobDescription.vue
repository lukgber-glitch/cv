<template>
  <div class="job-description card">
    <h2>Bewerbung als Frontend Developer</h2>

    <p>Sehr geehrte Damen und Herren,</p>

    <p>Mit großem Interesse habe ich Ihre Stellenausschreibung für die Position als Frontend Developer gelesen.</p>
    <p>Besonders die Schwerpunkte der ausgeschriebenen Position – die Weiterentwicklung moderner Frontends und die Arbeit mit wiederverwendbaren UI‑Komponenten – entsprechen genau meinem beruflichen Profil und meinen Stärken.</p>

    <p>In meiner bisherigen Laufbahn bei INCERT eTourismus GmbH &amp; Co KG, Atikon EDV &amp; Marketing GmbH sowie zuletzt als Freelancer für Röbels Früchte war ich verantwortlich für die Konzeption, Gestaltung und technische Umsetzung moderner Websites. Dabei habe ich umfangreiche Erfahrung in der Arbeit mit HTML5, CSS3, JavaScript sowie verschiedenen Frameworks gesammelt.</p>
    <p>Zu meinen Aufgaben gehörten unter anderem die Entwicklung responsiver Weboberflächen, die Erstellung modularer UI‑Komponenten und die enge Zusammenarbeit mit Design- und Backend-Teams zur Sicherstellung einer nahtlosen User Experience.</p>

    <!-- Full-bleed skills band with inner inset to align text like other paragraphs -->
    <section class="skills-band" role="region" aria-labelledby="skills-heading">
      <div class="container">
        <div class="inset">
          <h2 id="skills-heading">Meine wichtigsten Kenntnisse und Fähigkeiten:</h2>
          <ul class="icon-list">
            <li>
              <i class="ri-code-s-slash-line" aria-hidden="true"></i>
              <span>Fundierte Kenntnisse in HTML/XHTML, CSS, SCSS, JavaScript, jQuery und responsivem Design</span>
            </li>
            <li>
              <i class="ri-stack-line" aria-hidden="true"></i>
              <span>Erfahrung mit Vue.js sowie modernen UI-Frameworks, zusätzlich sehr gute Kenntnisse in Bootstrap, TYPO3 und Wordpress</span>
            </li>
            <li>
              <i class="ri-pantone-line" aria-hidden="true"></i>
              <span>Ausgeprägtes Gespür für UI/UX‑Design dank meiner Tätigkeit als Grafikdesigner</span>
            </li>
            <li>
              <i class="ri-tools-line" aria-hidden="true"></i>
              <span>Erfahrung im Umgang mit Git, modernen Build-Tools sowie in agilen Entwicklungsumgebungen</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <p>
      Ich bin überzeugt, dass meine Kombination aus technischem Know-how, gestalterischer Erfahrung und strukturierter Arbeitsweise einen echten Mehrwert für Ihr Team darstellen würde.
    </p>
    <p>
      Ich arbeite gerne eigenverantwortlich, schätze aber ebenso die enge Zusammenarbeit im Team, um gemeinsam hochwertige Produkte zu entwickeln.
    </p>

    <p>
      Ich freue mich darauf, meine Erfahrungen und Ideen in Ihr Unternehmen einzubringen, und würde Sie sehr gerne in einem persönlichen Gespräch von meinen Fähigkeiten überzeugen.
    </p>

    <p>
      Mit freundlichen Grüßen<br/>
      Lukas Gruber
    </p>
  </div>
</template>

<style scoped lang="scss">
.job-description {
  /* remove default card framing for this section only */
  border: 0;
  background: transparent;
}

/* Full-bleed band for skills highlight (background only is full width) */
.skills-band {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100dvw; /* exclude scrollbar width to avoid horizontal overflow */
  background: var(--band);
  border: 0; /* no border */
  /* generous space before and after the band */
  margin-top: calc(var(--space-8) + var(--space-6));
  margin-bottom: calc(var(--space-8) + var(--space-6));
  /* Make all text in the band uppercase */
  text-transform: uppercase;
}

/* Increase vertical padding inside the band beyond the default container spacing */
.skills-band .container {
  padding-top: calc(var(--space-8) + var(--space-6));
  padding-bottom: calc(var(--space-8) + var(--space-6));
}

/* Inset to align text with surrounding .card content */
.skills-band .inset {
  padding-left: var(--space-6);
  padding-right: var(--space-6);
}

/* Band heading (blue via global theme) */
.skills-band h2 {
  margin: 0 0 var(--space-4) 0; /* add more space under the heading */
  text-transform: none;
}

/* Icon list styling */
.icon-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.icon-list li {
  display: flex;
  align-items: center; /* vertically center icon and text */
  gap: 0.75rem;
  margin: 0.5rem 0;
}
.icon-list i {
  color: #1a3b70; /* same color as h2 */
  font-size: 2.6rem; /* oversized icons */
  line-height: 1;
}
.icon-list span { line-height: 1.6; font-weight: 700; }

/* Paragraph spacing specifically for Job Description */
.job-description p {
  margin: 0 0 var(--space-4);
}
</style>
