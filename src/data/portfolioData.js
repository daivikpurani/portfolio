export const personalInfo = {
  name: "Daivik Purani",
  title: "Software Engineer @ AWS TimestreamDB | Backend Engineer",
  email: "daivik.purani@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  github: "https://github.com/daivikpurani",
  linkedin: "https://linkedin.com/in/daivikpurani",
  website: "https://daivikpurani.dev",
  bio: "3+ years as a Backend Engineer — Built Kafka pipeline (150K+ events/day) infra saving $360K/year, and now working @ AWS TimestreamDB on Distributed Systems.",
  summary: "Experienced Software Engineer with 3+ years building scalable distributed systems. Currently working at Amazon Web Services on TimestreamDB, with proven expertise in Kafka pipelines, microservices architecture, and database optimization. Led development of systems processing 150K+ events/day and achieved $360K/year infrastructure savings."
};

export const skills = {
  languages: [
    { name: "Java", level: 95, category: "Backend" },
    { name: "Python", level: 90, category: "Backend" },
    { name: "TypeScript", level: 85, category: "Full Stack" },
    { name: "JavaScript", level: 85, category: "Full Stack" },
    { name: "SQL", level: 90, category: "Database" },
    { name: "C++", level: 75, category: "Systems" },
    { name: "C", level: 70, category: "Systems" },
    { name: "Bash", level: 80, category: "Scripting" }
  ],
  databases: [
    { name: "PostgreSQL", level: 95, category: "Relational" },
    { name: "MySQL", level: 85, category: "Relational" },
    { name: "MongoDB", level: 80, category: "NoSQL" },
    { name: "Redis", level: 85, category: "Cache" },
    { name: "DynamoDB", level: 75, category: "NoSQL" },
    { name: "RocksDB", level: 70, category: "Embedded" },
    { name: "InfluxDB", level: 70, category: "Time Series" },
    { name: "Pinecone", level: 75, category: "Vector" }
  ],
  frameworks: [
    { name: "Spring Boot", level: 90, category: "Backend" },
    { name: "React", level: 80, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Express.js", level: 85, category: "Backend" },
    { name: "FastAPI", level: 80, category: "Backend" },
    { name: "LangChain", level: 75, category: "AI/ML" },
    { name: "gRPC", level: 80, category: "RPC" },
    { name: "WebSockets", level: 75, category: "Real-time" }
  ],
  tools: [
    { name: "AWS", level: 90, category: "Cloud" },
    { name: "Docker", level: 85, category: "DevOps" },
    { name: "Kubernetes", level: 80, category: "DevOps" },
    { name: "Apache Kafka", level: 90, category: "Streaming" },
    { name: "Terraform", level: 75, category: "Infrastructure" },
    { name: "Git", level: 90, category: "Version Control" },
    { name: "Grafana", level: 80, category: "Monitoring" },
    { name: "Prometheus", level: 75, category: "Monitoring" }
  ]
};

export const projects = [
  {
    id: 1,
    title: "Distributed SQL Query Engine",
    description: "Designed and implemented a simplified distributed SQL engine in Java with gRPC-based coordinator and execution nodes supporting basic SELECT, WHERE, and JOIN queries across partitioned datasets.",
    longDescription: "Built a distributed SQL query engine from scratch using Java and gRPC for inter-node communication. The system supports parallel execution of SQL queries across partitioned datasets with rule-based query planning. Implemented fault tolerance using checkpointing and retry logic for failed worker nodes, with comprehensive instrumentation for tracing query lifecycle and execution timing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Java", "gRPC", "Distributed Systems", "SQL", "Parallel Processing"],
    category: "Distributed Systems",
    githubUrl: "https://github.com/daivikpurani/distributed-sql-engine",
    liveUrl: null,
    features: [
      "gRPC-based coordinator and execution nodes",
      "Parallel execution across partitioned datasets",
      "Rule-based query planning",
      "Fault tolerance with checkpointing and retry logic",
      "Comprehensive instrumentation and tracing"
    ],
    challenges: "Implementing distributed query planning and ensuring consistency across multiple execution nodes while handling node failures gracefully.",
    impact: "Demonstrated deep understanding of distributed data processing and optimization internals, showcasing expertise in building scalable database systems."
  },
  {
    id: 2,
    title: "Visual SQL Query Plan Explorer",
    description: "Built a web-based visualization tool for PostgreSQL EXPLAIN ANALYZE output, rendering execution plans with operator cost, row estimates, timing data, and bottleneck highlighting.",
    longDescription: "Created an interactive web application for visualizing PostgreSQL query execution plans. The tool parses EXPLAIN ANALYZE output and renders execution trees with detailed cost analysis, timing data, and performance bottlenecks. Features an Index Advisor that recommends missing indexes based on query plan heuristics and schema metadata.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["Python", "React", "PostgreSQL", "SQL Optimization", "Web Visualization"],
    category: "Database",
    githubUrl: "https://github.com/daivikpurani/sql-plan-explorer",
    liveUrl: "https://sql-plan-explorer.vercel.app",
    features: [
      "Interactive query plan visualization",
      "Cost analysis and timing data",
      "Bottleneck highlighting",
      "Index Advisor recommendations",
      "Schema metadata integration"
    ],
    challenges: "Parsing complex PostgreSQL EXPLAIN output and creating intuitive visualizations for database optimization workflows.",
    impact: "Helped developers and DBAs optimize large SQL queries by providing clear visual insights into query execution performance."
  },
  {
    id: 3,
    title: "Kafka Event Pipeline System",
    description: "Led development of a distributed Kafka-based event pipeline processing over 150,000 events per day, replacing four legacy services with 99.99% uptime.",
    longDescription: "Architected and implemented a high-throughput event processing system using Apache Kafka to replace multiple legacy services. The system processes over 150,000 events daily with safe retries, idempotency controls, and structured observability. Achieved 99.99% system uptime and significantly improved traceability across workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Apache Kafka", "Java", "Spring Boot", "Microservices", "AWS"],
    category: "Backend",
    githubUrl: "https://github.com/daivikpurani/kafka-pipeline",
    liveUrl: null,
    features: [
      "150K+ events per day processing",
      "Safe retries and idempotency controls",
      "Structured observability across services",
      "99.99% system uptime",
      "Legacy service migration"
    ],
    challenges: "Ensuring data consistency and fault tolerance while processing high-volume events across distributed services.",
    impact: "Replaced four legacy services, improved system reliability, and enhanced traceability for 70,000+ monthly users."
  },
  {
    id: 4,
    title: "Document Ingestion Microservice",
    description: "Architected and deployed a high-throughput document ingestion microservice using Java, AWS S3, and Lambda scaling to 1,500+ uploads/min.",
    longDescription: "Built a scalable document processing system using Java microservices architecture with AWS S3 pre-signed URLs and Lambda functions. The system handles high-volume document uploads with intelligent load balancing and processing optimization. Reduced backend load by 80% and cut infrastructure costs by $360,000 annually.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Java", "AWS S3", "AWS Lambda", "Microservices", "Spring Boot"],
    category: "Backend",
    githubUrl: "https://github.com/daivikpurani/document-ingestion",
    liveUrl: null,
    features: [
      "1,500+ uploads per minute capacity",
      "AWS S3 pre-signed URLs",
      "Lambda-based processing",
      "80% backend load reduction",
      "$360K annual cost savings"
    ],
    challenges: "Designing a system that can handle massive concurrent uploads while maintaining data integrity and processing efficiency.",
    impact: "Achieved significant cost savings and improved system performance for document processing workflows."
  },
  {
    id: 5,
    title: "Semantic Search Engine",
    description: "Designed and deployed a production-grade semantic search engine indexing over 5,000 academic papers using RAG pipelines and Pinecone vector databases.",
    longDescription: "Built a comprehensive semantic search system for academic research using RAG (Retrieval-Augmented Generation) pipelines and Pinecone vector databases. The system indexes over 5,000 academic papers and provides sub-second search latency for 25+ concurrent users. Features GPU-backed APIs and horizontal scalability for production environments.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    technologies: ["Python", "Pinecone", "OpenAI APIs", "LangChain", "RAG", "Vector Databases"],
    category: "AI/ML",
    githubUrl: "https://github.com/daivikpurani/semantic-search",
    liveUrl: "https://semantic-search-demo.streamlit.app",
    features: [
      "5,000+ academic papers indexed",
      "Sub-second search latency",
      "RAG pipeline implementation",
      "GPU-backed APIs",
      "Horizontal scalability"
    ],
    challenges: "Implementing efficient vector search and retrieval while maintaining low latency for concurrent users.",
    impact: "Enabled researchers to quickly find relevant academic papers through semantic search, improving research efficiency."
  },
  {
    id: 6,
    title: "AI-Assisted Grading System",
    description: "Built an AI-assisted grading system integrating static analysis, plagiarism detection, and ML-based scoring for automated evaluation of exams and code.",
    longDescription: "Developed a comprehensive AI-powered grading platform that combines static code analysis, plagiarism detection, and machine learning-based scoring. The system includes instructor-in-the-loop review workflows with real-time dashboards showing cohort-level learning gaps and grading trends. Designed for automated evaluation of programming assignments and exams.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    technologies: ["Python", "Machine Learning", "Static Analysis", "Plagiarism Detection", "React"],
    category: "AI/ML",
    githubUrl: "https://github.com/daivikpurani/ai-grading-system",
    liveUrl: "https://ai-grading-demo.netlify.app",
    features: [
      "Static code analysis integration",
      "Plagiarism detection algorithms",
      "ML-based scoring system",
      "Instructor review workflows",
      "Real-time analytics dashboards"
    ],
    challenges: "Balancing automated grading accuracy with instructor oversight while providing meaningful feedback to students.",
    impact: "Streamlined grading processes for instructors while providing detailed analytics on student performance and learning gaps."
  }
];

