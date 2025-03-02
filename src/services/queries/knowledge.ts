import { Knowledge } from "@/types/knowledge";

export const KNOWLEDGE_QUERY_KEY = ["knowledges"] as const;

export async function fetchKnowledges(): Promise<Knowledge[]> {
  const res = await fetch("/api/knowledges?limit=1000");

  if (!res.ok) {
    throw new Error("Failed to fetch knowledges");
  }

  const data = await res.json();
  return data.data;
}
