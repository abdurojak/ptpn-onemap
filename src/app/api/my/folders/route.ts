import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const userId = 1
    const folders = await prisma.folder.findMany({
        where: { userId, isDeleted: false },
        orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(folders)
}
