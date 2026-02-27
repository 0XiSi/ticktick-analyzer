
import { openDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import {transformKeysToLowercase} from "@/lib/utils";

export async function GET() {
  const db = await openDb();
  if (db == null) {
    return NextResponse.json({ error: "Failed to open database" }, { status: 500 });
  }

  // Query to get habit data
  const pomos = await db.all("SELECT * FROM PomoTask WHERE DATE(StartTime) = date('now');");

  return NextResponse.json(transformKeysToLowercase(pomos));
}

