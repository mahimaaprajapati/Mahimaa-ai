import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        recruiter: resolve(__dirname, "recruiter.html"),
        developer: resolve(__dirname, "developer.html"),
        learner: resolve(__dirname, "learner.html"),
        stalker: resolve(__dirname, "stalker.html"),
        research: resolve(__dirname, "research.html"),
        projects: resolve(__dirname, "projects.html"),
        skills: resolve(__dirname, "skills.html"),
        milestones: resolve(__dirname, "milestones.html"),
        mahimaaAI: resolve(__dirname, "mahimaaAI/mahimaaAI.html"),
      },
    },
  },
});