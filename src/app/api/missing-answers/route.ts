import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";
import { z } from "zod";

const MissingAnswerSchema = z.object({
  question: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const [missingAnswers, total] = await Promise.all([
      prisma.missingAnswer.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.missingAnswer.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return apiResponse({
      message: "Missing answers fetched successfully",
      data: missingAnswers,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to fetch missing answers",
      statusCode: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = MissingAnswerSchema.parse(body);

    const missingAnswer = await prisma.missingAnswer.create({
      data: {
        question: validatedData.question,
      },
    });

    return apiResponse({
      message: "Question recorded successfully",
      data: missingAnswer,
      statusCode: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiResponse({
        status: false,
        message: "Invalid input data",
        error: error.errors,
        statusCode: 400,
      });
    }

    return apiResponse({
      status: false,
      message: "Failed to record question",
      statusCode: 500,
    });
  }
}
