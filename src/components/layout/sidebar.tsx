'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logo from '@/assets/img/ptpn-onemap.png'
import { FaPlus, FaHardDrive } from "react-icons/fa6";
import { FaHome, FaPeopleArrows, FaStar, FaClock, FaTrashAlt } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { AiFillFolderAdd, AiFillFileAdd } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const menu = [
    { icon: <FaHome />, label: "Beranda", href: "/home" },
    { icon: <FaHardDrive />, label: "Data Saya", href: "/my-files" },
    { icon: <FaPeopleArrows />, label: "Dibagikan Kepada Saya", href: "/shared" },
    { icon: <FaStar />, label: "Berbintang", href: "/starred" },
    { icon: <FaClock />, label: "Terbaru", href: "/recent" },
    { icon: <FaTrashAlt />, label: "Sampah", href: "/trash" },
]

export default function Sidebar({ onLinkClick }: { onLinkClick?: () => void }) {
    const pathname = usePathname()

    return (
        <div className="w-64 p-4 space-y-4">
            <div className="flex flex-col items-center space-y-2">
                <Image src={logo} alt="Logo PTPN" width={120} height={120} />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm hover:shadow-lg hover:bg-gray-100">
                        <FaPlus /> Tambah
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                    <DropdownMenuItem onClick={() => console.log("Tambah Folder")}>
                        <AiFillFolderAdd />
                        Tambah Folder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator /> {/* Garis pembatas */}
                    <DropdownMenuItem onClick={() => console.log("Tambah File")}>
                        <MdAddPhotoAlternate />
                        Upload Foto Udara
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Tambah File")}>
                        <BsDatabaseFillAdd /> Upload Data Sesuai Kamus
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Tambah File")}>
                        <AiFillFileAdd /> Upload Data API
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <nav className="space-y-2">
                {menu.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onLinkClick}
                            className={`flex items-center gap-3 px-4 py-2 rounded text-sm font-medium ${isActive ? "bg-green-700 text-white" : "hover:bg-green-100 text-gray-800"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}