export interface SkillGroup {
  id: string;
  title: string;
  /** Prose from the portfolio entries, kept as written. */
  summary: string;
  tags: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend and systems",
    summary:
      "Java and Spring Boot are where I've done my most demanding production work, including Spring Batch and a 200,000-line codebase with strict test coverage. Python with FastAPI is my default for new backends and tooling. I'm comfortable with PostgreSQL and SQL in general, REST API design with OpenAPI, Docker, and Git-based workflows.",
    tags: ["Java", "Spring Boot", "Spring Batch", "Python", "FastAPI", "PostgreSQL", "SQL", "OpenAPI", "Docker", "Git"],
  },
  {
    id: "ai",
    title: "AI and LLM applications",
    summary:
      "Retrieval-augmented generation end to end: ingestion, embeddings, vector storage with pgvector, retrieval and re-ranking, including multimodal retrieval over images and tables. On the application side, structured outputs, model fallbacks, context separation and error handling around LLM calls, with LangChain, OpenAI and Gemini. Some computer-vision experience with CLIP, DINOv2 and OpenCV.",
    tags: ["RAG", "pgvector", "Re-ranking", "Structured outputs", "LangChain", "OpenAI", "Gemini", "CLIP", "DINOv2", "OpenCV"],
  },
  {
    id: "frontend",
    title: "Frontend and interactive",
    summary:
      "React and TypeScript with Vite, Tailwind and shadcn for web interfaces; Angular from professional work. Desktop applications with Tauri. 3D and motion on the web with Three.js, React Three Fiber, GSAP and Spline, and game development in Unity with C#.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "shadcn", "Angular", "Tauri", "Three.js", "GSAP", "Unity"],
  },
  {
    id: "deployment",
    title: "Deployment and tooling",
    summary:
      "Cloudflare Pages, Workers and KV; GitHub Actions for automation and publishing pipelines; Render. I use AI coding tools daily for analysis, implementation, debugging and review, and treat them as part of the workflow rather than a substitute for it.",
    tags: ["Cloudflare Pages", "Workers", "KV", "GitHub Actions", "Render"],
  },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "C1" },
  { name: "English", level: "C1" },
  { name: "German", level: "A2" },
  { name: "Spanish", level: "A2" },
];

export const alsoKnown = ["C", "C++", "C#", "Haskell", "JavaScript", "SQL", "JUnit", "Mockito", "Unity", "OpenCV"];
