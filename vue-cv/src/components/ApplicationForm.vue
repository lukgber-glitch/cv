<template>
  <!-- Full-bleed application band with light background -->
  <section class="application-band" role="region" aria-labelledby="application-form-heading">
    <div class="container">
      <div class="application-form">
        <div class="inset">
          <h2 id="application-form-heading">Ihre Antwort</h2>
          <form action="https://formsubmit.co/luk.gber@gmail.com" method="POST" novalidate @submit.prevent="handleSubmit">
            <!-- FormSubmit.co configuration -->
            <input type="hidden" name="_subject" value="Neue Rückmeldung über das Bewerbungsformular" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <!-- Honeypot field to reduce spam -->
            <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" />

            <div class="fields">
              <div class="field field-name">
                <input
                  v-model="form.name"
                  id="name"
                  name="name"
                  required
                  placeholder="Zukünftiger Arbeitgeber"
                  @blur="handleBlur('name')"
                  :aria-invalid="touched.name && !!errors.name"
                  :aria-describedby="touched.name && errors.name ? 'error-name' : undefined"
                  :class="{ invalid: touched.name && errors.name }"
                />
                <p v-if="touched.name && errors.name" id="error-name" class="error-text" role="alert">{{ errors.name }}</p>
              </div>
              <div class="field field-email">
                <input
                  v-model="form.email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="beste@firma.tld"
                  @blur="handleBlur('email')"
                  :aria-invalid="touched.email && !!errors.email"
                  :aria-describedby="touched.email && errors.email ? 'error-email' : undefined"
                  :class="{ invalid: touched.email && errors.email }"
                />
                <p v-if="touched.email && errors.email" id="error-email" class="error-text" role="alert">{{ errors.email }}</p>
              </div>
              <div class="field field-message">
                <label for="message">Nachricht an zukünftigen Arbeitnehmer</label>
                <textarea
                  v-model="form.message"
                  id="message"
                  name="message"
                  required
                  placeholder="Ihre fantastische Zusage …"
                  @blur="handleBlur('message')"
                  :aria-invalid="touched.message && !!errors.message"
                  :aria-describedby="touched.message && errors.message ? 'error-message' : undefined"
                  :class="{ invalid: touched.message && errors.message }"
                ></textarea>
                <p v-if="touched.message && errors.message" id="error-message" class="error-text" role="alert">{{ errors.message }}</p>
              </div>
              <!-- Quote/Reference section becomes a full clickable link to the PDF -->
              <button
                type="button"
                class="quote"
                @click="openPdf"
                aria-label="Referenzschreiben: Das sagen andere Arbeitgeber"
              >
                <i class="ri-double-quotes-l" aria-hidden="true"></i>
                <div class="text">
                  <h3 id="quote-heading">ÜBERDURCHSCHNITTLICH</h3>
                  <p>Das sagen andere Arbeitgeber</p>
                </div>
                <i class="ri-double-quotes-r" aria-hidden="true"></i>
              </button>
            </div>
            <div class="actions">
              <button class="primary" type="submit">
                <i class="ri-send-plane-line" aria-hidden="true"></i>
                <span>Antwort senden</span>
              </button>
            </div>
          </form>
                  <transition name="modal-fade">
            <div v-if="showPdf" class="pdf-overlay" role="dialog" aria-modal="true" aria-labelledby="pdf-title" @click.self="closePdf">
              <div class="pdf-dialog" ref="dialogEl" tabindex="-1">
                <div class="pdf-header">
                  <h3 id="pdf-title">Referenzschreiben</h3>
                  <button type="button" class="close" @click="closePdf" aria-label="PDF schließen" ref="closeBtnEl">
                    <i class="ri-close-line" aria-hidden="true"></i>
                  </button>
                </div>
                <div class="pdf-body">
                  <iframe :src="baseUrl + 'AZ%20Lukas%20Gruber.pdf'" title="Referenzschreiben PDF" loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: `Sehr geehrter Herr Gruber,

vielen Dank für Ihre Bewerbung. Wir freuen uns, Ihnen mitteilen zu können, dass Sie uns fachlich und persönlich überzeugt haben. Gern möchten wir Sie als Frontend Developer einstellen und laden Sie zu einem abschließenden Gespräch zur Vertragsabstimmung ein.

Bitte teilen Sie uns Ihre Verfügbarkeit für ein kurzes Meeting (online oder vor Ort) in den nächsten Tagen mit. Wir freuen uns auf die Zusammenarbeit!

Mit freundlichen Grüßen`
})

const showPdf = ref(false)
let openerEl = null
const dialogEl = ref(null)
const closeBtnEl = ref(null)

function getFocusable() {
  const root = dialogEl.value
  if (!root) return []
  const nodes = root.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
  )
  return Array.from(nodes).filter((el) => el.offsetParent !== null)
}

function openPdf(e) {
  openerEl = e && e.currentTarget ? e.currentTarget : null
  showPdf.value = true
  // prevent background scroll while overlay is open
  document.documentElement.style.overflow = 'hidden'
  nextTick(() => {
    // focus the close button or dialog for accessibility
    (closeBtnEl.value || dialogEl.value)?.focus()
  })
}

function closePdf() {
  showPdf.value = false
  document.documentElement.style.overflow = ''
  if (openerEl && typeof openerEl.focus === 'function') {
    openerEl.focus()
  }
}

function onKeydown(e) {
  if (!showPdf.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    closePdf()
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

const baseUrl = (import.meta.env?.BASE_URL || './').replace(/\/?$/, '/')

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})

// --- Form validation ---
const touched = ref({ name: false, email: false, message: false })

function handleBlur(field) {
  touched.value[field] = true
}

