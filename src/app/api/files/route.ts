import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const deletedParam = searchParams.get("deleted");
        const starredParam = searchParams.get("starred");

        const where: any = {};

        // Tambahkan filter jika param tersedia
        if (deletedParam !== null) {
            where.isDeleted = deletedParam === "true";
        }

        if (starredParam !== null) {
            where.isStarred = starredParam === "true";
        }

        const files = await prisma.file.findMany({
            where,
        });

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