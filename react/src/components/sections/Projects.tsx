import { useMemo, useState } from "react";
import { PROJECTS } from "../../data/portfolio";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import Section from "../ui/Section";

export default function Projects() {
  const allTech = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((project) => project.tech.forEach((tech) => set.add(tech)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((project) => project.tech.includes(filter));
  }, [filter]);

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="A few things I’ve built recently."
      right={
        <div className="filters">
          <span className="muted small">Filter:</span>
          <select className="select" value={filter} onChange={(event) => setFilter(event.target.value)}>
            {allTech.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      }
    >
      <div className="grid-3">
        {filtered.map((project) => (
          <article key={project.id} className="card project">
            <div className="project-top">
              <div>
                <h3 className="project-title">{project.name}</h3>
                <p className="muted small">{project.timeframe}</p>
              </div>
              <div className="project-tech">
                {project.tech.slice(0, 3).map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </div>

            <p className="project-desc">{project.description}</p>

            <ul className="list">
              {project.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <div className="project-links">
              {project.links.map((link) => (
                <Button key={link.label} href={link.href} variant={link.kind === "primary" ? "primary" : "secondary"}>
                  {link.label}
                </Button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
