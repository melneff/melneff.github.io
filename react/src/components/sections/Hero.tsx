import { PROFILE } from "../../data/portfolio";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

export default function Hero() {
  return (
    <div className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="kicker">{PROFILE.title}</p>
          <h1>
            {PROFILE.name}
            <span className="accent">.</span>
          </h1>
          <p className="lead">{PROFILE.tagline}</p>
          <p className="muted">{PROFILE.location}</p>

          <div className="hero-actions">
            <Button href={PROFILE.links.email}>Email Me</Button>
            <Button href={PROFILE.links.github} variant="secondary">
              GitHub
            </Button>
            <Button href={PROFILE.links.linkedin} variant="secondary">
              LinkedIn
            </Button>
          </div>

          <div className="hero-badges">
            <Chip>Go</Chip>
            <Chip>TypeScript</Chip>
            <Chip>AWS</Chip>
            <Chip>Event-driven</Chip>
            <Chip>Data pipelines</Chip>
          </div>
        </div>

        <div className="card hero-card">
          <h3>Now</h3>
          <ul className="list">
            <li>Building reliable backend services + event workflows</li>
            <li>Shipping a portfolio of side projects (validation + analytics)</li>
            <li>Optimizing for clarity, scale, and operational excellence</li>
          </ul>

          <div className="divider" />

          <h3>Looking for</h3>
          <p className="muted">
            Remote-friendly backend / platform roles where I can own services end-to-end and improve reliability,
            performance, and cost.
          </p>
        </div>
      </div>
    </div>
  );
}
