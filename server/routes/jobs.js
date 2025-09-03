const express = require("express");
const { getJobs, createJobs } = require("../controllers/JobsController");

const router = express.Router();

router.get("/jobs", getJobs);
router.post("/jobs", createJobs);

module.exports = router;
