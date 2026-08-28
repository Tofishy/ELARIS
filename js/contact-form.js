/* ---------------- contact form -> sends straight to Gmail via FormSubmit ---------------- */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const ELARIS_EMAIL = 'elariscreatives.ph@gmail.com';

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  const formData = new FormData(contactForm);
  formData.append('_subject', 'New project inquiry — ELARIS website');
  formData.append('_captcha', 'false');
  formData.append('_template', 'table');

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${ELARIS_EMAIL}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    if (!res.ok) throw new Error('Request failed');

    submitBtn.textContent = 'Sent ✓';
    formStatus.textContent = "Thanks — we'll get back to you within one business day.";
    formStatus.classList.add('success');
    contactForm.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }, 4000);

  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
    formStatus.textContent = `Something went wrong. Please email us directly at ${ELARIS_EMAIL}.`;
    formStatus.classList.add('error');
  }
});