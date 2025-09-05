import React from "react";
import { useForm } from "react-hook-form";
import api from "../utils/axiosInstance";

const CreateJobModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      location: "",
      jobType: "",
      minSalary: "",
      maxSalary: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        companyName: data.companyName,
        location: data.location,
        jobType: data.jobType,
        salaryRange: {
          min: data.minSalary ? Number(data.minSalary) : 0,
          max: data.maxSalary ? Number(data.maxSalary) : undefined,
        },
        description: data.description,
      };

      console.log("Sending Payload:", payload);

      const response = await api.post("/jobs/create", payload);
      console.log("API Response:", response.data);

      reset();
      onClose();
    } catch (error) {
      console.error(
        "Error creating job:",
        error.response?.data || error.message
      );
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create Job Opening
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Job Title & Company */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Job Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Full Stack Developer"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Company Name
              </label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters",
                  },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Amazon"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>

          {/* Location & Job Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Location
              </label>
              <input
                {...register("location", {
                  required: "Location is required",
                  minLength: {
                    value: 2,
                    message: "Location must be at least 2 characters",
                  },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="Chennai"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Job Type
              </label>
              <select
                {...register("jobType", { required: "Job type is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              >
                <option value="">Select</option>
                <option value="Internship">Internship</option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.jobType.message}
                </p>
              )}
            </div>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Min Salary
              </label>
              <input
                type="number"
                {...register("minSalary", {
                  required: "Min salary is required",
                  min: { value: 0, message: "Min salary must be >= 0" },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="₹0"
              />
              {errors.minSalary && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.minSalary.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Max Salary
              </label>
              <input
                type="number"
                {...register("maxSalary", {
                  required: "Max salary is required",
                  min: { value: 0, message: "Max salary must be >= 0" },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                placeholder="₹12,00,000"
              />
              {errors.maxSalary && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxSalary.message}
                </p>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Job Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Please share a description..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="border px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
            >
              Publish »
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
