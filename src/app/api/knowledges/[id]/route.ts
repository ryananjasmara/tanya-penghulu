import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { KnowledgeSchema } from "@/lib/validations/knowledge";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { apiResponse } from "@/lib/api-response";

interface RouteContext {
  id: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<RouteContext> }
) {
  try {
    const knowledge = await prisma.knowledge.findUnique({
      where: {
        id: (await params).id,
      },
    });

    if (!knowledge) {
      return apiResponse({
        status: false,
        message: "Knowledge not found",
        statusCode: 404,
      });
    }

    return apiResponse({
      message: "Knowledge retrieved successfully",
      data: knowledge,
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to fetch knowledge",
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<RouteContext> }
) {
  try {
    const body = await request.json();
    const validatedData = KnowledgeSchema.parse(body);

    const knowledge = await prisma.knowledge.update({
      where: { id: (await params).id },
      data: {
        keywords: validatedData.keywords,
        answer: validatedData.answer,
        category: validatedData.category,
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
  _request: NextRequest,
  { params }: { params: Promise<RouteContext> }
) {
  try {
    await prisma.knowledge.delete({
      where: { id: (await params).id },
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
