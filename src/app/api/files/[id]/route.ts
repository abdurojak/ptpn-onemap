// app/api/files/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
    try {
        const url = new URL(req.url)
        const id = url.pathname.split("/").pop() // ambil ID dari path URL
        const body = await req.json()
        const updated = await prisma.file.update({
            where: { id: Number(id) },
            data: body,
        })
        return NextResponse.json(updated)
    } catch (error) {
        console.error("PATCH /api/files/[id] error:", error)
        return NextResponse.json({ error: "Failed to update file" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url)
        const id = url.pathname.split("/").pop() // ambil ID dari path URL
        const deleted = await prisma.file.delete({
            where: { id: Number(id) }
        })
        return NextResponse.json(deleted)
    } catch (error) {
        console.error("DELETE /api/files/[id] error:", error)
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
    }
}
