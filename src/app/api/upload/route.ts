import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { mkdir } from 'fs/promises'
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const folderId = formData.get('folderId')
    const userId = 1 // sementara kita hardcode

    if (!file || !folderId) {
        return NextResponse.json({ error: 'File or folderId not provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'src/assets')
    await mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, file.name)

    // Simpan file ke disk
    await writeFile(filePath, buffer)

    // Simpan metadata ke database
    const saved = await prisma.file.create({
        data: {
            name: file.name,
            size: file.size,
            folderId: parseInt(folderId.toString()),
            filePath: filePath, // Add this line to include filePath
            User: {
                connect: {
                    id: userId,
                },
            },
        },
    })

    return NextResponse.json({ success: true, file: saved })
}