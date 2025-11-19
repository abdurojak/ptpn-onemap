"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "/public/assets/img/logo-ptpn.png"; // ganti sesuai path logo kamu
import { cn } from "@/lib/utils"; // kalau kamu punya helper ini
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Login berhasil!");
      router.push("/");
    } else {
      setMessage(data.error || "Login gagal");
    }

        if (res.ok) {
      toast.success("Login berhasil 🎉")
      router.push("/")
    } else {
      toast.error(data.error || "Login gagal ❌")
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
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" ref={emailRef} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm underline-offset-4 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" ref={passwordRef} required />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </div>
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <button onClick={() => router.push("/register")} className="underline underline-offset-4 text-blue-600">
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground mt-4">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">Terms of Service</a> and{" "}
        <a href="#" className="underline">Privacy Policy</a>.
      </div>
      {message && <p className="mt-3 text-sm text-center">{message}</p>}
    </div>
  );
}
