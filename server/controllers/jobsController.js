import { jobSchema } from "../validator/jobValidator.js";
import jobsModel from "../model/jobsModel.js";
export const getJobs = async (req, res) => {
  try {
    const jobs = await jobsModel.find();
    res.status(200).json({
      data: jobs,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching Jobs",
      error: error.message,
    });
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
