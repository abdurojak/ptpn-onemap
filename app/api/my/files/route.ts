import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const folderId = Number(searchParams.get('folderId'))
    const userId = 1

    if (isNaN(folderId)) {
        return NextResponse.json({ error: 'Invalid folderId' }, { status: 400 })
    }

    const files = await prisma.file.findMany({
        where: { folderId, isDeleted: false, User: { some: { id: userId } }, },
        orderBy: { uploadedAt: 'desc' },
    })
    return NextResponse.json(files)
}
