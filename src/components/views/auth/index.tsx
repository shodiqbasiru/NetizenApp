import React from "react";
import { Outlet } from "react-router";

function AuthComponent(): React.ReactElement {
  return (
    <div className="bg-auth min-h-screen bg-cover bg-center grid place-items-center relative font-public-sans">
      {/* Overlay for dimming */}
      <div className="absolute inset-0 bg-black opacity-20 z-10" />

      {/* Main container */}
      <div className="shadow-md w-full max-w-screen-2xl mx-auto grid grid-cols-2 overflow-hidden min-h-[80vh] relative z-20">
        {/* Left Side with Blur */}
        <div className="p-8 w-full bg-transparent relative overflow-hidden">
          {/* Blur Background */}
          <div className="absolute inset-0 backdrop-blur bg-black/10"></div>

          {/* Content inside blurred area */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Header */}
            <div className="flex items-center gap-6">
              <p className="text-lg text-slate-50 mb-4 font-rajdhani">
                Your Voice, Your Community
              </p>
              <div className="bg-slate-50 h-[1px] w-1/6 rounded-full" />
            </div>

            {/* Wording Content */}
            <div>
              <h1 className="text-6xl font-bold text-slate-50 leading-tight font-jura">
                Share <br /> Anything, <br /> Anytime!
              </h1>
              <h2 className="text-lg text-slate-50 mt-4">
                Join NetizenApp and connect with the world. Post your thoughts,
                photos, or anything you want. Engage with others through
                comments and build your community.
              </h2>
              <p className="text-xl text-slate-50 font-thin mt-12 font-rajdhani">
                Ready to make an impact?{" "}
                <span className="font-semibold">Join NetizenApp today!</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="p-8 bg-slate-50 rounded-e-3xl flex flex-col justify-between">
          <h2 className="text-xl font-bold text-center font-rajdhani">
            NetizenApp
          </h2>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthComponent;
