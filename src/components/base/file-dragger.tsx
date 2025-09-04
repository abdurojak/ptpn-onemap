'use client'

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button" // pastikan kamu punya ini
import { toast, Toaster } from 'sonner'

interface FileDraggerProps {
    onFilesSelected: (files: FileList) => void,
    onUploadComplete?: () => void,
    type?: "foto" | "kamus" | "api" // Tambah ini
}

export default function FileDragger({ onFilesSelected, onUploadComplete, type }: FileDraggerProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [fileName, setFileName] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const validateTiffFile = (file: File) => {
        const allowedTypes = ["image/tiff", "image/x-tiff"]
        const allowedExtensions = [".tiff", ".tif"]
        const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()

        return allowedTypes.includes(file.type) || allowedExtensions.includes(extension)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFiles(e.dataTransfer.files)
            setFileName(e.dataTransfer.files[0].name)
            e.dataTransfer.clearData()
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isDragging) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (type === "foto" && !validateTiffFile(file)) {
            toast.error("Hanya file .tiff yang diperbolehkan untuk foto udara.")
            e.target.value = ""
            return
        }

        setSelectedFiles(e.target.files)
        setFileName(file.name)
    }


    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) return

        const file = selectedFiles[0]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folderId", "1") // sementara

        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100)
                setUploadProgress(percent)
            }
        })

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("Upload complete:", JSON.parse(xhr.responseText))
                    setUploadProgress(0) // reset
                } else {
                    console.error("Upload failed", xhr.responseText)
                    setUploadProgress(0)
                }
            }
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("Upload complete:", JSON.parse(xhr.responseText))
                    setUploadProgress(0)
                    setSelectedFiles(null)
                    setFileName("")
                    onUploadComplete?.() // 👉 panggil fungsi penutup dialog
                } else {
                    console.error("Upload failed", xhr.responseText)
                    setUploadProgress(0)
                }
            }
        }

        xhr.open("POST", "/api/upload")
        xhr.send(formData)
    }


    return (
        <div className="space-y-4">
            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
                    isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <p className="text-sm text-gray-600">Tarik dan lepas file di sini atau klik untuk memilih</p>
                {fileName && <p className="mt-2 text-sm text-green-600">{fileName}</p>}
            </div>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />

            {uploadProgress > 0 && (
                <div className="mt-4 w-full bg-gray-200 rounded">
                    <div
                        className="bg-green-700 text-white text-xs font-medium text-center p-0.5 leading-none rounded"
                        style={{ width: `${uploadProgress}%` }}
                    >
                        {uploadProgress}%
                    </div>
                </div>
            )}

            {selectedFiles && (
                <div className="flex justify-end">
                    <Button onClick={handleUpload}>Upload</Button>
                </div>
            )}
        </div>
    )
}