import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { KnowledgeSchema } from "@/lib/validations/knowledge";
import { ZodError } from "zod";
import { apiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import {
  getCachedData,
  setCachedData,
  invalidateCache,
} from "@/lib/redis/cache";

const CACHE_KEY = "knowledges";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const cacheKey = `${CACHE_KEY}:page${page}:limit${limit}`;

    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      return apiResponse({
        message: "Knowledge retrieved from cache",
        ...cachedData,
      });
    }

    const skip = (page - 1) * limit;
    const [knowledges, total] = await Promise.all([
      prisma.knowledge.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.knowledge.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const response = {
      data: knowledges,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };

    await setCachedData(cacheKey, response);

    return apiResponse({
      message: "Knowledge retrieved successfully",
      ...response,
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to fetch knowledges",
      statusCode: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();

    const validatedData = KnowledgeSchema.parse(body);

    const knowledge = await prisma.knowledge.create({
      data: {
        keywords: validatedData.keywords,
        answer: validatedData.answer,
        category: validatedData.category,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "CREATE_KNOWLEDGE",
        description: `Created new knowledge: ${knowledge.id}`,
        type: session?.user ? "USER" : "SYSTEM",
        userId: session?.user?.id,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    });

    await invalidateCache([`${CACHE_KEY}:*`]);

    return apiResponse({
      message: "Knowledge created successfully",
      data: knowledge,
      statusCode: 201,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiResponse({
        status: false,
        message: "Invalid input data",
        error: error.errors,
        statusCode: 400,
      });
    }

    return apiResponse({
      status: false,
      message: "Failed to create knowledge",
      statusCode: 500,
    });
  }
}
