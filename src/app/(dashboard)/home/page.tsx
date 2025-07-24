"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export default function FileListPage() {
    const [files, setFiles] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/files")
            .then((res) => res.json())
            .then((data) => setFiles(data))
    }, [])

    const [newFile, setNewFile] = useState({ name: "", size: 0, folderId: 1 })

    async function handleCreate() {
        await fetch("/api/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFile),
        })
        window.location.reload()
    }

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Selamat Datang di CMS One Map</h1>
            <div className="min-h-full flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                </div>
            </div>
        </div>
    )
}