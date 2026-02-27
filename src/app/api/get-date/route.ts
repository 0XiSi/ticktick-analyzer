
import { openDb } from '@/lib/db';
import {NextRequest, NextResponse} from 'next/server';
import {transformKeysToLowercase} from "@/lib/utils";
import { z } from 'zod';
function isValidDateFormat(str: unknown): str is string {
  if (typeof str !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str);
}
const dateSchema = z.object({
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date must be in format: YYYY-MM-DD (e.g., 2026-02-26)'
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

    // Get date from query parameters
    const date = request.nextUrl.searchParams.get('date');

    // Validate using zod
    const validationResult = dateSchema.safeParse({ date });
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid date format",
          details: validationResult.error.issues,
          provided: date
        },
        { status: 400 }
      );
    }

    // Use parameterized query with get() for single row
    // Note: Keep as string since it's not a number
    const pomos = await db.all(
      `SELECT * FROM PomoTask WHERE DATE(StartTime) = ? ORDER BY StartTime ASC`,
      [date]
    );

    // Handle not found case
    if (!pomos) {
      return NextResponse.json(
        { success: false, error: "Pomo task not found" },
        { status: 404 }
      );
    }

    // Return single object with transformed keys
    return NextResponse.json({
      success: true,
      data: transformKeysToLowercase(pomos)
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
