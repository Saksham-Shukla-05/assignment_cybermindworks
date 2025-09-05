import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    jobType: {
      type: String,
      enum: ["FullTime", "PartTime", "Internship", "Contract"], // ✅ case matches
      required: true,
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    description: { type: String, required: true },
    requirements: { type: [String] },
    responsibilities: { type: [String] },
    applicationDeadline: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
