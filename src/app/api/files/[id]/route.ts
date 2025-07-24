// app/api/files/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
    params: {
        id: string
    }
}

export async function PATCH(req: Request, { params }: Params) {
    try {
        const body = await req.json()
        const updated = await prisma.file.update({
            where: { id: Number(params.id) },
            data: body,
        })
        return NextResponse.json(updated)
    } catch (error) {
        console.error("PATCH /api/files/[id] error:", error)
        return NextResponse.json({ error: "Failed to update file" }, { status: 500 })
    }
}

export async function DELETE({ params }: Params) {
    try {
        const deleted = await prisma.file.delete({
            where: { id: Number(params.id) }
        })
        return NextResponse.json(deleted)
    } catch (error) {
        console.error("DELETE /api/files/[id] error:", error)
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
    }
}

