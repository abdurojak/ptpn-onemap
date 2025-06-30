'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface FileDraggerProps {
    onFilesSelected: (files: FileList) => void
}

export default function FileDragger({ onFilesSelected }: FileDraggerProps) {
    const [isDragging, setIsDragging] = useState(false)
    let name = ''

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelected(e.dataTransfer.files)
            name = e.dataTransfer.files[0].name
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
        if (e.target.files) {
            onFilesSelected(e.target.files)
        }
    }

    return (
        <div>
            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
                    isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <p className="text-sm text-gray-600">Tarik dan lepas file di sini atau klik untuk memilih</p>
                {/* <Input
                    type="file"
                    className="mt-4"
                    onChange={handleFileChange}
                    multiple
                /> */}
                {name}
            </div>
        </div>
    )
}