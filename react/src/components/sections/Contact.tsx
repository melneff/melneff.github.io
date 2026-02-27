import { PROFILE } from "../../data/portfolio";
import Button from "../ui/Button";
import Section from "../ui/Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Contact me anytime to chat about opportunities, collaborations, or just to say hi. I'm always open to connecting with fellow engineers, recruiters, or anyone interested in my work."
      right={
        <Button href={PROFILE.links.email} variant="primary">
          {PROFILE.links.email.replace("mailto:", "")}
        </Button>
      }
    >
      <div className="card">
        <div className="contact-grid">
          <div>
            <h3>Links</h3>
            <div className="contact-links">
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
                Resume PDF
              </a>
            </div>
          </div>

          <div>
            <h3>Quick note</h3>
            <p className="muted">
              If you reach out, include the role and what you want me to focus on (backend, platform, data, etc.).
            </p>
            <div className="hero-actions">
              <Button href={PROFILE.links.email}>Send Email</Button>
              <Button href="#projects" variant="secondary">
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
