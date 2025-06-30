'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import logo from '@/assets/img/ptpn-onemap.png'
import { FaPlus, FaHardDrive } from "react-icons/fa6";
import { FaHome, FaPeopleArrows, FaStar, FaClock, FaTrashAlt } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { AiFillFolderAdd, AiFillFileAdd } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";
import FileDragger from "@/components/base/file-dragger";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

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
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState<null | "folder" | "foto" | "kamus" | "api">(null)

    const openDialog = (type: typeof dialogType) => {
        setDialogType(type)
        setDialogOpen(true)
    }

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
                    <DropdownMenuItem onClick={() => openDialog("folder")}>
                        <AiFillFolderAdd />
                        <span className="ml-2">Tambah Folder</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openDialog("foto")}>
                        <MdAddPhotoAlternate />
                        <span className="ml-2">Upload Foto Udara</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openDialog("kamus")}>
                        <BsDatabaseFillAdd />
                        <span className="ml-2">Upload Data Sesuai Kamus</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openDialog("api")}>
                        <AiFillFileAdd />
                        <span className="ml-2">Upload Data API</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogType === "folder" && "Tambah Folder"}
                            {dialogType === "foto" && "Upload Foto Udara"}
                            {dialogType === "kamus" && "Upload Data Kamus"}
                            {dialogType === "api" && "Upload Data API"}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogType === "folder" && "Masukkan nama folder baru untuk menyimpan file Anda."}
                            {dialogType === "foto" && "Unggah file foto udara dari perangkat Anda."}
                            {dialogType === "kamus" && "Unggah data yang sesuai dengan format kamus data."}
                            {dialogType === "api" && "Unggah data dari sumber API."}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Isi dialog sesuai kebutuhan */}
                    <div className="mt-4">
                        {/* {dialogType === "folder" && (
                            <p>Form Tambah Folder di sini...</p>
                        )}
                        {dialogType === "foto" && (
                            <p>Form Upload Foto di sini...</p>
                        )}
                        {dialogType === "kamus" && (
                            <p>Form Upload Data Kamus di sini...</p>
                        )}
                        {dialogType === "api" && (
                            <p>Form Upload API di sini...</p>
                        )} */}
                        <FileDragger onFilesSelected={(files) => {
                            console.log("Files uploaded:", files)
                        }} />
                    </div>
                </DialogContent>
            </Dialog>

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