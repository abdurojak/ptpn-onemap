'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { FaUser } from "react-icons/fa"
import { IoMdPerson } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link"
import { useFileStore } from "../../../stores/useFileStores";
import { Toaster } from "../ui/sonner";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const handleLogout = () => {

    };
    const setSearchQuery = useFileStore((state) => state.setSearchQuery)
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-2 flex-1 pr-4">
                <button onClick={onMenuClick} className="lg:hidden p-2">
                    <Menu className="w-6 h-6" />
                </button>
                <input
                    type="text"
                    placeholder="Cari"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full px-4 py-2 border bg-white text-sm focus:outline-none"
                />
            </div>
            <Toaster position="top-center" />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center text-white text-sm">
                        <FaUser />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => console.log("Profil")}>
                        <Link href='/' className={`flex items-center gap-3 rounded`}>
                            <IoMdPerson /> Profil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogout()}>
                        <Link href='/' className={`flex items-center gap-3 rounded`}>
                            <IoIosLogOut /> Keluar
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}