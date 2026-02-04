"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";

export default function SummaryPage() {
    const guestId = typeof window !== 'undefined' ? localStorage.getItem("guestId") || undefined : undefined;
    const analysis = useQuery(api.analysis.getAnalysis, { guestId });
    const jobRole = useQuery(api.onboarding.getJobRole, { guestId });

    if (!analysis || !jobRole) return <div>Loading...</div>;

    return (
        <div className="space-y-8 max-w-3xl mx-auto text-center">
            <div className="space-y-2">
                <h1 className="text-4xl font-extrabold">Assessment Complete!</h1>
                <p className="text-xl text-muted-foreground">
                    You are <strong>{analysis.readinessScore}% Ready</strong> for {jobRole.roleLevel} {jobRole.domain} roles.
                </p>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20">
                <CardHeader>
                    <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                    <p>
                        Based on our analysis, your profile demonstrates strong proficiency in core web technologies. However, to compete for top-tier Senior roles in 2026, you absolutely must bridge the gap in <strong>AI Integration</strong> and <strong>Model Fine-tuning</strong>.
                    </p>
                    <p>
                        Following the provided 4-week roadmap could increase your projected salary potential by up to <strong>15%</strong>.
                    </p>
                </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg">
                    <Download className="mr-2 h-4 w-4" /> Download Report (PDF)
                </Button>
                <Button size="lg">
                    <Share2 className="mr-2 h-4 w-4" /> Share Achievement
                </Button>
            </div>
        </div>
    );
}
