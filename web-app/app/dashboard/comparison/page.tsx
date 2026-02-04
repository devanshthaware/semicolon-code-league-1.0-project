"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ComparisonPage() {
    const guestId = typeof window !== 'undefined' ? localStorage.getItem("guestId") || undefined : undefined;
    const analysis = useQuery(api.analysis.getAnalysis, { guestId });

    if (!analysis) return <div>Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">You vs Industry</h1>
                    <p className="text-muted-foreground">Benchmarking your skills against top 10% of candidates.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Coverage</CardTitle>
                        <CardDescription>How much of the required stack you know</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">You</span>
                                <span>75%</span>
                            </div>
                            <Progress value={75} className="h-3" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Industry Average</span>
                                <span>60%</span>
                            </div>
                            <Progress value={60} className="h-3 bg-secondary" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Top Performers</span>
                                <span>95%</span>
                            </div>
                            <Progress value={95} className="h-3 bg-secondary" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Salary Potential Impact</CardTitle>
                        <CardDescription>Estimated value of closing your skill gaps</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-[200px]">
                        <div className="text-4xl font-bold text-green-500">+$15k - $25k</div>
                        <p className="text-center text-muted-foreground mt-2">
                            Adding <strong>AI Integration</strong> to your profile could increase your market value significantly.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detailed Competency breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Skill Category</th>
                                    <th scope="col" className="px-6 py-3">Your Level</th>
                                    <th scope="col" className="px-6 py-3">Market Demand</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-background border-b">
                                    <td className="px-6 py-4 font-medium">Frontend Frameworks</td>
                                    <td className="px-6 py-4">High</td>
                                    <td className="px-6 py-4">High</td>
                                </tr>
                                <tr className="bg-background border-b">
                                    <td className="px-6 py-4 font-medium">AI / LLM Ops</td>
                                    <td className="px-6 py-4 text-destructive">Low</td>
                                    <td className="px-6 py-4 text-green-600">Exploding</td>
                                </tr>
                                <tr className="bg-background">
                                    <td className="px-6 py-4 font-medium">Cloud Infrastructure</td>
                                    <td className="px-6 py-4">Medium</td>
                                    <td className="px-6 py-4">High</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
