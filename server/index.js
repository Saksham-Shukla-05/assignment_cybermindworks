import express from "express";
import jobsRoute from "./routes/jobs.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

connectDB(); // connecting the DB

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up");
});

app.use("/api/v1", jobsRoute);

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is up and running http://localhost:${PORT}`);
});
