"use client";
import { UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  CornerDownLeft,
  LayoutDashboard,
  Plus,
  Search,
  Shield,
  Sparkles,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

const COMMANDS = [
  {
    label: "Go to Dashboard",
    hint: "Your courses & progress",
    path: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Create new course",
    hint: "Generate with AI",
    path: "/Create",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    label: "Profile",
    hint: "Account & preferences",
    path: "/dashboard/profile",
    icon: <User2 className="h-4 w-4" />,
  },
  {
    label: "Upgrade",
    hint: "Unlock more credits",
    path: "/dashboard/upgrade",
    icon: <Shield className="h-4 w-4" />,
  },
];

function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(
    () =>
      COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (cmd) => {
    onClose();
    router.push(cmd.path);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-[16vh] w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0B10] shadow-2xl shadow-black/60"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
              <Search className="h-4 w-4 shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search or jump to..."
                className="h-12 w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <kbd className="chip shrink-0">esc</kbd>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results for “{query}”
                </p>
              )}
              {results.map((cmd, ind) => (
                <button
                  key={cmd.path}
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setActive(ind)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active === ind ? "bg-white/[0.07]" : ""
                  }`}
                >
                  <span
                    className={`inline-flex rounded-lg border p-1.5 transition-colors ${
                      active === ind
                        ? "border-violet-500/25 bg-violet-500/10 text-violet-400"
                        : "border-white/[0.07] bg-white/[0.03] text-zinc-500"
                    }`}
                  >
                    {cmd.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-zinc-200">
                      {cmd.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {cmd.hint}
                    </span>
                  </span>
                  {active === ind && (
                    <CornerDownLeft className="h-3.5 w-3.5 text-zinc-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2.5 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <kbd className="chip">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="chip">↵</kbd> open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DashboardHeader({ option }) {
  const path = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Human-readable trail for the current location, e.g. Workspace / Course
  const crumb = useMemo(() => {
    if (path?.startsWith("/Course")) return "Course";
    if (path?.startsWith("/Create")) return "Create";
    if (path === "/dashboard/upgrade") return "Upgrade";
    if (path === "/dashboard/profile") return "Profile";
    if (path?.startsWith("/dashboard")) return "Dashboard";
    return null;
  }, [path]);

  return (
    <>
      <header className="glass sticky top-0 z-20">
        <div className="flex h-14 items-center gap-3 px-4 md:px-5">
          {/* Brand — always on standalone pages, mobile-only when the sidebar is present */}
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-2.5 ${
              option ? "" : "md:hidden"
            }`}
          >
            <img src="/logo.svg" alt="Make It Easy logo" className="h-8 w-8" />
            <h2 className="hidden text-lg font-bold tracking-tight text-white sm:block">
              Make It Easy
            </h2>
          </Link>

          {/* Location trail */}
          {crumb && (
            <div
              className={`hidden items-center gap-1.5 text-sm md:flex ${
                option ? "border-l border-white/[0.08] pl-3" : ""
              }`}
            >
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-zinc-200"
              >
                Workspace
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
              <span className="font-medium text-zinc-200">{crumb}</span>
            </div>
          )}

          <div className="flex-1" />

          {/* Search / command trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="group flex h-9 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-zinc-500 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-zinc-300 md:w-60"
            aria-label="Open command palette"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="hidden flex-1 text-left md:block">Search...</span>
            <kbd className="chip hidden md:inline-flex">⌘K</kbd>
          </button>

          {/* Quick action */}
          <Link href="/Create" className="hidden sm:block">
            <span className="btn-gradient inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-sm font-semibold">
              <Plus className="h-4 w-4" />
              <span className="hidden lg:inline">New course</span>
              <ArrowUpRight className="hidden h-3.5 w-3.5 opacity-70 lg:inline" />
            </span>
          </Link>

          <span className="hidden h-5 w-px bg-white/[0.08] sm:block" />

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "h-9 w-9 border border-white/15 transition-colors hover:border-violet-400/60",
              },
            }}
          />
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

export default DashboardHeader;
