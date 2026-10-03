"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Menu,
  X,
  Building2,
  Contact,
  Handshake,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import useAuth from "@/store/authStore";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const token = useAuth((state) => state.token);
  const logOut = useAuth((state) => state.logOut);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // The server has no saved token, so wait until mounted before deciding
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && !token) router.replace("/login");
  }, [mounted, token, router]);

  if (!mounted || !token) return null;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Blogs", href: "/adminblogs", icon: FileText },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Leads", href: "/leads", icon: Contact },
    { name: "Sell Request", href: "/sell-requests", icon: Handshake },
  ];

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-[#0b121a] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6  text-xl font-bold border-b border-gray-800">
            <Image src={logo} alt="Binge" width={110} />
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#1a2332] text-white"
                      : "text-gray-400 hover:bg-[#1a2332] hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)} // close on mobile when link clicked
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logOut}
              className="flex w-full items-center space-x-3 p-2 rounded-lg text-gray-400 hover:bg-[#1a2332] hover:text-white transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0b121a] border-b border-gray-800">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image src={logo} alt="Binge" width={120} />
          {/* Spacer to balance layout */}
          <div style={{ width: 24 }} />
        </div>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
