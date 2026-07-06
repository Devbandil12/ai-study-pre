"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Plus, Shield, User2, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const menulist = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-[18px] w-[18px]" />,
    },
    {
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: <Shield className="h-[18px] w-[18px]" />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <User2 className="h-[18px] w-[18px]" />,
    },
  ];

  const path = usePathname();

  return (
    <div className="flex h-screen flex-col border-r border-white/[0.06] bg-[#0B0B10] px-4 pt-6">
      {/* Logo and Title */}
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <img src="/logo.svg" alt="Make It Easy logo" className="h-8 w-8" />
        <h2 className="text-lg font-bold tracking-tight text-white">
          Make It Easy
        </h2>
      </Link>

      {/* Create New Button */}
      <div className="mt-7">
        <Link href={"/Create"}>
          <Button className="btn-gradient w-full gap-2 rounded-xl font-semibold">
            <Plus className="h-4 w-4" /> Create New
          </Button>
        </Link>
      </div>

      {/* Menu List */}
      <nav className="mt-8 space-y-1">
        <p className="eyebrow mb-3 px-3">Workspace</p>
        {menulist.map((val, ind) => {
          const isActive = path === val.path;
          return (
            <Link href={val.path} key={ind} className="block">
              <div
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-white/[0.08] bg-white/[0.07] text-white"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-zinc-200"
                }`}
              >
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {val.icon}
                </span>
                <span>{val.name}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Credits Section */}
      <div className="surface mt-auto mb-6 p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex rounded-lg border border-violet-500/20 bg-violet-500/10 p-1.5">
            <Zap className="h-3.5 w-3.5 text-violet-400" />
          </span>
          <h2 className="text-sm font-semibold text-white">Credits</h2>
        </div>
        <Progress value={80} className="h-1.5 bg-white/[0.06]" />
        <p className="mt-2.5 text-xs text-muted-foreground">
          1 of 5 credits used
        </p>
        <Link href={"/dashboard/upgrade"}>
          <p className="mt-2 text-xs font-semibold text-violet-400 transition-colors hover:text-violet-300">
            Upgrade to create more →
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
