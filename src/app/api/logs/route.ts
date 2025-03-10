import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          action: true,
          description: true,
          ipAddress: true,
          type: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.activityLog.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return apiResponse({
      message: "Logs fetched successfully",
      data: logs,
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
      message: "Failed to fetch logs",
      statusCode: 500,
    });
  }
}
