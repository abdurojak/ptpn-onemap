"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "public/assets/img/logo-ptpn.png";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registrasi berhasil 🎉");
      router.push("/login");
    } else {
      toast.error(data.error || "Registrasi gagal ❌");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 min-h-screen items-center justify-center")}>
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            <div className="flex flex-col items-center space-y-2">
              <Image src={logo} alt="Logo" width={120} height={120} />
            </div>
          </CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-6">

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" ref={nameRef} placeholder="John Doe" required />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" ref={emailRef} placeholder="m@example.com" required />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" ref={passwordRef} required />
              </div>

              <Button type="submit" className="w-full">Register</Button>
            </div>

            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="underline underline-offset-4 text-blue-600"
              >
                Login
              </button>
            </div>

          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground mt-4">
        By creating an account, you agree to our{" "}
        <a href="#" className="underline">Terms of Service</a> and{" "}
        <a href="#" className="underline">Privacy Policy</a>.
      </div>

      {message && <p className="mt-3 text-sm text-center">{message}</p>}
    </div>
  );
}
