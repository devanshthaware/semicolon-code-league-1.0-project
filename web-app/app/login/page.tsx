"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserCircle } from "lucide-react";

export default function LoginPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && user) {
            router.push("/onboarding/role");
        }
    }, [isLoaded, user, router]);

    const handleGuestEntry = () => {
        localStorage.setItem("guestId", `guest_${Math.random().toString(36).substr(2, 9)}`);
        router.push("/onboarding/role");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome</CardTitle>
                    <CardDescription>
                        Choose how you want to continue to your assessment.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignInButton mode="modal">
                        <Button className="w-full h-11" variant="default">
                            <User className="mr-2 h-4 w-4" />
                            Continue with Email / Google
                        </Button>
                    </SignInButton>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    <Button
                        className="w-full h-11"
                        variant="outline"
                        onClick={handleGuestEntry}
                    >
                        <UserCircle className="mr-2 h-4 w-4" />
                        Continue as Guest
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Guest data is saved locally on this device only. Login to sync across devices.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
