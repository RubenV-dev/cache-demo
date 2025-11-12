import express from "express";
import pool from "./db.js";
import client from "./redisClient.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Simulated route to get user data
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // 1️⃣ Check cache first
    const cachedUser = await client.get(`user:${userId}`);
    if (cachedUser) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachedUser));
    }

    console.log("Cache miss — querying DB");

    // 2️⃣ Fetch from database
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: "User not found" });

    // 3️⃣ Store in cache for next time (TTL 60s)
    await client.setEx(`user:${userId}`, 60, JSON.stringify(user));

    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
