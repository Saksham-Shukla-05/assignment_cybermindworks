import { jobSchema } from "../validator/jobValidator.js";
import jobsModel from "../model/jobsModel.js";
import { regex } from "zod";
export const getJobs = async (req, res) => {
  try {
    const { title, location, jobType, minSalary, maxSalary } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (minSalary || maxSalary) {
      query["salaryRange.min"] = { $gte: Number(minSalary) || 0 };
      query["salaryRange.max"] = { $lte: Number(maxSalary) || 99999999 };
    }

    const jobs = await jobsModel.find(query);
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const parsedData = jobSchema.parse(req.body);

    const newJob = await jobsModel.create(parsedData);

    res.status(201).json({
      data: newJob,
      success: true,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    res.status(500).json({
      message: "Error while creating job",
      error: error.message,
    });
  }
};
