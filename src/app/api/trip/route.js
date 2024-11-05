// src/app/api/trip/route.js
import { connectDB, disconnectDB } from "@/database/db.js";

export async function GET(req) {
  let client;
  const { searchParams } = new URL(req.url); // Get URL search parameters
  const memberId = searchParams.get("memberId"); // Get the memberId from the query

  if (!memberId) {
    return new Response("Member ID is required", { status: 400 });
  }

  try {
    client = await connectDB(); // Connect to the database
    const result = await client.query(
      `SELECT distinct mt.START_TIME_OF_TRIP, trip.*
       FROM TEAM_MEMBER AS m
       JOIN TEAM_MANAGEMENT AS mt ON m.LEADER_ID = mt.LEADER_ID
       AND m.START_TIME_OF_TRIP = mt.START_TIME_OF_TRIP
	     join trip on trip.trip_id = mt.trip_id
       WHERE m.member_id = $1 or mt.leader_id = $1`,
      [memberId]
    );
    console.log(result.rows);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return new Response("Database query failed", { status: 500 });
  } finally {
    if (client) await disconnectDB(client);
  }
}
