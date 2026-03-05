import { useState, useEffect } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = String(email || "").trim();
    setError("");

    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setTimeout(() => {
      window.location.href = "/thanks.html";
    }, 500);
  };

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <div className="logo" aria-label="BrandSpark">
            BrandSpark
          </div>
          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Book a demo
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <h1 className="hero__title">BrandSpark</h1>
              <p className="hero__subtitle">
                A simple way to spark demand with clear positioning, consistent
                messaging, and better go-to-market alignment.
              </p>

              <div className="hero__cta">
                <button
                  className="btn btn--primary"
                  type="button"
                  onClick={() => setIsOpen(true)}
                >
                  Book a demo
                </button>
              </div>

              <ul className="bullets">
                <li>Capture what resonates with customers</li>
                <li>Generate on-brand messaging faster</li>
                <li>Keep teams aligned across channels</li>
              </ul>
            </div>

            <div className="hero__card" aria-label="Product preview">
              <div className="card">
                <div className="card__title">Demo preview</div>
                <div className="card__body">
                  <div className="stat">
                    <div className="stat__label">Message consistency</div>
                    <div className="stat__value">↑ 32%</div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Time to launch</div>
                    <div className="stat__value">↓ 41%</div>
                  </div>
                  <div className="stat">
                    <div className="stat__label">Cross-team alignment</div>
                    <div className="stat__value">↑ 2.1×</div>
                  </div>
                </div>
                <div className="card__footer">
                  Request a demo to see your personalized walkthrough.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container section__inner">
            <h2 className="section__title">Built for fast-moving teams</h2>
            <div className="grid">
              <div className="feature">
                <div className="feature__title">Positioning clarity</div>
                <div className="feature__text">
                  Turn messy inputs into crisp value props your whole team can
                  use.
                </div>
              </div>
              <div className="feature">
                <div className="feature__title">On-brand output</div>
                <div className="feature__text">
                  Maintain voice and tone across campaigns, ads, email, and web.
                </div>
              </div>
              <div className="feature">
                <div className="feature__title">Ready-to-ship assets</div>
                <div className="feature__text">
                  Export messaging frameworks and snippets your team can reuse.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>
            <a href="/terms.html" className="footer__link">
              Terms of Service
            </a>{" "}
            · © <span>{year}</span> BrandSpark
          </span>
          <button
            className="btn btn--link"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Book a demo
          </button>
        </div>
      </footer>

      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demoModalTitle"
        aria-hidden={isOpen ? "false" : "true"}
        data-open={isOpen ? "true" : undefined}
      >
        <div
          className="modal__backdrop"
          onClick={() => setIsOpen(false)}
        />
        <div className="modal__panel" role="document">
          <div className="modal__header">
            <h3 id="demoModalTitle" className="modal__title">
              Book a demo
            </h3>
            <button
              className="iconBtn"
              type="button"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <form className="form" noValidate onSubmit={handleSubmit}>
            <label className="form__label" htmlFor="emailInput">
              Work email
            </label>
            <input
              id="emailInput"
              name="email"
              className="form__input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="form__help">
              We’ll use this to reach out and schedule your demo.
            </p>

            <p className="form__error" role="alert">
              {error}
            </p>

            <div className="form__actions">
              <button className="btn btn--primary" type="submit">
                Submit
              </button>
              <button
                className="btn btn--secondary"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
