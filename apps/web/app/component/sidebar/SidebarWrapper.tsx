"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export const SidebarWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden fixed top-4 right-4 md:left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-background border border-muted hover:bg-muted transition"
        >
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-60 bg-background border-r border-muted transform transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:block`}
      >
        <Sidebar itemClick={() => setOpen(false)} />
      </aside>
    </>
  );
};
