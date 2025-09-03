const express = require("express");
const { getJobs, createJob } = require("../controllers/JobsController");

const router = express.Router();

router.get("/jobs", getJobs);
router.post("/jobs/create", createJob);

module.exports = router;
