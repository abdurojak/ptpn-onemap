import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Cek apakah user sudah ada
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Kalau belum ada, buat user baru
    if (!user) {
      const hashedPassword = await hash(password, 10);
      user = await prisma.user.create({
        data: {
          name: name || "New User",
          email,
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        { message: "User registered and logged in successfully", user },
        { status: 201 }
      );
    }

    // Kalau sudah ada, cek password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (error) {
    console.error("Login/Register error :", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
