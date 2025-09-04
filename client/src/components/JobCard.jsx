import React from "react";

//   logo,
//   jobTitle,
//   experience,
//   workType,
//   salary,
//   description,
//   postedTime,
const JobCard = () => {
  return (
    <section className="flex mt-6 items-start justify-start gap-5 p-8">
      <div className="    rounded-lg p-4 w-[316px] shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-start  mb-4">
          <img
            src={"/logo.svg"}
            alt="company logo"
            className="w-12 h-12 border  rounded-lg object-contain"
          />
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
            24h Ago
          </span>
        </div>

        <h2 className="font-semibold text-lg mb-2">Full Stack Developer</h2>

        <div className="flex flex-row  justify-between text-gray-600 text-sm mb-3">
          <div className="font-medium flex  items-center gap-2">
            <span>
              <img src="/exp.svg" className="w-4 h-4" alt="" />
            </span>{" "}
            <p>1-3 yr Exp</p>
          </div>

          <div className="font-medium flex  items-center gap-2">
            <span>
              <img src="/onsite.svg" className="w-4 h-4" alt="" />
            </span>{" "}
            <p>onsite</p>
          </div>

          <div className="font-medium flex  items-center gap-2">
            <span>
              <img src="/lpa.svg" className="w-4 h-4" alt="" />
            </span>{" "}
            <p>12LPA</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 flex-col">
          <p className="text-[14px] font-light ">
            A user-friendly interface lets you browse stunning photos and videos
          </p>
          <p className="text-[14px] font-light">
            Filter destinations based on interests and travel style, and create
            personalized{" "}
          </p>
        </div>

        <button className="bg-blue-500 mt-5 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Apply Now
        </button>
      </div>
    </section>
  );
};

export default JobCard;
