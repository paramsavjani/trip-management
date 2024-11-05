// src/database/db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "dpg-csbsmolds78s73bf2930-a.oregon-postgres.render.com",
  port: 5432,
  user: "param",
  password: "Zqy7G7GjZA04bMD7YPv1ARpKV14naBOU",
  database: "trip_managment",
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectDB() {
  try {
    return await pool.connect(); // Connect using the pool
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
}

async function disconnectDB(client) {
  try {
    if (client) await client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Failed to release client:", error);
  }
}

module.exports = { pool, connectDB, disconnectDB };
