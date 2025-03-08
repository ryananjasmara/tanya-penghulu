import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";
import { z } from "zod";

const MissingAnswerSchema = z.object({
  question: z.string().min(1),
});

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
