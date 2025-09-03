import express from "express";
import { getJobs, createJob } from "../controllers/jobsController.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/create", createJob);

export default router;
