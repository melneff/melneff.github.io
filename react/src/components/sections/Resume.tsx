import { EXPERIENCE, PROFILE } from "../../data/portfolio";
import Button from "../ui/Button";
import Section from "../ui/Section";

export default function Resume() {
  return (
    <Section
      id="resume"
      title="Resume"
      subtitle="Keep a 1-page PDF in /public/resume.pdf and update this timeline as needed."
      right={
        <Button href={PROFILE.links.resume} variant="primary">
          Download PDF
        </Button>
      }
    >
      <div className="grid-2">
        <div className="card">
          <h3>Experience</h3>
          {EXPERIENCE.map((experience) => (
            <div key={experience.company} className="resume-item">
              <div className="resume-head">
                <div>
                  <strong>{experience.role}</strong> · {experience.company}
                </div>
                <span className="muted small">{experience.period}</span>
              </div>
              <ul className="list">
                {experience.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Highlights</h3>
          <ul className="list">
            <li>Event-driven architecture: SNS/SQS patterns, retries, DLQs, idempotency</li>
            <li>Service reliability: logging/tracing, alarms, safe deployments</li>
            <li>Data systems: ETL design, cost-aware analytics (Athena/S3)</li>
            <li>Strong documentation habits: diagrams, runbooks, clear PRs</li>
          </ul>

          <div className="divider" />

          <h3>Resume Preview</h3>
          <div className="pdf">
            <iframe title="resume" src={PROFILE.links.resume} loading="lazy" />
          </div>
        </div>
      </div>
    </Section>
  );
}
