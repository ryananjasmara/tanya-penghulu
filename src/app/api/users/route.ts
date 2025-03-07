import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { z } from "zod";
import { apiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

const createUserSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["ADMIN", "STAFF"]),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return apiResponse({
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
      message: "Users retrieved successfully",
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to fetch users",
      statusCode: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const json = await req.json();
    const body = createUserSchema.parse(json);

    const hashedPassword = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "CREATE_USER",
        description: `Created new user: ${user.username}`,
        type: session?.user ? "USER" : "SYSTEM",
        userId: session?.user?.id,
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return apiResponse({
      data: user,
      message: "User created successfully",
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
      message: "Failed to create user",
      statusCode: 500,
    });
  }
}
