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
  {
    id: "reno-haul",
    name: "Reno Haul — Junk Hauling Landing",
    timeframe: "2025",
    description:
      "Graphics-heavy landing page for a junk hauling business with animated truck navigation, service showcase, pricing, and booking form.",
    highlights: [
      "Animated truck indicator that follows active nav section",
      "Custom SVG illustrations with gradient fills and interactive animations",
      "Full-page sections: hero, services, pricing, gallery, reviews, booking",
      "Responsive design optimized for mobile and desktop",
    ],
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    links: [{ label: "View Live", href: "#/project/reno-haul", kind: "primary" }],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "VCV8",
    role: "Senior Software Engineer",
    period: "Oct 2025 – Current",
    bullets: [
      "Lead backend engineer designing and building a business validator pipeline using asynchronous job queueing and LLM prompting with vector store for 8-pillar evaluation.",
      "Implemented chatback feature for user communication with LLM and report re-run capability.",
      "Integrated OpenAI, DeepSeek, and Gemini LLM APIs with data from FRED, BEA, USCensus, USPTO, and SerpAPIs to reduce LLM variability.",
      "Took startup from 0 to 1.",
    ],
  },
  {
    company: "Anywhere Real Estate Inc.",
    role: "Senior Software Engineer / Team Lead",
    period: "Mar 2019 – Mar 2026",
    bullets: [
      "Key engineer on cloud-native Leads Engine microservice—greenfield system processing ~35k leads/week for 300k+ agents across multiple countries.",
      "Orchestrated first large-scale production rollout of Leads Engine pilot across multiple brokerages.",
      "Led architectural refactors from legacy to scalable, event-driven designs with Kafka and SQS.",
      "Enhanced Datadog observability with improved telemetry, granular metrics, and distributed tracing across microservices.",
      "Designed high-throughput workflows processing millions of transactions annually for Sotheby's, C21, BH&G, and Coldwell Banker.",
      "Built asynchronous data egress pipeline (Go, TypeScript, Kafka, AWS Lambda) for ML training and analytics.",
      "Senior escalation point for complex production incidents and root-cause analysis.",
      "Led team through agile ceremonies, sprint planning, JIRA workflow, and tech debt initiatives.",
    ],
  },
  {
    company: "No-IP",
    role: "Software Engineer I",
    period: "Jan 2018 – Mar 2019",
    bullets: [
      "Built and maintained high-traffic SaaS applications serving global customer base.",
      "Developed backend REST APIs and services using PHP/Laravel.",
      "Implemented frontend systems with Vue.js and modern JavaScript.",
      "Integrated Zuora's REST API for subscription and billing management.",
      "Successfully migrated ~200k No-IP customer products and data to Zuora using MySQL and Eloquent ORM.",
      "Created new payment processing system for No-IP customers using Laravel and Vue.js.",
    ],
  },
  {
    company: "International Game Technology (IGT)",
    role: "Application Developer (SDET)",
    period: "May 2016 – Dec 2017",
    bullets: [
      "Designed automated testing frameworks and internal tools for highly regulated slot machine games.",
      "Built custom Gantt chart tool to track team efficiency and roadmap progress.",
      "Partnered with development teams to reproduce defects, isolate root causes, and validate fixes for state-level testing.",
      "Helped define testing standards and best practices across teams.",
    ],
  },
  {
    company: "Accenture",
    role: "Technical Consultant",
    period: "Oct 2015 – May 2016",
    bullets: [
      "Developed native iOS applications in Swift for Intel's wearable ecosystem with real-time data visualization.",
      "Partnered with Intel engineering and product teams to translate hardware capabilities into scalable mobile features.",
      "Worked within fast-paced consulting delivery cycles balancing client expectations and production readiness.",
    ],
  },
];
