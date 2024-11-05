// src/app/api/trip/route.js
import { connectDB, disconnectDB, client } from "@/database/db.js";

export async function GET(req) {
  await connectDB(); // Connect to the database

  const { searchParams } = new URL(req.url); // Get URL search parameters
  const memberId = searchParams.get("memberId"); // Get the memberId from the query

  if (!memberId) {
    return new Response("Member ID is required", { status: 400 });
  }

  try {
    const result = await client.query(
      `SELECT mt.trip_id
       FROM TEAM_MEMBER AS m
       JOIN TEAM_MANAGEMENT AS mt ON m.LEADER_ID = mt.LEADER_ID
       AND m.START_TIME_OF_TRIP = mt.START_TIME_OF_TRIP
       WHERE m.member_id = $1`,
      [memberId]
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database query failed:", error); // Log the error for debugging
    return new Response("Database query failed", { status: 500 });
  } finally {
  }
}
