const FEATURES = [
  {
    title: "Positioning clarity",
    description:
      "Turn messy inputs into crisp value props your whole team can use. Define your positioning once and keep it consistent everywhere.",
  },
  {
    title: "On-brand output",
    description:
      "Maintain voice and tone across campaigns, ads, email, and web. Every asset stays aligned with your brand guidelines.",
  },
  {
    title: "Ready-to-ship assets",
    description:
      "Export messaging frameworks and snippets your team can reuse. No more copying from docs or chasing the latest version.",
  },
];

export default function FeaturesPage({ onBookDemo }) {
  return (
    <section className="page-section">
      <h1 className="page-title page-title--center">Features</h1>
      <p className="page-lead page-lead--center">
        Everything you need to spark demand with clear positioning and
        consistent messaging.
      </p>
      <ul className="feature-list">
        {FEATURES.map(({ title, description }) => (
          <li key={title} className="feature-list__item">
            <div className="feature-list__content">
              <h2 className="feature-list__title">{title}</h2>
              <p className="feature-list__text">{description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="page-actions page-actions--center">
        <button type="button" className="btn btn--primary" onClick={onBookDemo}>
          Book a demo
        </button>
      </div>
    </section>
  );
}
