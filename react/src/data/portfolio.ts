export type ProjectLink = {
  label: string;
  href: string;
  kind: "primary" | "secondary";
};

export type Project = {
  id: string;
  name: string;
  timeframe: string;
  description: string;
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    resume: string;
  };
};

export const PROFILE: Profile = {
  name: "Mel Neff",
  title: "Software Engineer",
  tagline:
    "Backend-leaning engineer shipping reliable services, data pipelines, and event-driven systems with Go, TypeScript, and AWS.",
  location: "Reno, NV (Remote-friendly)",
  links: {
    email: "mailto:neff.mel@gmail.com",
    github: "https://github.com/melneff",
    linkedin: "https://www.linkedin.com/in/melaniemneff",
    resume: "/resume.pdf",
  },
};

export const SKILLS: SkillGroup[] = [
  {
    group: "Backend",
    items: ["Go", "Node.js", "TypeScript", "PHP (Laravel)", "REST", "GraphQL"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (ECS, Lambda, SQS/SNS)", "Terraform/CloudFormation", "Docker", "CI/CD"],
  },
  {
    group: "Data",
    items: ["MySQL", "DynamoDB", "Athena", "S3", "ETL/ELT", "MongoDB"],
  },
  {
    group: "Quality",
    items: ["Unit/Integration tests", "DataDog", "Logging/Tracing", "Performance tuning"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "vcv8",
    name: "VCV8 — Business Idea Validator",
    timeframe: "2025-2026",
    description:
      "A scoring platform that evaluates business ideas across multiple pillars using structured prompts, external data sources, and deterministic scoring logic.",
    highlights: [
      "Pillar-based evaluation with explicit metric thresholds and confidence/risk outputs",
      "API enrichment (macro + industry signals) with caching and deduplication",
      "Report generation + versioned reruns for iterative validation",
    ],
    tech: ["TypeScript", "Node.js", "AWS", "Vector Search", "LLM"],
    links: [{ label: "Live Website", href: "https://vcv8.com", kind: "primary" }],
  },
  {
    id: "event-bus",
    name: "Event-Driven Lead Routing",
    timeframe: "2024-2026",
    description:
      "Modernized lead-routing workflows with an event-driven architecture to improve reliability, scalability, and auditability.",
    highlights: [
      "SNS/SQS fanout + worker processing for rules evaluation",
      "Improved failure handling with retries, DLQs, and idempotency patterns",
      "Reduced operational risk via clearer boundaries and observability",
    ],
    tech: ["Go", "AWS (SNS/SQS/ECS)", "CloudFormation", "MySQL"],
    links: [],
  },
  {
    id: "bi-lake",
    name: "BI Lake Pipeline",
    timeframe: "2024-2025",
    description:
      "Built an analytics pipeline to transform operational data into queryable datasets for reporting and dashboards.",
    highlights: [
      "Bronze/silver layers with schema normalization and quality checks",
      "Cost-aware query patterns (CTAS, partitioning) and storage formats",
      "Enabled faster ad-hoc analysis for business stakeholders",
    ],
    tech: ["AWS Glue", "S3", "Athena", "Parquet", "SQL"],
    links: [],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Anywhere Real Estate",
    role: "Software Engineer",
    period: "2019-Present",
    bullets: [
      "Built and maintained microservices powering lead distribution and routing with a React frontend and GraphQL middle layer.",
      "Designed event-driven workflows using Kafka, AWS messaging patterns and worker services.",
      "Improved service reliability with better observability, retries, and safe deployments.",
      "Built and maintained a lead pipeline delivering 35k+ leads/month with 99.9% uptime.",
      "Built in custom configurability for high-profile clients like Sotheby's and ColdwellBanker who serve thousands of agents and require complex routing rules.",
    ],
  },
];
