import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { z } from "zod";
import { apiResponse } from "@/lib/api-response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const updateUserSchema = z.object({
  name: z.string().min(1, "Nama harus diisi").optional(),
  email: z.string().email("Email tidak valid").optional(),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  role: z.enum(["ADMIN", "STAFF"]).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return apiResponse({
        status: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    return apiResponse({
      data: user,
      message: "Successfully retrieved user data",
    });
  } catch (error) {
    return apiResponse({
      status: false,
      message: "Failed to retrieve user data",
      statusCode: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await req.json();
    const body = updateUserSchema.parse(json);

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: body,
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
        action: "UPDATE_USER",
        description: `Updated user: ${user.username}`,
        userId: "system",
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return apiResponse({
      data: user,
      message: "User updated successfully",
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

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return apiResponse({
        status: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    return apiResponse({
      status: false,
      message: "Failed to update user",
      statusCode: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
