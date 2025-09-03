import express from "express";
import { getJobs, createJob } from "../controllers/jobsController.js";

const router = express.Router();

router.get("/jobs", getJobs);
router.post("/jobs/create", createJob);

export default router;
