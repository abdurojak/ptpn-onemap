// app/(dashboard)/layout.tsx
"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import Topbar from "@/components/layout/topbar"
import { Menu } from "lucide-react"
import { RxCross2 } from "react-icons/rx";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="relative">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-30 w-64 min-h-full bg-white shadow-md transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <Sidebar onLinkClick={() => setSidebarOpen(false)} onSidebarClose={() => setSidebarOpen(false)} />
                </div>

                {/* Tombol ✕ di luar sidebar */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className={`fixed top-4 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out lg:hidden
      ${sidebarOpen ? "left-[280px] opacity-100" : "left-0 opacity-0 pointer-events-none"}`}
                    aria-label="Tutup Sidebar"
                >
                    <RxCross2 />
                </button>
            </div>

            {/* Overlay untuk menutup sidebar di mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-80 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Konten utama */}
            <div className="flex flex-col flex-1 overflow-hidden w-full">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 overflow-y-auto flex-1">{children}</main>
            </div>
        </div>
    )
}