function validateName(value) {
  if (!value || !value.trim()) return 'Bitte geben Sie den Namen Ihres Unternehmens an.'
  if (value.trim().length < 2) return 'Der Name muss mindestens 2 Zeichen enthalten.'
  return ''
}

function validateEmail(value) {
  if (!value || !value.trim()) return 'Bitte geben Sie eine E‑Mail-Adresse an.'
  // Basic, widely used email regex for client-side checks
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!re.test(value.trim())) return 'Bitte geben Sie eine gültige E‑Mail-Adresse an.'
  return ''
}

function validateMessage(value) {
  if (!value || !value.trim()) return 'Bitte geben Sie eine Nachricht ein.'
  if (value.trim().length < 10) return 'Die Nachricht sollte mindestens 10 Zeichen lang sein.'
  return ''
}

const errors = computed(() => ({
  name: validateName(form.value.name),
  email: validateEmail(form.value.email),
  message: validateMessage(form.value.message),
}))

const isValid = computed(() => !errors.value.name && !errors.value.email && !errors.value.message)

function focusFirstInvalid() {
  if (errors.value.name) {
    document.getElementById('name')?.focus()
    return
  }
  if (errors.value.email) {
    document.getElementById('email')?.focus()
    return
  }
  if (errors.value.message) {
    document.getElementById('message')?.focus()
  }
}

function handleSubmit(e) {
  // Mark all as touched so errors become visible if invalid
  touched.value.name = true
  touched.value.email = true
  touched.value.message = true

  if (!isValid.value) {
    focusFirstInvalid()
    return
  }

  // Submit to FormSubmit.co when valid
  // Use the native submit to respect action/method and hidden inputs
  e.target.submit()
}

</script>

<style lang="scss" scoped>
.application-band {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100dvw; /* exclude scrollbar width */
  background: var(--band); /* #f3f5f8 */
  padding: var(--space-8) 0;
}

.application-form {
  /* flat look: no card border/background */
  background: transparent;
  border: 0;
}

.fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4) var(--space-6);
  grid-template-areas:
    'name'
    'email'
    'message'
    'quote';
}

.field {
  display: flex;
  flex-direction: column;
  max-width: 100%; /* fill on small screens */
}

.field-message {
  max-width: 100%; /* match other inputs on small */
}

/* assign grid areas */
.field-name { grid-area: name; }
.field-email { grid-area: email; }
.field-message { grid-area: message; }
.quote { grid-area: quote; }

label {
  font-weight: 600;
  color: var(--text-muted);
}

input, textarea {
  margin-top: 0.35rem;
}

textarea {
  min-height: 160px;
  resize: vertical;
}

/* Validation styles */
.input, input, textarea {
  border-color: var(--border);
}

.invalid {
  border-color: #dc3545 !important; /* red border for invalid fields */
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.error-text {
  margin-top: 0.35rem;
  color: #dc3545;
  font-size: 0.875rem;
}

.actions {
  margin-top: var(--space-6);
}


@media (min-width: 992px) {
  .fields {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'name email'
      'message quote';
    align-items: start;
  }
  .quote { margin-top: 0; }
}

/* Alignment inset like job-description card */
.application-form .inset {
  padding-left: var(--space-6);
  padding-right: var(--space-6);
}

/* Quote block styles */
.quote {
  align-self: start;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  max-width: 520px;
  text-decoration: none; /* remove underline for full-block link */
  color: inherit; /* inherit text color */
  border: 0;
  background: transparent;
  margin-top: var(--space-6); /* extra space before quote */
}
.quote:focus-visible {
  outline: 3px solid rgba(0, 91, 187, 0.35);
  outline-offset: 2px;
}
.quote i {
  color: #1a3b70; /* match h2/h3 blue */
  font-size: 3rem; /* big quote icons */
  line-height: 1;
}
.quote .text {
  display: flex;
  flex-direction: column;
}
.quote h3 {
  margin: 0 0 var(--space-3);
  color: #1a3b70;
  font-weight: 700;
}
.quote p {
  margin: 0;
  color: var(--text-muted);
}

/* Modal overlay and animation similar to reference modal-flex-container */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .pdf-dialog { transform: scale(0.98); }
.modal-fade-enter-active .pdf-dialog, .modal-fade-leave-active .pdf-dialog { transition: transform .2s ease; }

.pdf-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.pdf-dialog {
  background: #fff;
  width: min(96vw, 1100px);
  height: min(90vh, 820px);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

.pdf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
}

.pdf-header h3 {
  margin: 0;
  color: var(--text);
  font-weight: 600;
}

.pdf-header .close {
  background: transparent;
  border: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.pdf-header .close i { font-size: 1.25rem; color: var(--text); }

.pdf-body { flex: 1; }

.pdf-body iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Extra small devices tweaks to prevent overflow */
@media (max-width: 400px) {
  .application-form .inset {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }
  .fields { overflow-x: hidden; }
  .field, .field-message { min-width: 0; }
  input, textarea {
    padding: var(--space-2) var(--space-3);
    min-width: 0;
  }
  .quote i { font-size: 2rem; }
}

/* Mobile override: use inline flow for the fields wrapper as requested; keep children full-width blocks */
@media (max-width: 540px) {
  .fields {
    display: inline; /* requested change: inline instead of grid/flex */
  }
  .field,
  .field-message,
  .quote {
    display: block; /* ensure each field stacks and occupies full width */
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin-bottom: var(--space-4); /* replace former grid/flex gap */
  }
  .quote { margin-top: 0; }
  .fields > :last-child { margin-bottom: 0; }
  .quote i { font-size: 1.75rem; }
  .quote .text { word-break: break-word; }
}
</style>
