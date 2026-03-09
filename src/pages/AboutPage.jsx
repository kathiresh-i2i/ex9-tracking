export default function AboutPage({ onBookDemo }) {
  return (
    <section className="page-section page-section--centered">
      <div className="container--narrow">
        <h1 className="page-title">About BrandSpark</h1>
        <p className="page-lead">
          We help teams turn brand insights into action—faster. BrandSpark
          brings clarity to positioning, consistency to messaging, and alignment
          across go-to-market.
        </p>
        <p className="page-text">
          Our platform is built for marketing and product teams who need to
          move quickly without losing brand coherence. Whether you’re launching
          a new product or scaling campaigns, BrandSpark keeps everyone on the
          same page.
        </p>
        <div className="page-actions page-actions--center">
          <button type="button" className="btn btn--primary" onClick={onBookDemo}>
            Book a demo
          </button>
          <a href="/features/" className="btn btn--outline">
            View features
          </a>
        </div>
      </div>
    </section>
  );
}
