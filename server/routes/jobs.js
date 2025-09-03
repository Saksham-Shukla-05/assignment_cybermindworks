const express = require("express");
const { getJobs, createJob } = require("../controllers/JobsController");

const router = express.Router();

router.get("/jobs", getJobs);
router.post("/jobs", createJob);

module.exports = router;
