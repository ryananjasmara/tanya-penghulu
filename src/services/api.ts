import axios from "axios";
import { Knowledge } from "@/types/knowledge";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const knowledgeService = {
  getAll: async (): Promise<Knowledge[]> => {
    const { data } = await api.get<Knowledge[]>("/knowledges?limit=1000");
    return data;
  },
};
