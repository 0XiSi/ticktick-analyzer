
import { openDb } from '@/lib/db';
import {NextRequest, NextResponse} from 'next/server';
import {transformKeysToLowercase} from "@/lib/utils";
import { z } from 'zod';

const pomoIdSchema = z.object({
  pomoId: z.string().regex(
    /^[0-9a-f]{24}$/i, // 24 character hexadecimal string
    'pomoId must be a valid 24-character hexadecimal string'
  )
});

export async function GET(request: NextRequest) {
  try {
    const db = await openDb();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Failed to open database" },
        { status: 500 }
      );
    }

    // Get pomoId from query parameters
    const pomoId = request.nextUrl.searchParams.get('pomoId');

    // Validate using zod
    const validationResult = pomoIdSchema.safeParse({ pomoId });
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid pomoId format. you provided: " + pomoId,
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Use parameterized query with get() for single row
    // Note: Keep as string since it's not a number
    const pomo = await db.get(
      `SELECT * FROM PomoTask WHERE PomoId = ?`,
      [pomoId] // Pass the string directly
    );

    // Handle not found case
    if (!pomo) {
      return NextResponse.json(
        { success: false, error: "Pomo task not found" },
        { status: 404 }
      );
    }

    // Return single object with transformed keys
    return NextResponse.json({
      success: true,
      data: transformKeysToLowercase(pomo)
    });

  } catch (error) {
    console.error('Error fetching pomo task:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
