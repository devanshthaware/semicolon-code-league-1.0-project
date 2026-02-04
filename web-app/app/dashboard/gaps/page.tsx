"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function GapsPage() {
    const guestId = typeof window !== 'undefined' ? localStorage.getItem("guestId") || undefined : undefined;
    const analysis = useQuery(api.analysis.getAnalysis, { guestId });

    if (!analysis) return <div>Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Skill Gaps & Opportunities</h1>
                <p className="text-muted-foreground">Focus on these areas to maximize your career growth.</p>
            </div>

            <div className="grid gap-6">
                {analysis.missingSkills.map((skill, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    {skill}
                                    <Badge variant="destructive">Critical Gap</Badge>
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4 mt-2">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">Why it matters?</h4>
                                    <p className="text-sm text-muted-foreground">
                                        High demand in enterprise applications. Becomes a blocker for Senior roles.
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">Resources</h4>
                                    <div className="flex flex-col gap-1 text-sm text-primary underline cursor-pointer">
                                        <span>Learn {skill} in 100 Seconds (YouTube)</span>
                                        <span>Official Documentation</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
