import { useState, useEffect } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export default function DemoModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = String(email || "").trim();
    setError("");
    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      aria-hidden="false"
    >
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal__panel">
        <div className="modal__header">
          <h2 id="demo-modal-title" className="modal__title">
            Book a demo
          </h2>
          <button
            type="button"
            className="modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form className="modal__form" noValidate onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="demo-email">
            Work email
          </label>
          <input
            id="demo-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="form-help">We’ll use this to reach out and schedule your demo.</p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="modal__actions">
            <button type="submit" className="btn btn--primary">
              Submit
            </button>
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
