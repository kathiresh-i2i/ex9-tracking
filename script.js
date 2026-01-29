function isValidEmail(email) {
  // Simple, practical validation (not RFC-perfect, but good UX)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function qs(sel) {
  return document.querySelector(sel);
}

const modal = qs("#demoModal");
const form = qs("#demoForm");
const emailInput = qs("#emailInput");
const formError = qs("#formError");
const formSuccess = qs("#formSuccess");
const inlineStatus = qs("#inlineStatus");
const submitBtn = qs("#submitBtn");

const openButtons = [
  qs("#bookDemoBtn"),
  qs("#bookDemoBtnTop"),
  qs("#bookDemoBtnFooter"),
].filter(Boolean);

let lastFocused = null;

function setModalOpen(open) {
  if (!modal) return;

  if (open) {
    lastFocused = document.activeElement;
    modal.setAttribute("data-open", "true");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    formError.textContent = "";
    formSuccess.textContent = "";
    submitBtn.disabled = false;
    emailInput.value = "";
    setTimeout(() => emailInput.focus(), 0);
  } else {
    modal.removeAttribute("data-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }
}

function showInlineMessage(msg) {
  if (!inlineStatus) return;
  inlineStatus.textContent = msg || "";
}

openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showInlineMessage("");
    setModalOpen(true);
  });
});

modal?.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.closeModal === "true") setModalOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.getAttribute("data-open") === "true") {
    setModalOpen(false);
  }
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = String(emailInput.value || "").trim();
  formError.textContent = "";
  formSuccess.textContent = "";

  if (!isValidEmail(email)) {
    formError.textContent = "Please enter a valid email address.";
    emailInput.focus();
    return;
  }

  // Simulated successful submission (no backend required)
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";

  await new Promise((r) => setTimeout(r, 650));

  // Redirect to thank-you page after a successful submission
  window.location.href = "./thanks.html";
});

// Footer year
const yearEl = qs("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());


