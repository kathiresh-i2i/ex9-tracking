export default function HomePage({ onBookDemo }) {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__content">
            <h1 className="page-hero__title">Turn brand insights into action</h1>
            <p className="page-hero__subtitle">
              A simple way to spark demand with clear positioning, consistent
              messaging, and better go-to-market alignment.
            </p>
            <div className="page-hero__actions">
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={onBookDemo}
              >
                Book a demo
              </button>
              <a href="/features/" className="btn btn--outline btn--lg">
                See features
              </a>
            </div>
            <ul className="page-hero__bullets">
              <li>Capture what resonates with customers</li>
              <li>Generate on-brand messaging faster</li>
              <li>Keep teams aligned across channels</li>
            </ul>
          </div>
          <div className="page-hero__card" aria-label="Demo preview">
            <div className="card card--elevated">
              <div className="card__title">Demo preview</div>
              <div className="card__body">
                <div className="stat">
                  <span className="stat__label">Message consistency</span>
                  <span className="stat__value stat__value--up">↑ 32%</span>
                </div>
                <div className="stat">
                  <span className="stat__label">Time to launch</span>
                  <span className="stat__value stat__value--down">↓ 41%</span>
                </div>
                <div className="stat">
                  <span className="stat__label">Cross-team alignment</span>
                  <span className="stat__value stat__value--up">↑ 2.1×</span>
                </div>
              </div>
              <div className="card__footer">
                Request a demo to see your personalized walkthrough.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <h2 className="page-section__title">Built for fast-moving teams</h2>
        <div className="feature-grid">
            <article className="feature-card">
              <h3 className="feature-card__title">Positioning clarity</h3>
              <p className="feature-card__text">
                Turn messy inputs into crisp value props your whole team can use.
              </p>
            </article>
            <article className="feature-card">
              <h3 className="feature-card__title">On-brand output</h3>
              <p className="feature-card__text">
                Maintain voice and tone across campaigns, ads, email, and web.
              </p>
            </article>
            <article className="feature-card">
              <h3 className="feature-card__title">Ready-to-ship assets</h3>
              <p className="feature-card__text">
                Export messaging frameworks and snippets your team can reuse.
              </p>
            </article>
          </div>
      </section>
    </>
  );
}
