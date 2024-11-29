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
      name: "Dashboard",
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
    <div className="h-screen px-4 pt-5 shadow-sm bg-gradient-to-b shadow-white from-black via-gray-900 to-gray-800">
      {/* Logo and Title */}
      <div className="flex gap-2 items-center">
        <img
          src="/logo.svg"
          alt=""
          className="hover:rotate-12 transition-all hover:scale-105"
        />
        <h2 className="text-2xl font-bold text-gray-100 hover:scale-105 transition-all cursor-pointer">
          Make It Easy
        </h2>
      </div>

      {/* Create New Button */}
      <div className="mt-6">
        <Link href={"/Create"}>
          <Button className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600">
            + Create New
          </Button>
        </Link>
      </div>

      {/* Menu List */}
      <div className="mt-8 space-y-3">
        {menulist.map((val, ind) => {
          const isActive = path === val.path;
          return (
            <div
              key={ind}
              className={`flex gap-4 items-center p-3 pl-6 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? "bg-gray-700 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              }`}
            >
              <div
                className={`${
                  isActive ? "text-gray-100" : "text-gray-400"
                } transition-all`}
              >
                {val.icon}
              </div>
              <span>{val.name}</span>
            </div>
          );
        })}
      </div>

      {/* Credits Section */}
      <div className="mt-auto mb-10 border border-gray-700 bg-gray-800 rounded-lg p-4 text-gray-300">
        <h2 className="mb-2 text-lg font-bold text-gray-100">
          Available Credits: 5
        </h2>
        <Progress value={80} className="bg-gray-700" />
        <h2 className="mt-2 text-sm">1 out of 5 credits used</h2>
        <Link href={"dashboard/upgrade"}>
          <h2 className="text-blue-400 font-semibold text-sm mt-2">
            Upgrade to create more
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
