// app/api/files/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET: ambil semua file
export async function GET() {
    try {
        const files = await prisma.file.findMany();
        return NextResponse.json(files);
    } catch (error) {
        console.error("GET /api/files error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

// POST: buat file baru
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const file = await prisma.file.create({
            data: {
                name: body.name,
                size: body.size,
                folderId: body.folderId,
            },
        })
        return NextResponse.json(file)
    } catch (error) {
        console.error("POST /api/files error:", error)
        return NextResponse.json({ error: "Failed to create file" }, { status: 500 })
    }
}