import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { KnowledgeSchema } from "@/lib/validations/knowledge";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { apiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getCachedData, setCachedData, invalidateCache } from "@/lib/redis/cache";

const CACHE_KEY = 'knowledges';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cacheKey = `${CACHE_KEY}:${params.id}`;
    
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      return apiResponse({
        message: "Knowledge retrieved from cache",
        data: cachedData,
      });
    }

    const knowledge = await prisma.knowledge.findUnique({
      where: { id: params.id },
    });

    if (!knowledge) {
      return apiResponse({
        status: false,
        message: "Knowledge not found",
        statusCode: 404,
      });
    }

    await setCachedData(cacheKey, knowledge);

    return apiResponse({
      message: "Knowledge retrieved successfully",
      data: knowledge,
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to fetch knowledge",
      statusCode: 500,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = KnowledgeSchema.parse(body);

    const knowledge = await prisma.knowledge.update({
      where: { id: params.id },
      data: {
        keywords: validatedData.keywords,
        answer: validatedData.answer,
        category: validatedData.category,
      },
    });

    await invalidateCache([
      `${CACHE_KEY}:${params.id}`,
      `${CACHE_KEY}:page*`,
    ]);

    await prisma.activityLog.create({
      data: {
        action: "UPDATE_KNOWLEDGE",
        description: `Updated knowledge: ${knowledge.id}`,
        type: session?.user ? "USER" : "SYSTEM",
        userId: session?.user?.id,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return apiResponse({
      message: "Knowledge updated successfully",
      data: knowledge,
      statusCode: 200,
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
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return apiResponse({
        status: false,
        message: "Knowledge not found",
        statusCode: 404,
      });
    }
    return apiResponse({
      status: false,
      message: "Failed to update knowledge",
      statusCode: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    await prisma.knowledge.delete({
      where: { id: params.id },
    });

    await invalidateCache([
      `${CACHE_KEY}:${params.id}`,
      `${CACHE_KEY}:page*`,
    ]);

    await prisma.activityLog.create({
      data: {
        action: "DELETE_KNOWLEDGE",
        description: `Deleted knowledge: ${params.id}`,
        type: session?.user ? "USER" : "SYSTEM",
        userId: session?.user?.id,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return apiResponse({
      message: "Knowledge deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return apiResponse({
        status: false,
        message: "Knowledge not found",
        statusCode: 404,
      });
    }
    return apiResponse({
      status: false,
      message: "Failed to delete knowledge",
      statusCode: 500,
    });
  }
}
