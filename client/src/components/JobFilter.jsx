import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import JobCard from "./JobCard";

const JobSearchFilter = () => {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      location: "",
      jobType: "",
      minSalary: 50,
      maxSalary: 100,
    },
  });

  const minSliderRef = useRef(null);
  const maxSliderRef = useRef(null);

  const minSalary = watch("minSalary");
  const maxSalary = watch("maxSalary");

  const handleMinChange = (value) => {
    const val = Math.min(Number(value), maxSalary - 5);
    setValue("minSalary", val);
  };

  const handleMaxChange = (value) => {
    const val = Math.max(Number(value), minSalary + 5);
    setValue("maxSalary", val);
  };

  const onSubmit = (data) => {
    console.log("Filter Data:", data);
  };

  return (
    <div className="bg-white mt-10 p-4 rounded-lg border border-gray-200 w-full mx-auto">
      <form
        className="flex flex-col md:flex-row items-center justify-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Job Title */}
        <div className="w-full md:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/search.svg" alt="Search" className="h-4 w-4" />
            </div>
            <input
              {...register("title")}
              type="text"
              placeholder="Search By Job Title, Role"
              className="w-full pl-10 pr-8 py-2.5"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center w-4">
          <img src="/vertical.svg" alt="" className="h-14" />
        </div>

        {/* Preferred Location */}
        <div className="w-full md:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/Location.svg" alt="Location" className="h-4 w-4" />
            </div>
            <input
              {...register("location")}
              type="text"
              placeholder="Preferred Location"
              className="w-full pl-10 pr-4 py-2.5"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center w-4">
          <img src="/vertical.svg" alt="" className="h-14" />
        </div>

        {/* Job Type */}
        <div className="w-full md:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/icon.svg" alt="Job Type" className="h-4 w-4" />
            </div>
            <select
              {...register("jobType")}
              className="w-full pl-10 pr-8 py-2.5 appearance-none"
            >
              <option value="">Job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center w-4">
          <img src="/vertical.svg" alt="" className="h-14" />
        </div>

        {/* Salary Range */}
        <div className="w-full md:w-1/4">
          <div className="flex flex-col h-full gap-2 items-start">
            <div className="text-sm flex mb-3 justify-between w-full font-medium text-gray-700 whitespace-nowrap">
              <p>Salary Per Month</p>
              <p>
                ₹{minSalary}k - ₹{maxSalary}k
              </p>
            </div>

            <div className="relative w-full">
              <div className="h-1 bg-gray-300 rounded-full absolute top-1/2 transform -translate-y-1/2 w-full"></div>
              <div
                className="h-1 bg-black rounded-full absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${(minSalary - 50) * 2}%`,
                  width: `${(maxSalary - minSalary) * 2}%`,
                }}
              ></div>

              {/* Min Slider */}
              <Controller
                control={control}
                name="minSalary"
                render={({ field }) => (
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={field.value}
                    onChange={(e) => handleMinChange(e.target.value)}
                    ref={minSliderRef}
                    className="absolute w-full top-1/2 transform -translate-y-1/2 opacity-0 cursor-pointer z-10"
                  />
                )}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[url('/Ellipse.svg')] bg-no-repeat bg-center rounded-full border-2 border-white shadow cursor-pointer z-20"
                style={{ left: `${(minSalary - 50) * 2}%` }}
                onClick={() => minSliderRef.current?.focus()}
              ></div>

              {/* Max Slider */}
              <Controller
                control={control}
                name="maxSalary"
                render={({ field }) => (
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={field.value}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    ref={maxSliderRef}
                    className="absolute w-full top-1/2 transform -translate-y-1/2 opacity-0 cursor-pointer z-10"
                  />
                )}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[url('/Ellipse.svg')] bg-no-repeat bg-center rounded-full border-2 border-white shadow cursor-pointer z-20"
                style={{ left: `${(maxSalary - 50) * 2}%` }}
                onClick={() => maxSliderRef.current?.focus()}
              ></div>
            </div>
          </div>
        </div>
      </form>

      <JobCard />
    </div>
  );
};

export default JobSearchFilter;
