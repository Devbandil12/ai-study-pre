import React from "react";
import Sidebar from "./_components/Sidebar";
import DashboardHeader from "./_components/DashboardHeader";

function layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed z-30 hidden md:block md:w-64">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 grid-bg [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default layout;
