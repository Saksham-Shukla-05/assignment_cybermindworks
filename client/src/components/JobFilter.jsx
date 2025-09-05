import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import JobCard from "./JobCard";
import api from "../utils/axiosInstance";
import CreateJobModal from "./CreateJobModal ";

const DEFAULT_MIN = 50;
const DEFAULT_MAX = 100;
const DEBOUNCE_MS = 400;

const JobSearchFilter = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { register, control, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      location: "",
      jobType: "",
      minSalary: DEFAULT_MIN,
      maxSalary: DEFAULT_MAX,
    },
  });

  const minSliderRef = useRef(null);
  const maxSliderRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { title, location, jobType, minSalary, maxSalary } = watch();

  const buildParamsFromValues = (vals) => {
    const params = {};
    if (vals.title?.trim()) params.title = vals.title.trim();
    if (vals.location?.trim()) params.location = vals.location.trim();
    if (vals.jobType) params.jobType = vals.jobType;

    const min = Number(vals.minSalary);
    const max = Number(vals.maxSalary);
    if (
      Number.isFinite(min) &&
      Number.isFinite(max) &&
      (min !== DEFAULT_MIN || max !== DEFAULT_MAX)
    ) {
      params.minSalary = min * 1000;
      params.maxSalary = max * 1000;
    }
    return params;
  };

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/jobs", { params });
      setJobs(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("fetchJobs error:", err);
      setError(
        err.response?.data?.message || "Failed to fetch jobs. Please try again."
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isDefault =
      (!title || title.trim() === "") &&
      (!location || location.trim() === "") &&
      (!jobType || jobType === "") &&
      Number(minSalary) === DEFAULT_MIN &&
      Number(maxSalary) === DEFAULT_MAX;

    console.log(isDefault);

    const handler = setTimeout(
      () => {
        const params = buildParamsFromValues({
          title,
          location,
          jobType,
          minSalary,
          maxSalary,
        });
        fetchJobs(params);
      },
      jobType ? 0 : DEBOUNCE_MS
    );

    return () => clearTimeout(handler);
  }, [title, location, jobType, minSalary, maxSalary]);

  const handleMinChange = (value) => {
    const val = Math.min(Number(value), Number(maxSalary) - 5);
    if (Number.isFinite(val)) {
      setValue("minSalary", val, { shouldTouch: true, shouldDirty: true });
    }
  };

  const handleMaxChange = (value) => {
    const val = Math.max(Number(value), Number(minSalary) + 5);
    if (Number.isFinite(val)) {
      setValue("maxSalary", val, { shouldTouch: true, shouldDirty: true });
    }
  };

  const minPercentage =
    ((Number(minSalary) - DEFAULT_MIN) / (DEFAULT_MAX - DEFAULT_MIN)) * 100;
  const maxPercentage =
    ((Number(maxSalary) - DEFAULT_MIN) / (DEFAULT_MAX - DEFAULT_MIN)) * 100;

  return (
    <div className="bg-white mt-10 p-4 rounded-lg border border-gray-200 w-full mx-auto">
      {/* Filters */}
      <form className="flex flex-col md:flex-row items-center justify-center gap-2">
        {/* Title */}
        <div className="w-full md:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/search.svg" alt="" className="h-4 w-4" />
            </div>
            <input
              {...register("title")}
              type="text"
              placeholder="Search By Job Title, Role"
              className="w-full pl-10 pr-8 py-2.5  rounded-md"
              aria-label="Search by job title or role"
            />
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:flex items-center justify-center w-4">
          <img src="/vertical.svg" alt="" className="h-14" />
        </div>

        {/* Location */}
        <div className="w-full md:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/Location.svg" alt="" className="h-4 w-4" />
            </div>
            <input
              {...register("location")}
              type="text"
              placeholder="Preferred Location"
              className="w-full pl-10 pr-4 py-2.5  rounded-md"
              aria-label="Search by preferred location"
            />
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:flex items-center justify-center w-4">
          <img src="/vertical.svg" alt="" className="h-14" />
        </div>

        {/* Job Type */}
        <div className="w-full md:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/icon.svg" alt="" className="h-4 w-4" />
            </div>
            <select
              {...register("jobType")}
              className="w-full pl-10 pr-8 py-2.5  rounded-md appearance-none"
              aria-label="Select job type"
            >
              <option value="">Job type</option>
              <option value="FullTime">Full-time</option>
              <option value="PartTime">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:flex items-center justify-center w-4">
          <img src="/vertical.svg" alt="" className="h-14" />
        </div>

        {/* Salary Range */}
        <div className="w-full md:w-1/4">
          <div className="flex flex-col gap-2 items-start">
            <div className="text-sm flex justify-between w-full font-medium text-gray-700">
              <p>Salary Per Month</p>
              <p>
                ₹{Number(minSalary)}k - ₹{Number(maxSalary)}k
              </p>
            </div>
            <div className="relative w-full">
              {/* Track */}
              <div className="h-1 bg-gray-300 rounded-full absolute top-1/2 transform -translate-y-1/2 w-full" />
              {/* Active Track */}
              <div
                className="h-1 bg-black rounded-full absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${minPercentage}%`,
                  width: `${maxPercentage - minPercentage}%`,
                }}
              />
              {/* Min Slider */}
              <Controller
                control={control}
                name="minSalary"
                render={({ field }) => (
                  <input
                    type="range"
                    min={DEFAULT_MIN}
                    max={DEFAULT_MAX}
                    value={field.value}
                    onChange={(e) => handleMinChange(e.target.value)}
                    ref={minSliderRef}
                    className="absolute w-full top-1/2 transform -translate-y-1/2 opacity-0 cursor-pointer z-10"
                    aria-label="Minimum salary"
                    aria-valuemin={DEFAULT_MIN}
                    aria-valuemax={DEFAULT_MAX}
                    aria-valuenow={field.value}
                  />
                )}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[url('/Ellipse.svg')] bg-no-repeat bg-center rounded-full cursor-pointer z-20"
                style={{ left: `${minPercentage}%` }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    minSliderRef.current?.focus();
                }}
              />
              {/* Max Slider */}
              <Controller
                control={control}
                name="maxSalary"
                render={({ field }) => (
                  <input
                    type="range"
                    min={DEFAULT_MIN}
                    max={DEFAULT_MAX}
                    value={field.value}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    ref={maxSliderRef}
                    className="absolute w-full top-1/2 transform -translate-y-1/2 opacity-0 cursor-pointer z-10"
                    aria-label="Maximum salary"
                    aria-valuemin={DEFAULT_MIN}
                    aria-valuemax={DEFAULT_MAX}
                    aria-valuenow={field.value}
                  />
                )}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[url('/Ellipse.svg')] bg-no-repeat bg-center rounded-full cursor-pointer z-20"
                style={{ left: `${maxPercentage}%` }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    maxSliderRef.current?.focus();
                }}
              />
            </div>
          </div>
        </div>
      </form>

      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center mt-20">
          <p className="text-lg text-gray-600 font-medium animate-pulse">
            Loading...
          </p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center mt-20">
          <p className="text-lg text-red-600 font-medium bg-red-50 p-4 rounded-lg shadow-sm">
            {error}
          </p>
        </div>
      ) : (
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard data={job} key={job._id || job.id || Math.random()} />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center">
                <p className="text-lg text-gray-500 font-medium bg-gray-50 p-4 rounded-lg shadow-sm">
                  No jobs available
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default JobSearchFilter;
