import { Knowledge } from "@/types/knowledge";

export const KNOWLEDGE_QUERY_KEY = ["knowledges"] as const;

export async function fetchKnowledges({
  limit = 1000,
}: {
  limit?: number;
}): Promise<Knowledge[]> {
  const res = await fetch(`/api/knowledges?limit=${limit}`);

  if (!res.ok) {
    throw new Error("Failed to fetch knowledges");
  }

  const data = await res.json();
  return data.data;
}
