
import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import {transformKeysToLowercase} from "@/lib/utils";

export async function GET() {
  const db = await openDb();
  if (db == null) {
    return NextResponse.json({ error: "Failed to open database" }, { status: 500 });
  }

  // Query to get habit data
  const habits = await db.all("SELECT * FROM HabitModel");

  return NextResponse.json(transformKeysToLowercase(habits));
}
