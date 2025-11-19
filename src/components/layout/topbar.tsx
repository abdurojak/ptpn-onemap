'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { FaUser } from "react-icons/fa"
import { IoMdPerson } from "react-icons/io"
import { IoIosLogOut } from "react-icons/io"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFileStore } from "../../../stores/useFileStores"
import { toast, Toaster } from "sonner"

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter()
  const setSearchQuery = useFileStore((state) => state.setSearchQuery)

  const handleLogout = async () => {
    try {
      // Panggil API logout (hapus session / token di backend)
      const res = await fetch("/api/logout", {
        method: "POST",
      })

      if (res.ok) {
        // Hapus data lokal (misal token di localStorage)
        localStorage.removeItem("token")
        toast.error("Berhasil logout")
        router.push("/login") // arahkan ke halaman login
      } else {
        toast.error("Gagal logout, coba lagi")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Terjadi kesalahan saat logout")
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
      {/* Tombol menu & kolom pencarian */}
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


      {/* Dropdown user */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center text-white text-sm">
            <FaUser />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>
            <Link href="/" className="flex items-center gap-3 rounded">
              <IoMdPerson /> Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <div className="flex items-center gap-3 text-red-600 cursor-pointer hover:text-red-700">
              <IoIosLogOut /> Keluar
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
