"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart2,
    BrainCircuit,
    Target,
    Map,
    FileText,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Comparison", href: "/dashboard/comparison", icon: BarChart2 },
    { name: "AI Explain", href: "/dashboard/explain", icon: BrainCircuit },
    { name: "Skill Gaps", href: "/dashboard/gaps", icon: Target },
    { name: "Roadmap", href: "/dashboard/roadmap", icon: Map },
    { name: "Summary", href: "/dashboard/summary", icon: FileText },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-muted/40 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground mr-2">
                        AI
                    </div>
                    <span className="font-bold text-lg">CareerReady</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn("w-full justify-start", isActive && "bg-secondary text-secondary-foreground")}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-4 px-2">
                        <UserButton afterSignOutUrl="/" />
                        <div className="text-sm font-medium">My Account</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 flex items-center justify-between px-6 border-b md:hidden">
                    <span className="font-bold">AI CareerReady</span>
                    {/* Mobile menu would go here */}
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
