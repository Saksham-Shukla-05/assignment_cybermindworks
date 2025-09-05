import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(["FullTime", "PartTime", "Internship", "Contract"]), // Fixed to "Internship"
  salaryRange: z.object({
    min: z.number().min(0, "Minimum salary must be >= 0"),
    max: z.number().min(0, "Maximum salary must be >= 0"),
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.array(z.string()).optional(), // Made optional
  responsibilities: z.array(z.string()).optional(), // Made optional
  applicationDeadline: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), "Invalid date format"), // Made optional
});
