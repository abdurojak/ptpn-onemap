"use client"
import { useEffect, useState } from "react"
import { FaFolder, FaFile } from "react-icons/fa"
import { Button } from "@/components/ui/button"

type Folder = {
    id: number
    name: string
    createdAt: string
}

type FileItem = {
    id: number
    name: string
    size: number
    uploadedAt: string
}

export default function MyFilesPage() {
    const [folders, setFolders] = useState<Folder[]>([])
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
    const [files, setFiles] = useState<FileItem[]>([])
    const [loadingFolders, setLoadingFolders] = useState(false)
    const [loadingFiles, setLoadingFiles] = useState(false)

    useEffect(() => {
        async function loadFolders() {
            setLoadingFolders(true)
            try {
                const resp = await fetch("/api/my/folders")
                if (!resp.ok) throw new Error("Error loading folders")
                setFolders(await resp.json())
            } catch (e) {
                console.error(e)
            } finally {
                setLoadingFolders(false)
            }
        }
        loadFolders()
    }, [])

    useEffect(() => {
        if (selectedFolderId !== null) {
            async function loadFiles() {
                setLoadingFiles(true)
                try {
                    const resp = await fetch(`/api/my/files?folderId=${selectedFolderId}`)
                    if (!resp.ok) throw new Error("Error loading files")
                    setFiles(await resp.json())
                } catch (e) {
                    console.error(e)
                } finally {
                    setLoadingFiles(false)
                }
            }
            loadFiles()
        }
    }, [selectedFolderId])

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">File Explorer</h1>

            {/* Daftar Folder */}
            {loadingFolders ? (
                <p>Memuat folder...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {folders.map((f) => (
                        <div
                            key={f.id}
                            className={`p-4 rounded-lg shadow cursor-pointer ${selectedFolderId === f.id ? "bg-blue-100" : "bg-gray-100"
                                }`}
                            onClick={() => setSelectedFolderId(f.id)}
                        >
                            <FaFolder className="text-yellow-500 text-3xl mb-2" />
                            <div>{f.name}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tampilkan file ketika folder sudah dipilih */}
            {selectedFolderId && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-medium">Isi Folder</h2>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedFolderId(null)
                                setFiles([])
                            }}
                        >
                            Kembali ke folder
                        </Button>
                    </div>

                    {loadingFiles ? (
                        <p>Memuat file...</p>
                    ) : files.length === 0 ? (
                        <p className="text-gray-500 italic">Folder kosong.</p>
                    ) : (
                        <ul className="space-y-2">
                            {files.map((file) => (
                                <li key={file.id} className="flex items-center justify-between p-2 bg-white rounded shadow">
                                    <div className="flex items-center gap-2">
                                        <FaFile className="text-gray-500" />
                                        <span>{file.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}