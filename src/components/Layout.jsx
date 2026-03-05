import { Outlet, Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/features", label: "Features" },
];

export default function Layout({ onBookDemo, year }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="site-layout">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-logo" aria-label="BrandSpark home">
            BrandSpark
          </Link>
          <nav className="site-nav" aria-label="Main">
            <ul className="site-nav__list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`site-nav__link ${isActive(to) ? "site-nav__link--active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onBookDemo}
            aria-label="Book a demo"
          >
            Book a demo
          </button>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span className="site-footer__legal">
            <Link to="/terms" className="site-footer__link">
              Terms of Service
            </Link>
            {" · "}
            © {year} BrandSpark
          </span>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onBookDemo}
            aria-label="Book a demo"
          >
            Book a demo
          </button>
        </div>
      </footer>
    </div>
  );
}
