"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
} from "@/components/ui/context-menu"
import { useEffect, useState } from "react"
import { FaFolder, FaFile, FaStar } from "react-icons/fa"
import { MdDownload, MdStarBorder, MdDelete, MdRestoreFromTrash } from 'react-icons/md';
import { useFileStore } from "../../../../stores/useFileStores"
import { IoMdPerson } from "react-icons/io"

export default function FileListPage() {
    const [files, setFiles] = useState<any[]>([])
    const [newFile, setNewFile] = useState({ name: "", size: 0, folderId: 1 })
    const searchQuery = useFileStore((state) => state.searchQuery)

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        fetch("/api/files?deleted=true")
            .then((res) => res.json())
            .then((data) => setFiles(data))
    }, [])

    useEffect(() => {
        if (useFileStore.getState().shouldRefresh) {
            fetch("/api/files?deleted=true")
                .then((res) => res.json())
                .then((data) => {
                    setFiles(data)
                    useFileStore.getState().clearRefresh() // reset flag
                })
        }
    }, [useFileStore((state) => state.shouldRefresh)])

    const handleDownload = (fileName: string) => {
        const link = document.createElement("a")
        link.href = `/uploads/${fileName}`
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleRestore = async (id: number) => {
        await fetch(`/api/files/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDeleted: false }),
        })
        useFileStore.getState().triggerRefresh()
    }

    const handleDelete = async (id: number) => {
        await fetch(`/api/files/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        useFileStore.getState().triggerRefresh()
    }

    async function handleCreate() {
        await fetch("/api/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFile),
        })
        window.location.reload()
    }

    return (
        <div className="p-6">

            <h1 className="text-xl font-semibold mb-4">Data Saya</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-md">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                        <tr>
                            <th className="p-3 font-medium">Nama</th>
                            <th className="p-3 font-medium">Tanggal Upload</th>
                            <th className="p-3 font-medium">Terakhir Diperbarui</th>
                            <th className="p-3 font-medium">Ukuran</th>
                            <th className="p-3 font-medium">Pemilik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFiles.length === 0 ? (
                            <tr><td colSpan={5} className="text-center p-4 italic text-gray-400">Tidak ada data</td></tr>
                        ) : (
                            filteredFiles.map((file) => (
                                <ContextMenu key={file.id}>
                                    <ContextMenuTrigger asChild>
                                        <tr className="border-t hover:bg-gray-100 cursor-pointer">
                                            <td className="p-3 flex items-center gap-2">
                                                {file.name.endsWith(".jpg") || file.name.includes(".") ? (
                                                    <FaFile className="text-gray-500" />
                                                ) : (
                                                    <FaFolder className="text-yellow-500" />
                                                )}
                                                {file.name}
                                                {file.isStarred ? (
                                                    <FaStar className="text-amber-400" />
                                                ) : null}
                                            </td>
                                            <td className="p-3">
                                                {new Date(file.uploadedAt).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="p-3">
                                                {file.updatedAt
                                                    ? new Date(file.updatedAt).toLocaleDateString("id-ID", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })
                                                    : "-"}
                                            </td>
                                            <td className="p-3">{file.size > 0 ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "-"}</td>
                                            <td className="p-3 flex items-center gap-2">
                                                {/* <div className="w-2.5 h-2.5 rounded-full bg-green-600" /> */}
                                                <IoMdPerson />
                                                Saya
                                            </td>
                                        </tr>
                                    </ContextMenuTrigger>

                                    <ContextMenuContent className="w-48">
                                        <ContextMenuItem onClick={() => handleRestore(file.id)}>
                                            <MdRestoreFromTrash className="mr-2" /> Pulihkan
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={() => handleDelete(file.id)}>
                                            <MdDelete className="mr-2" /> Hapus Permanen
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}