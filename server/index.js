import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import jobsRoute from "./routes/jobs.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://assignment-cybermindworks.vercel.app/",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
app.get("/", (req, res) => {
  res.send("✅ Server is up and running!");
});

app.use("/api/jobs", jobsRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
