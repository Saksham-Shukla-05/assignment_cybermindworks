import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["FullTime", "PartTime", "InternShip", "Contract"],
      required: true,
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String], // array of strings
      required: true,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
