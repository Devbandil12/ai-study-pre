import React from "react";
import Sidebar from "./_components/Sidebar";
import DashboardHeader from "./_components/DashboardHeader";

function layout({ children }) {
  return (
    <div>
<div className="md:w-64 hidden md:block fixed">
<Sidebar/>
</div>
        <div className="md:ml-64">
       <DashboardHeader/>
     <div>
        {children}
     </div>
        </div>
     
    </div>
  );
}

export default layout;
