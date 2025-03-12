import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/api-response";
import { format, subDays } from "date-fns";

type DailyCount = {
  createdAt: Date;
  _count: {
    id: number;
  };
};

export async function GET() {
  try {
    const [
      userStats,
      knowledgeStats,
      positiveFeedbackStats,
      negativeFeedbackStats,
      missingAnswerStats,
    ] = await Promise.all([
      prisma.user.aggregate({
        _count: { id: true },
      }),
      prisma.knowledge.aggregate({
        _count: { id: true },
      }),
      prisma.chatVote.aggregate({
        where: {
          vote: "UPVOTE",
        },
        _count: { id: true },
      }),
      prisma.chatVote.aggregate({
        where: {
          vote: "DOWNVOTE",
        },
        _count: { id: true },
      }),
      prisma.$transaction([
        prisma.missingAnswer.count(),
        prisma.missingAnswer.groupBy({
          by: ["createdAt"],
          _count: {
            id: true,
          },
          where: {
            createdAt: {
              gte: subDays(new Date(), 7),
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        }),
      ]),
    ]);

    const dailyTrend = (missingAnswerStats[1] as DailyCount[]).map((item) => ({
      date: format(item.createdAt, "dd/MM"),
      count: item._count.id,
    }));

    const aggregatedDailyTrend = Object.values(
      dailyTrend.reduce((acc: any, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = { ...curr };
        } else {
          acc[curr.date].count += curr.count;
        }
        return acc;
      }, {})
    );

    return apiResponse({
      message: "Analytics summary retrieved successfully",
      data: {
        metrics: {
          users: {
            total: userStats._count.id,
          },
          knowledges: {
            total: knowledgeStats._count.id,
          },
          feedbacks: {
            positive: positiveFeedbackStats._count.id,
            negative: negativeFeedbackStats._count.id,
          },
          missingAnswers: {
            total: missingAnswerStats[0],
            dailyTrend: aggregatedDailyTrend,
          },
        },
      },
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to fetch analytics summary",
      statusCode: 500,
    });
  }
}
