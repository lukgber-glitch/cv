<template>
  <div class="personal-info card">
    <h2>Persönliche Informationen</h2>
    <ul class="info-list">
      <li>
        <i class="ri-user-line" aria-hidden="true"></i>
        <span class="label">Name:</span>
        <span class="value">Lukas Gruber</span>
      </li>
      <li>
        <i class="ri-map-pin-2-line" aria-hidden="true"></i>
        <span class="label">Adresse:</span>
        <span class="value">Fleckhaiderstraße 11, 4533 Piberbach, Österreich</span>
      </li>
      <li>
        <i class="ri-cake-3-line" aria-hidden="true"></i>
        <span class="label">Geburtsdatum:</span>
        <span class="value">2. April 1991</span>
      </li>
      <li>
        <i class="ri-flag-line" aria-hidden="true"></i>
        <span class="label">Staatsbürgerschaft:</span>
        <span class="value">Österreich</span>
      </li>
      <li>
        <i class="ri-phone-line" aria-hidden="true"></i>
        <span class="label">Telefon:</span>
        <a class="value" href="tel:+4367763968247">+43 67763968247</a>
      </li>
      <li>
        <i class="ri-mail-line" aria-hidden="true"></i>
        <span class="label">Email:</span>
        <a class="value" href="mailto:gruber.luk@gmx.at">gruber.luk@gmx.at</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.info-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}
.info-list li {
  display: grid;
  grid-template-columns: 20px auto 1fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--border);
}
.info-list li:last-child { border-bottom: none; }
.info-list i {
  color: var(--primary);
  font-size: 1.05rem;
}
.label {
  font-weight: 600;
  color: var(--text);
}
.value {
  color: var(--text);
}
.value[href] {
  color: var(--primary);
  text-decoration: none;
}
.value[href]:hover {
  color: var(--primary-600);
  text-decoration: underline;
}
</style>
