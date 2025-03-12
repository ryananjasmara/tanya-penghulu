import { z } from "zod";

export const KnowledgeSchema = z.object({
  keywords: z.array(z.string()).min(1),
  answer: z.string().min(10),
  category: z.string().min(1),
});
