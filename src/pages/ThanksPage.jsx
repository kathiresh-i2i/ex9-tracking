import { Link } from "react-router-dom";

export default function ThanksPage() {
  const steps = [
    { label: "Step 1", value: "We confirm your details" },
    { label: "Step 2", value: "We email scheduling options" },
    { label: "Step 3", value: "You get a live walkthrough" },
  ];

  return (
    <section className="page-section page-section--centered">
      <div className="container--narrow">
        <h1 className="page-title">Thanks for submitting</h1>
        <p className="page-lead">
          Your request was submitted successfully. We’ll email you shortly to
          schedule a demo.
        </p>
        <div className="card card--elevated thanks-card">
          <h2 className="card__title">What happens next?</h2>
          <div className="card__body">
            {steps.map(({ label, value }) => (
              <div key={label} className="stat">
                <span className="stat__label">{label}</span>
                <span className="stat__value">{value}</span>
              </div>
            ))}
          </div>
          <p className="card__footer">
            If you don’t see an email soon, check your spam folder.
          </p>
        </div>
        <div className="page-actions">
          <Link to="/" className="btn btn--primary">
            Return to home
          </Link>
        </div>
      </div>
    </section>
  );
}
