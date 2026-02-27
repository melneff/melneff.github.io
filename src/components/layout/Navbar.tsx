import { PROFILE } from "../../data/portfolio";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <span className="brand-dot" />
          <span>{PROFILE.name}</span>
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <Button href={PROFILE.links.resume} variant="secondary">
            Download Resume
          </Button>
        </div>
      </div>
    </header>
  );
}
