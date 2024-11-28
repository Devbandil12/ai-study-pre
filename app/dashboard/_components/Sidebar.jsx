"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const menulist = [
    {
      name: "Dahboard",
      path: "/dashboard",
      icon: <LayoutDashboard />,
    },

    {
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: <Shield />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <User2 />,
    },
  ];
  const path = usePathname();
  return (
    <div className="border h-screen px-2 pt-3 shadow-md">
      <div className="flex gap-2 items-center">
        <img
          src="/logo.svg"
          alt=""
          className="  hover:rotate-12 transition-all hover:scale-105"
        />
        <h2 className="text-3xl font-bold hover:scale-105 transition-all cursor-pointer ">
          Make It Easy
        </h2>
      </div>
      <div className="mt-5">
        <Link href={"/Create"}>
          {" "}
          <Button className="w-full bg-primary">+ Create New</Button>
        </Link>
        <div className="mt-5 ">
          {menulist.map((val, ind) => {
            return (
              <div
                key={ind}
                className={`flex gap-5 p-3 pl-10 hover:bg-slate-100 rounded-lg cursor-pointer ${
                  path == val.path && "bg-slate-300"
                }`}
              >
                {val.icon}
                {val.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-40 border border-slate-300 bg-slate-100 rounded-lg p-3">
        <h2 className="mb-2 text-lg font-bold">Available credits 5</h2>
        <Progress value={"80"} />
        <h2>1 out of 5 credit used</h2>

        <Link href={"dashboard/upgrade"}>
          <h2 className="text-primary font-semibold text-sm">
            Upgrade To create More
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