export const experience = [
  {
    company: "Amazon Web Services (AWS)",
    position: "Software Engineer - TimeStream DB Internship",
    duration: "Sept 2025 - Present",
    description: "Developing and enhancing distributed subsystems for Amazon's time-series database (Timestream), focusing on scalability, performance, and fault tolerance in large-scale production clusters.",
    achievements: [
      "Contributed to internal query execution logic and storage layer optimizations",
      "Leveraged deep understanding of time-series data workloads",
      "Worked on distributed systems architecture for large-scale production clusters"
    ]
  },
  {
    company: "MediBuddy",
    position: "Software Engineer II - Core Platform Team",
    duration: "Aug 2021 - June 2023",
    description: "Led end-to-end development of distributed systems and microservices architecture, processing over 150,000 events per day and achieving significant cost savings.",
    achievements: [
      "Built Kafka-based event pipeline processing 150K+ events/day, achieving 99.99% uptime",
      "Architected document ingestion microservice scaling to 1,500+ uploads/min, saving $360K/year",
      "Re-engineered lab booking systems reducing latency from 4s to 70ms, improving throughput by 200%",
      "Led AngularJS-to-React migration across 1,000+ diagnostic labs",
      "Boosted backend API performance by 30% via SQL optimization and index tuning"
    ]
  },
  {
    company: "San Francisco State University",
    position: "Research Assistant - CS Dept",
    duration: "Jan 2025 - Present",
    description: "Designed and deployed production-grade semantic search engine and AI-assisted grading system using modern AI/ML technologies.",
    achievements: [
      "Built semantic search engine indexing 5,000+ academic papers with sub-second latency",
      "Created AI-assisted grading system with plagiarism detection and ML-based scoring",
      "Implemented instructor-in-the-loop review workflows with real-time dashboards"
    ]
  },
  {
    company: "Wheebox",
    position: "Software Engineer - New Projects",
    duration: "Aug 2020 - Dec 2020",
    description: "Created and deployed distributed online coding platform supporting 1,000+ concurrent users with real-time assessment capabilities.",
    achievements: [
      "Built distributed coding platform supporting 1,000+ concurrent users with sub-second latency",
      "Automated PostgreSQL RDS hibernation saving $300/month in staging costs",
      "Optimized request flow and asynchronous execution for real-time assessments"
    ]
  }
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "San Francisco State University",
    year: "Aug 2023 - Dec 2025",
    gpa: "3.60/4.00",
    relevant_courses: ["Distributed Systems", "Advanced Database Systems", "Software Architecture", "Advanced Networks", "Generative AI"],
    achievements: ["Teaching Assistant: Advanced Algorithms | Generative AI"]
  },
  {
    degree: "Bachelor of Engineering (Hons.) in Computer Science",
    school: "Birla Institute of Technology and Science, Pilani",
    year: "Aug 2017 - May 2021",
    gpa: "3.7/4.0",
    relevant_courses: ["Database Systems", "Operating Systems", "Object Oriented Design Patterns", "Data Structures & Algorithms", "Computer Networks"],
    achievements: ["Research Assistant: Software Engineering"]
  }
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    credential_id: "AWS-SAA-123456"
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    year: "2022",
    credential_id: "CKA-789012"
  },
  {
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    year: "2021",
    credential_id: "MCD-345678"
  }
];
