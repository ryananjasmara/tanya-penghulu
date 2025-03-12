import { NextRequest } from "next/server";
import prisma, { VoteType } from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";
import { z } from "zod";

const ChatVoteSchema = z.object({
  question: z.string().min(1),
  knowledgeId: z.string().min(1),
  vote: z.enum(["UPVOTE", "DOWNVOTE"]),
  feedback: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const [chatVotes, total] = await Promise.all([
      prisma.chatVote.findMany({
        skip,
        take: limit,
        include: {
          knowledge: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.chatVote.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return apiResponse({
      message: "Chat votes fetched successfully",
      data: chatVotes,
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
      message: "Failed to fetch chat votes",
      statusCode: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ChatVoteSchema.parse(body);

    const chatVote = await prisma.chatVote.create({
      data: {
        question: validatedData.question,
        knowledgeId: validatedData.knowledgeId,
        vote: validatedData.vote as VoteType,
        feedback: validatedData.feedback,
      },
    });

    return apiResponse({
      message: "Chat vote recorded successfully",
      data: chatVote,
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
