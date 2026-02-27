import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  right?: ReactNode;
};

export default function Section({ id, title, subtitle, children, right }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
        {right ? <div className="section-right">{right}</div> : null}
      </div>
      {children}
    </section>
  );
}
