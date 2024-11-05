const { Client } = require("pg");

const client = new Client({
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
  if(!client._connected)
  await client.connect();
}

async function disconnectDB() {
  await client.end();
}

export { client, connectDB, disconnectDB };
