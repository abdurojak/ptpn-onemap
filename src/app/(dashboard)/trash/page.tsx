"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { FaFolder, FaFile } from "react-icons/fa" // Icon package (install if belum: `npm i react-icons`)

export default function FileListPage() {
    const [files, setFiles] = useState<any[]>([])
    const [newFile, setNewFile] = useState({ name: "", size: 0, folderId: 1 })

    useEffect(() => {
        fetch("/api/files")
            .then((res) => res.json())
            .then((data) => setFiles(data))
    }, [])

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
            {/* <div className="flex gap-2 mb-4">
                <Input placeholder="Nama file" onChange={e => setNewFile({ ...newFile, name: e.target.value })} />
                <Input type="number" placeholder="Ukuran" onChange={e => setNewFile({ ...newFile, size: parseInt(e.target.value) })} />
                <Button onClick={handleCreate}>Tambah</Button>
            </div> */}

            <h1 className="text-xl font-semibold mb-4">Sampah</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-md">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                        <tr>
                            <th className="p-3 font-medium">Nama</th>
                            <th className="p-3 font-medium">Tanggal Upload</th>
                            <th className="p-3 font-medium">Terakhir Diperbarui</th>
                            <th className="p-3 font-medium">Ukuran</th>
                            <th className="p-3 font-medium">Pemilik</th>
                            <th className="p-3 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-400 italic">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            files.map((file) => (
                                <tr key={file.id} className="border-t">
                                    <td className="p-3 flex items-center gap-2">
                                        {file.name.endsWith(".jpg") || file.name.includes(".") ? (
                                            <FaFile className="text-gray-500" />
                                        ) : (
                                            <FaFolder className="text-yellow-500" />
                                        )}
                                        {file.name}
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
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                                        Saya
                                    </td>
                                    <td className="p-3">
                                        <Button>Restore</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}