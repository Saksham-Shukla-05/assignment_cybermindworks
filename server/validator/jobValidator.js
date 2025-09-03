import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(["FullTime", "PartTime", "InternShip", "Contract"]),
  salaryRange: z.object({
    min: z.number().min(0, "Salary min must be >= 0"),
    max: z.number().min(0, "Salary max must be >= 0"),
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),

  /* These fields were only mentioned on the models and not on frontend and so if they are needed in the near future on the frontend we can simply uncomment this */

  // requirements: z.array(z.string()).nonempty("At least one requirement needed"),
  // responsibilities: z
  //   .array(z.string())
  //   .nonempty("At least one responsibility needed"),

  applicationDeadline: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});
