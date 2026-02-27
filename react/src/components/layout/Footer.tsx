import { PROFILE } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="muted small">
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span className="muted small">
          Built with React · <a href="#top">Back to top</a>
        </span>
      </div>
    </footer>
  );
}
