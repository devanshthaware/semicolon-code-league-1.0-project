"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const guestId = typeof window !== 'undefined' ? localStorage.getItem("guestId") || undefined : undefined;

  const analysis = useQuery(api.analysis.getAnalysis, { guestId });
  const jobRole = useQuery(api.onboarding.getJobRole, { guestId });

  if (!analysis || !jobRole) {
    return <div className="p-10">Loading your analysis...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Readiness Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Assessment for <span className="font-medium text-foreground">{jobRole.roleLevel} {jobRole.domain}</span>
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Readiness Score</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.readinessScore}/100</div>
            <p className="text-xs text-muted-foreground">
              {analysis.readinessStatus === 'ready' ? "You're ready!" : "Upskilling recommended"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume Fit</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.resumeFitScore}%</div>
            <Progress value={analysis.resumeFitScore} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Matched</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.matchedSkills.length}</div>
            <p className="text-xs text-muted-foreground">
              Across core & bonus areas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing Skills</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{analysis.missingSkills.length}</div>
            <p className="text-xs text-muted-foreground">
              Critical gaps identified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {analysis.readinessScore < 80 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            Your profile has critical gaps in AI Integration and new workflow tools. Review the "Skill Gaps" tab.
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Analysis Breakdown */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>
              How your readiness score was calculated based on market demands.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.scoreBreakdown.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1 w-full">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium leading-none">{item.skill}</p>
                      <span className={cn(
                        "text-sm font-bold",
                        item.impact === "High" ? "text-green-500" : "text-yellow-500"
                      )}>{item.impact} Impact</span>
                    </div>
                    <Progress value={item.impact === "High" ? 85 : 55} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Recommended next steps based on your analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 p-2 border rounded hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-200">1</div>
              <div className="text-sm font-medium">View Skill Gaps</div>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-200">2</div>
              <div className="text-sm font-medium">Start 30-Day Roadmap</div>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-200">3</div>
              <div className="text-sm font-medium">Update Resume (PDF)</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
