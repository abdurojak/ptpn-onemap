'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from '../../../public/assets/img/ptpn-onemap.png';

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // TODO: Kirim ke API (opsional: validasi dulu)
        if (email && password) {
            // Simulasi login sukses
            router.push('/home');
        } else {
            alert('Email dan password harus diisi');
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        <div className="flex flex-col items-center space-y-2">
                            <Image src={logo} alt="Logo PTPN" width={120} height={120} />
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Login with your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-6">
                            {/* <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full" type="button">
                                    Apple icon omitted for brevity
                                    Login with Apple
                                </Button>
                                <Button variant="outline" className="w-full" type="button">
                                    Google icon omitted for brevity
                                    Login with Google
                                </Button>
                            </div> */}
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                {/* <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span> */}
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        ref={emailRef}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" ref={passwordRef} required />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}