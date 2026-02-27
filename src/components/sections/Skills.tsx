import { SKILLS } from "../../data/portfolio";
import Chip from "../ui/Chip";
import Section from "../ui/Section";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Grouped by what I use most often. Keep it focused and credible.">
      <div className="grid-2">
        {SKILLS.map((skillGroup) => (
          <div key={skillGroup.group} className="card">
            <h3>{skillGroup.group}</h3>
            <div className="chips">
              {skillGroup.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
