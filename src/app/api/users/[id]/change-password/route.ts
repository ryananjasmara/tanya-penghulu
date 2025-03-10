import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { z } from "zod";
import { apiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Password lama harus diisi"),
  newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.id !== params.id) {
      return apiResponse({
        status: false,
        message: "Unauthorized access",
        statusCode: 403,
      });
    }

    const json = await request.json();
    const body = updatePasswordSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return apiResponse({
        status: false,
        message: "User not found",
        statusCode: 404,
      });
    }

    const isValidPassword = await verifyPassword(
      body.currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return apiResponse({
        status: false,
        message: "Password lama tidak sesuai",
        statusCode: 400,
      });
    }

    const hashedPassword = await hashPassword(body.newPassword);

    await prisma.user.update({
      where: { id: params.id },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "UPDATE_PASSWORD",
        description: "Password updated",
        type: "USER",
        userId: session?.user?.id,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return apiResponse({
      message: "Password berhasil diubah",
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
      message: "Failed to update password",
      statusCode: 500,
    });
  }
}
