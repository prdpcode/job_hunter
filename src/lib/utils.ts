import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Job } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateMatchScore(jobDescription: string): number {
  const skillMappings = {
    "Angular": ["angular", "angularjs", "angular.js", "angular 2", "angular 10", "angular 15", "angular 20"],
    "TypeScript": ["typescript", "ts", ".ts", "typescript 5"],
    "JavaScript": ["javascript", "js", ".js", "es6", "es2015", "es2020", "node", "nodejs"],
    "Next.js": ["next.js", "nextjs", "next js", "next 13", "next 14", "next 15"],
    "React": ["react", "reactjs", "react.js", "react 18", "react native", "jsx", "tsx"],
    "Figma": ["figma", "ui design", "ux design", "prototyping"],
    "UI/UX": ["ui/ux", "ui ux", "user interface", "user experience", "ux design", "ui design"],
    "ECharts": ["echarts", "charts", "data visualization", "d3", "chart.js", "graphing"],
    "Node.js": ["node.js", "nodejs", "node", "backend", "server", "express"],
    "Git": ["git", "github", "gitlab", "version control", "repository"],
    "REST API": ["rest", "restful", "api", "rest api", "web api", "endpoint"],
    "Agile": ["agile", "scrum", "kanban", "sprint", "iteration"],
    "Supabase": ["supabase", "firebase", "database", "backend as a service"],
    "CSS": ["css", "css3", "tailwind", "sass", "scss", "styling", "stylesheets"],
    "HTML": ["html", "html5", "markup", "semantic html"],
    "AI": ["ai", "artificial intelligence", "machine learning", "ml", "openai", "chatgpt"],
    "Windsurf": ["windsurf", "cursor", "ai-native", "ai coding", "code assistant"]
  };
  
  const description = jobDescription.toLowerCase();
  let matchCount = 0;
  const totalSkills = Object.keys(skillMappings).length;
  
  Object.entries(skillMappings).forEach(([skill, keywords]) => {
    const hasMatch = keywords.some(keyword => {
      // Check for exact word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(description);
    });
    
    if (hasMatch) {
      matchCount++;
    }
  });
  
  return Math.round((matchCount / totalSkills) * 100);
}

export function getMatchBadge(score: number) {
  if (score >= 80) {
    return { text: "Great Match", color: "bg-green-600" };
  } else if (score >= 60) {
    return { text: "Good Match", color: "bg-yellow-600" };
  } else if (score >= 40) {
    return { text: "Decent Match", color: "bg-blue-600" };
  } else {
    return { text: "Partial Match", color: "bg-gray-600" };
  }
}

export function extractSkills(description: string): string[] {
  const skillMappings = {
    "Angular": ["angular", "angularjs", "angular.js", "angular 2", "angular 10", "angular 15", "angular 20"],
    "TypeScript": ["typescript", "ts", ".ts", "typescript 5"],
    "JavaScript": ["javascript", "js", ".js", "es6", "es2015", "es2020", "node", "nodejs"],
    "Next.js": ["next.js", "nextjs", "next js", "next 13", "next 14", "next 15"],
    "React": ["react", "reactjs", "react.js", "react 18", "react native", "jsx", "tsx"],
    "Figma": ["figma", "ui design", "ux design", "prototyping"],
    "UI/UX": ["ui/ux", "ui ux", "user interface", "user experience", "ux design", "ui design"],
    "ECharts": ["echarts", "charts", "data visualization", "d3", "chart.js", "graphing"],
    "Node.js": ["node.js", "nodejs", "node", "backend", "server", "express"],
    "Git": ["git", "github", "gitlab", "version control", "repository"],
    "REST API": ["rest", "restful", "api", "rest api", "web api", "endpoint"],
    "Agile": ["agile", "scrum", "kanban", "sprint", "iteration"],
    "Supabase": ["supabase", "firebase", "database", "backend as a service"],
    "CSS": ["css", "css3", "tailwind", "sass", "scss", "styling", "stylesheets"],
    "HTML": ["html", "html5", "markup", "semantic html"],
    "AI": ["ai", "artificial intelligence", "machine learning", "ml", "openai", "chatgpt"],
    "Windsurf": ["windsurf", "cursor", "ai-native", "ai coding", "code assistant"]
  };
  
  const descriptionLower = description.toLowerCase();
  const foundSkills: string[] = [];
  
  Object.entries(skillMappings).forEach(([skill, keywords]) => {
    const hasMatch = keywords.some(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(descriptionLower);
    });
    
    if (hasMatch) {
      foundSkills.push(skill);
    }
  });
  
  return foundSkills.slice(0, 6); // Limit to 6 skills
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function getCompanyLogo(companyName: string): string {
  return `https://unavatar.io/${encodeURIComponent(companyName)}`;
}
