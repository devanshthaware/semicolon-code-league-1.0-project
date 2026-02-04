"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

export default function RoadmapPage() {
    const guestId = typeof window !== 'undefined' ? localStorage.getItem("guestId") || undefined : undefined;
    const roadmap = useQuery(api.roadmap.getRoadmap, { guestId });

    if (!roadmap) return <div>Generating your roadmap...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Your 30-Day Plan</h1>
                <p className="text-muted-foreground">A step-by-step guide to bridging your gaps.</p>
            </div>

            <div className="relative border-l-2 border-muted ml-4 space-y-8 pl-8 py-4">
                {roadmap.weeks.map((week, i) => (
                    <div key={i} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[41px] top-0 bg-background border-2 border-primary rounded-full p-1">
                            {i === 0 ? (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                            ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                        </div>

                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <CardTitle>Week {week.weekNumber}: {week.focusSkill}</CardTitle>
                                        <CardDescription>Estimated effort: 5-8 hours</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold mb-2">Recommended Courses</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        {week.courses.map((c, j) => (
                                            <li key={j}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold mb-2">Free Resources</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                        {week.youtubePlaylists.map((y, k) => (
                                            <li key={k}>{y}</li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
