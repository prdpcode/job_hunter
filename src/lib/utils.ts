import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Job } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateMatchScore(jobDescription: string): number {
  const pradeepSkills = [
    "Angular", "TypeScript", "JavaScript", "Next.js",
    "React", "Figma", "UI/UX", "ECharts", "Node.js",
    "Git", "REST API", "Agile", "Supabase", "CSS",
    "HTML", "Windsurf", "Cursor", "AI"
  ];
  
  const description = jobDescription.toLowerCase();
  let matchCount = 0;
  
  pradeepSkills.forEach(skill => {
    if (description.includes(skill.toLowerCase())) {
      matchCount++;
    }
  });
  
  return Math.round((matchCount / pradeepSkills.length) * 100);
}

export function getMatchBadge(score: number) {
  if (score >= 80) {
    return { text: "Great Match", color: "bg-green-600" };
  } else if (score >= 60) {
    return { text: "Good Match", color: "bg-yellow-600" };
  } else {
    return { text: "Partial Match", color: "bg-gray-600" };
  }
}

export function extractSkills(description: string): string[] {
  const allSkills = [
    "Angular", "React", "TypeScript", "Next.js", "Figma", "Node.js", 
    "AWS", "JavaScript", "CSS", "HTML", "UI/UX", "REST API", "Git",
    "Agile", "Supabase", "ECharts", "Windsurf", "Cursor", "AI"
  ];
  
  const descriptionLower = description.toLowerCase();
  const foundSkills: string[] = [];
  
  allSkills.forEach(skill => {
    if (descriptionLower.includes(skill.toLowerCase())) {
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
