"use client";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/Sidebar";
import { Sidebar } from "./ui/Sidebar";
import SearchBar from "./SearchBar";
import Breadcrumbs from "./Breadcrumbs";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

export default function Layout({ children, frontMatter, sidebarData }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" sidebarData={sidebarData} />
      <SidebarInset>
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            {/* Removed SearchBar */}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle Dark Mode</span>
          </Button>
        </header>
        <main className="p-8">
       
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}