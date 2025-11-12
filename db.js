import pkg from "pg";
const { Pool } = pkg;
// const { Client } = pkg;

import dotenv from "dotenv";
dotenv.config();

//console.log("Connecting to:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to Postgres"))
  .catch((err) => console.error("❌ Connection error:", err));

export default pool;
// console.log(process.env.DATABASE_URL);
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: false, // important for local Docker on Windows
// });

// export default async function connectDB() {
//   try {
//     console.log(process.env.DATABASE_URL);
//     await client.connect();
//     console.log("✅ Connected to Postgres!");

//     // simple test query
//     const res = await client.query("SELECT NOW()");
//     console.log("Current time:", res.rows[0]);
//   } catch (err) {
//     console.error("❌ Connection error:", err);
//   }
// }

// connectDB();
