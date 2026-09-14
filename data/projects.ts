export type CaseStudy = {
  situation: string;
  challenges: string;
  approach: string[];
  decisions: string[];
  result: string;
};

export type Project = {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  industry: string;
  projectType: string;
  year: number;
  summary: string;
  features: string[];
  tags: string[];
  images: string[];
  links?: { github?: string; live?: string };
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "estateiq",
    code: "PROJ-01",
    title: "EstateIQ",
    subtitle: "AI REAL ESTATE UNDERWRITING PLATFORM",
    industry: "Commercial Real Estate",
    projectType: "AI SaaS / Data Intelligence",
    year: 2026,
    summary:
      "An AI-powered underwriting workspace for commercial real-estate investment teams. Analysts upload rent rolls, operating statements, property documents and market data, and the platform turns them into structured financial analysis — property metrics, risk indicators, AI-generated insights and investment reports instead of manual spreadsheet and PDF review.",
    features: [
      "Property portfolio dashboard",
      "Excel/CSV/PDF ingestion",
      "Automated document extraction",
      "NOI, cap rate and cash-flow calculations",
      "Property risk scoring",
      "AI underwriting assistant",
      "Comparable-property analysis",
      "Scenario modeling",
      "Investment memo generation",
      "PDF report export",
      "Role-based access",
      "Audit history",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "RAG",
      "AWS",
    ],
    images: ["/projects/estateiq-dashboard.png"],
    caseStudy: {
      situation:
        "A fictional commercial-property investment firm evaluates dozens of acquisition opportunities each month. Analysts spend significant time converting inconsistent spreadsheets, rent rolls and PDFs into standardized underwriting models.",
      challenges:
        "Documents arrive in different formats, important assumptions can be buried in files, calculations need traceability, and investment teams need answers quickly without trusting an opaque AI-generated number.",
      approach: [
        "Built a centralized underwriting pipeline that extracts and validates property information before running deterministic financial calculations.",
        "Used AI for document interpretation, anomaly detection and narrative analysis, while keeping the core financial calculations transparent and auditable.",
      ],
      decisions: [
        "FastAPI handles the ingestion and analysis services; PostgreSQL stores normalized financial data.",
        "Background workers process larger documents so uploads never block the interface.",
        "React provides an interactive underwriting workspace over the structured results.",
        "RAG grounds AI responses in the uploaded property documents, and AWS object storage keeps source files separate from structured data.",
      ],
      result:
        "The sample implementation demonstrates how an investment team could reduce repetitive document processing, standardize underwriting and move from raw property files to an investment-ready analysis significantly faster.",
    },
  },
  {
    slug: "buildflow-ai",
    code: "PROJ-02",
    title: "BuildFlow AI",
    subtitle: "CONSTRUCTION OPERATIONS PLATFORM",
    industry: "Construction",
    projectType: "Full-Stack SaaS / AI Operations",
    year: 2026,
    summary:
      "A unified operating platform for general contractors managing projects, subcontractors, budgets, schedules, change orders and project documentation. AI continuously analyzes operational data to identify schedule and cost risks before they surface in a monthly report.",
    features: [
      "Multi-project dashboard",
      "Project scheduling",
      "Budget vs. actual tracking",
      "Subcontractor management",
      "Change orders",
      "RFIs",
      "Document management",
      "Invoice processing",
      "Project timeline",
      "AI project-risk detection",
      "Automated weekly reports",
      "Executive dashboards",
      "Email/Teams notifications",
    ],
    tags: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Azure",
      "Docker",
    ],
    images: ["/projects/buildflow-ai-dashboard.png"],
    caseStudy: {
      situation:
        "A fictional regional contractor manages 25 active construction projects using spreadsheets, email and several disconnected systems.",
      challenges:
        "Project managers struggle to see cost overruns early. Change orders may exist in email while budgets live in spreadsheets and project documents exist elsewhere.",
      approach: [
        "Centralized project, budget, scheduling, subcontractor and document data into a unified operational model.",
        "Developed dashboards around budget performance, schedule progress and overall project health.",
        "Added an AI analysis service that monitors project activity and highlights potential cost and scheduling risks.",
      ],
      decisions: [
        "React provides the operational interface; Python services handle financial calculations, document extraction and AI analysis.",
        "PostgreSQL maintains transactional consistency and Redis supports asynchronous processing.",
        "Containerized services deploy through an automated Azure CI/CD pipeline.",
      ],
      result:
        "The hypothetical system shows how leadership could obtain earlier visibility into project risk, reduce fragmented workflows and give project managers one operational source of truth.",
    },
  },
  {
    slug: "worksphere-365",
    code: "PROJ-03",
    title: "WorkSphere 365",
    subtitle: "MICROSOFT 365 EMPLOYEE OPERATIONS HUB",
    industry: "Enterprise / Corporate Operations",
    projectType: "Microsoft 365 / Power Platform",
    year: 2025,
    summary:
      "An enterprise employee-service environment built around the Microsoft ecosystem. Employees use one portal for requests, approvals, policies, documents and internal services instead of relying on email threads and shared mailboxes.",
    features: [
      "SharePoint employee portal",
      "Employee onboarding",
      "Purchase requests",
      "PTO/request workflows",
      "IT service requests",
      "Document libraries",
      "Approval workflows",
      "Teams notifications",
      "Employee knowledge assistant",
      "Management dashboards",
      "Role-based permissions",
      "Audit trails",
    ],
    tags: [
      "SharePoint Online",
      "Power Apps",
      "Power Automate",
      "Microsoft Graph",
      "Entra ID",
      "Power BI",
      "Azure Functions",
      "React",
    ],
    images: ["/projects/worksphere-365-portal.png"],
    caseStudy: {
      situation:
        "A fictional 500-person professional-services organization handles employee requests through shared mailboxes, Excel sheets and manually routed documents.",
      challenges:
        "Employees don't know request status, managers receive approval requests through different channels, documents become duplicated, and operations teams spend time manually updating records.",
      approach: [
        "Used Microsoft 365 as the foundation of the employee operations environment rather than replacing the organization's existing ecosystem.",
        "Made SharePoint the information and document layer, with Power Apps handling structured employee requests.",
        "Managed approvals and workflow automation through Power Automate.",
      ],
      decisions: [
        "Entra ID provides identity and role-based access.",
        "Teams adaptive notifications bring approvals into workflows people already use.",
        "Microsoft Graph connects the custom services, and Azure Functions with Python handle functionality that exceeds low-code limits.",
      ],
      result:
        "The demonstration illustrates how an organization could replace fragmented email-based processes with traceable digital workflows while continuing to use its existing Microsoft 365 environment.",
    },
  },
  {
    slug: "documind",
    code: "PROJ-04",
    title: "DocuMind",
    subtitle: "AI DOCUMENT INTELLIGENCE WORKSPACE",
    industry: "Legal / Consulting / Professional Services",
    projectType: "Generative AI / RAG",
    year: 2026,
    summary:
      "An enterprise knowledge platform that understands thousands of contracts, reports, policies and business documents. Users don't simply chat with PDFs — they search, compare, classify and extract structured knowledge from an organization's document library.",
    features: [
      "PDF/DOCX/XLSX ingestion",
      "OCR/document extraction",
      "Automatic classification",
      "Semantic search",
      "AI Q&A",
      "Source citations",
      "Contract clause extraction",
      "Document comparison",
      "Obligation/deadline extraction",
      "Knowledge collections",
      "SharePoint/OneDrive integration",
      "Permission-aware retrieval",
      "Audit logging",
    ],
    tags: [
      "React",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Vector DB",
      "Embeddings",
      "RAG",
      "Microsoft Graph",
    ],
    images: ["/projects/documind-dashboard.png"],
    caseStudy: {
      situation:
        "A fictional consulting organization maintains thousands of client documents across SharePoint, including contracts, reports and policy documents.",
      challenges:
        "Keyword search frequently misses contextual information, employees spend substantial time opening documents individually, and confidential material cannot be exposed to unauthorized users through AI search.",
      approach: [
        "Developed a permission-aware RAG architecture that indexes document content together with metadata and access-control information.",
        "Enabled employees to search, compare and analyze enterprise documents with AI answers grounded in authorized source material.",
      ],
      decisions: [
        "Python manages ingestion, chunking, embeddings and retrieval.",
        "A vector index supports semantic search while PostgreSQL stores metadata and permissions.",
        "Microsoft Graph synchronizes SharePoint content along with its authorization context.",
        "The LLM only ever receives retrieved content the authenticated user is permitted to access.",
      ],
      result:
        "The sample system demonstrates enterprise AI beyond a basic chatbot: faster knowledge discovery while preserving citations, document permissions and traceability.",
    },
  },
  {
    slug: "commercepulse-ai",
    code: "PROJ-05",
    title: "CommercePulse AI",
    subtitle: "E-COMMERCE GROWTH INTELLIGENCE",
    industry: "E-commerce / Retail",
    projectType: "AI Analytics Platform",
    year: 2025,
    summary:
      "A unified analytics platform that combines orders, products, customers and marketing performance, then layers an AI business analyst on top so teams can ask why a number moved rather than only seeing that it did.",
    features: [
      "Revenue dashboard",
      "Order analytics",
      "Product performance",
      "Customer segmentation",
      "Conversion funnels",
      "Marketing attribution",
      "Inventory monitoring",
      "Demand forecasting",
      "Anomaly detection",
      "AI analytics assistant",
      "Natural-language queries",
      "Automated executive summaries",
    ],
    tags: [
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Data pipelines",
      "LLM APIs",
      "AWS",
    ],
    images: ["/projects/commercepulse-ai-dashboard.png"],
    caseStudy: {
      situation:
        "A fictional DTC brand generates millions in annual online sales but reviews Shopify, advertising and customer data separately.",
      challenges:
        "Management knows what changed from dashboards but often cannot quickly determine why. Marketing, inventory and sales signals need to be analyzed together.",
      approach: [
        "Created data-ingestion pipelines that normalize commerce, customer, inventory and marketing information into a unified analytics model.",
        "Added an AI analysis layer that investigates performance changes across channels and generates contextual insights from validated data.",
      ],
      decisions: [
        "Python ETL workers periodically synchronize the external commerce and advertising APIs.",
        "PostgreSQL stores normalized business metrics and scheduled jobs calculate KPIs.",
        "React provides interactive exploration of the resulting metrics.",
        "The AI service calls validated analytical functions instead of calculating critical metrics directly from prompts.",
      ],
      result:
        "The hypothetical platform demonstrates how executives could move from several disconnected dashboards to a unified explanation of business performance and faster data-driven decisions.",
    },
  },
  {
    slug: "fieldpilot-ai",
    code: "PROJ-06",
    title: "FieldPilot AI",
    subtitle: "INTELLIGENT FIELD SERVICE PLATFORM",
    industry: "HVAC / Plumbing / Maintenance / Home Services",
    projectType: "SaaS / Mobile / Voice AI",
    year: 2025,
    summary:
      "A complete operating platform for businesses that dispatch technicians to customer locations — covering customer requests, dispatch, scheduling, on-site work and invoicing, with AI turning unstructured calls and voice notes into structured operational data.",
    features: [
      "Customer CRM",
      "Work orders",
      "Dispatch board",
      "Technician scheduling",
      "Map/location interface",
      "Mobile/PWA technician application",
      "Job photos",
      "Quotes and invoices",
      "Customer history",
      "Voice-to-job-notes",
      "AI ticket classification",
      "Intelligent technician matching",
      "Automated customer notifications",
      "Operations analytics",
    ],
    tags: [
      "React PWA",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "WebSockets",
      "Maps APIs",
      "Speech-to-text",
      "AWS",
    ],
    images: ["/projects/fieldpilot-ai-dashboard.png"],
    caseStudy: {
      situation:
        "A fictional HVAC company operates 20 service vehicles and receives customer requests through calls, text messages and email.",
      challenges:
        "Dispatchers manually interpret problems, technician notes are inconsistent, scheduling requires knowledge of technician skills, and customers frequently call for status updates.",
      approach: [
        "Developed a structured operational workflow covering customer requests, dispatching, technician scheduling, service completion and invoicing.",
        "Used AI to transform unstructured customer descriptions and technician voice notes into structured operational data, cutting the manual data entry required from dispatchers and field technicians.",
      ],
      decisions: [
        "A React PWA lets technicians work from their phones without maintaining separate native applications.",
        "FastAPI exposes the scheduling and work-order services.",
        "WebSockets keep the dispatch board updated in real time.",
        "Speech-to-text and LLM structured-output models process technician notes.",
      ],
      result:
        "The scenario demonstrates how field-service businesses could reduce administrative work, improve dispatch visibility and capture cleaner operational information without adding extra work for technicians.",
    },
  },
  {
    slug: "finsight",
    code: "PROJ-07",
    title: "FinSight",
    subtitle: "AI FINANCIAL PLANNING & FORECASTING PLATFORM",
    industry: "Finance / Corporate FP&A",
    projectType: "Data Engineering / AI Analytics",
    year: 2025,
    summary:
      "A financial intelligence workspace that consolidates actual results, budgets and forecasts, and helps finance teams investigate variance through trusted calculations and natural-language reporting.",
    features: [
      "Executive financial dashboard",
      "P&L reporting",
      "Cash-flow monitoring",
      "Budget vs. actual",
      "Department analysis",
      "Rolling forecasts",
      "Scenario modeling",
      "Variance detection",
      "Excel import/export",
      "AI financial analyst",
      "Natural-language reporting",
      "Automated monthly reports",
    ],
    tags: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Pandas / Polars",
      "PostgreSQL",
      "LLM APIs",
      "Azure",
    ],
    images: ["/projects/finSight.png"],
    caseStudy: {
      situation:
        "A fictional multi-location services company creates monthly financial reports from spreadsheets exported from several business systems.",
      challenges:
        "Finance spends days cleaning information before analysis can begin. Forecast versions are difficult to track and management repeatedly asks finance to explain changing numbers.",
      approach: [
        "Established a standardized financial data model and an automated ingestion pipeline for actuals, budgets and forecasts.",
        "Generated trusted KPIs from deterministic financial calculations.",
        "Added an AI analysis layer that explains material variances and lets users investigate performance through natural-language queries.",
      ],
      decisions: [
        "Python handles transformation and financial computation.",
        "PostgreSQL stores versioned actual, budget and forecast data.",
        "React provides the scenario modeling interface.",
        "AI operates through controlled analytical tools, so financial values come from the calculation engine rather than model output.",
      ],
      result:
        "The sample implementation demonstrates a shorter reporting cycle, repeatable forecasting and management access to explanations without compromising financial calculation integrity.",
    },
  },
  {
    slug: "careconnect-ai",
    code: "PROJ-08",
    title: "CareConnect AI",
    subtitle: "HEALTHCARE OPERATIONS & PATIENT ENGAGEMENT",
    industry: "Healthcare",
    projectType: "Secure Full-Stack / AI Workflow",
    year: 2025,
    summary:
      "A patient and clinic operations platform focused on scheduling, communication, intake and administrative automation. The project is as much about security, privacy and sensitive-data architecture as it is about features.",
    features: [
      "Patient portal",
      "Appointment scheduling",
      "Digital intake forms",
      "Provider schedules",
      "Patient communication",
      "Document management",
      "Operations dashboard",
      "AI administrative assistant",
      "Appointment summarization",
      "Knowledge assistant",
      "Staff task management",
      "Audit logging",
      "Fine-grained permissions",
    ],
    tags: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "OAuth / OIDC",
      "Encrypted storage",
      "Azure",
    ],
    images: ["/projects/careconnect-ai.png"],
    caseStudy: {
      situation:
        "A fictional multi-location outpatient clinic carries a significant administrative workload from appointment requests, intake documents and repetitive patient questions.",
      challenges:
        "Patient information is sensitive, staff roles require different levels of access, administrative automation must not be confused with clinical decision-making, and every important action requires traceability.",
      approach: [
        "Separated patient-facing workflows, internal operations and AI services into clearly defined security boundaries.",
        "Applied AI to administrative workflows — request classification, information retrieval, intake summarization and staff assistance — while keeping sensitive actions under human oversight.",
      ],
      decisions: [
        "OIDC-based authentication and role-based authorization protect the application services.",
        "Sensitive information is encrypted in transit and at rest.",
        "Comprehensive audit logging records data access.",
        "AI services receive only the minimum context necessary for each permitted workflow.",
      ],
      result:
        "This hypothetical implementation demonstrates how modern AI automation could reduce routine administrative workload while keeping privacy, permissions and human oversight central to the architecture.",
    },
  },
  {
    slug: "cloudops-ai",
    code: "PROJ-09",
    title: "CloudOps AI",
    subtitle: "DEVOPS & CLOUD OBSERVABILITY PLATFORM",
    industry: "SaaS / Technology",
    projectType: "DevOps / Cloud Engineering / AIOps",
    year: 2026,
    summary:
      "A centralized engineering platform for deploying, monitoring and managing distributed cloud applications. Where the other projects demonstrate applications, this one covers how those applications actually run in production.",
    features: [
      "Service health dashboard",
      "Deployment history",
      "CI/CD visibility",
      "Environment management",
      "Infrastructure monitoring",
      "Logs and metrics",
      "Alert management",
      "Incident timelines",
      "Kubernetes workload visibility",
      "Cloud-cost monitoring",
      "AI log investigation",
      "AI incident summaries",
      "Deployment rollback",
      "Infrastructure-as-code workflow",
    ],
    tags: [
      "React",
      "Python",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "OpenTelemetry",
      "AWS / Azure",
    ],
    images: ["/projects/cloudops-ai.png"],
    caseStudy: {
      situation:
        "A fictional SaaS company operates several React and Python services across development, staging and production environments.",
      challenges:
        "Engineers switch between CI/CD systems, cloud consoles, logs and monitoring products when investigating incidents, and deployment context is frequently disconnected from operational telemetry.",
      approach: [
        "Created a centralized engineering control plane that aggregates deployment, infrastructure, logging, metrics and observability data.",
        "Correlated operational incidents with deployment events so engineers can investigate system behaviour from a single interface.",
        "Used AI to summarize logs and incident context and shorten troubleshooting.",
      ],
      decisions: [
        "Kubernetes provides container orchestration and Terraform defines reproducible infrastructure.",
        "CI/CD pipelines automate testing and deployment.",
        "OpenTelemetry standardizes application telemetry.",
        "Python services aggregate operational information, and AI summarizes logs and incident context without autonomous control over production infrastructure.",
      ],
      result:
        "The sample demonstrates a repeatable deployment architecture, improved operational visibility and faster incident investigation while keeping consequential production actions under engineer control.",
    },
  },
];
