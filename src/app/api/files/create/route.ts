// src/app/api/files/create/route.ts

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma"; // Pastikan path prisma client Anda benar

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
        // Ambil semua data yang dikirim dari frontend (setelah upload ke Express)
        const { name, size, filePath, folderId } = body;
        const userId = 1; // sementara kita hardcode

        if (!name || !size || !filePath || !folderId) {
            return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
        }

        // Logika Prisma Anda, sekarang lebih sederhana
        const savedFile = await prisma.file.create({
            data: {
                name: name,
                size: Number(size),
                filePath: filePath, // <- Ini adalah nama unik dari server Express
                folderId: Number(folderId),
                // User: { // Skema Anda menggunakan relasi many-to-many, ini mungkin lebih tepat:
                //     connect: [{ id: userId }]
                // }
                // Jika relasi User ke File adalah one-to-many, maka kode di bawah benar
                // Cek kembali relasi `FileToUser` di skema Anda.
            },
        });

        // Relasi ke User, jika terpisah
        await prisma.file.update({
            where: { id: savedFile.id },
            data: {
                User: {
                    connect: { id: userId }
                }
            }
        });


        return NextResponse.json(savedFile, { status: 201 });

    } catch (error) {
        console.error("Gagal saat memproses request body:", body);
        console.error("Prisma error:", error);

        let errorMessage = "Gagal menyimpan data file";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({
            error: 'Gagal menyimpan data file',
            details: errorMessage
        }, { status: 500 });
    }
}