import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center   ">
      <div className="mt-[21px] flex justify-center border-[1px] border-white rounded-[122px] p-[21px]  shadow-[0_0_20px_0_rgba(127,127,127,0.15)]">
        <div className="flex  gap-12 items-center justify-center">
          <div>
            <img src="/logo.svg" className="cursor-pointer" alt="" />
          </div>
          <div>
            <div className="flex w-full  justify-center gap-8">
              <p className="cursor-pointer">Home</p>
              <p className="cursor-pointer">Find Jobs</p>
              <p className="cursor-pointer">Find Talents</p>
              <p className="cursor-pointer">About us</p>
              <p className="cursor-pointer">Testimonials</p>
            </div>
          </div>
          <div className="border-1 py-2 px-6 rounded-[30px] bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-white">
            <button className="">Create Jobs</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
