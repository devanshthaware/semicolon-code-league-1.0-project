"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExplainPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Why this score?</h1>
                <p className="text-muted-foreground">Transparent breakdown of our analysis logic.</p>
            </div>

            <div className="grid gap-4">
                {/* Section 1 */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                        <CardTitle className="text-lg">Strong Foundation detected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            You selected <strong>React</strong> and <strong>TypeScript</strong>. These are core essentials for the role you targeted. This contributed <strong>+40 points</strong> to your base score.
                        </p>
                    </CardContent>
                </Card>

                {/* Section 2 */}
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                        <CardTitle className="text-lg">Experience alignment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            For a <strong>Senior</strong> role, we expect 5+ years of experience. You listed <strong>4 years</strong>. This slight mismatch reduced your role fit score by <strong>-5 points</strong>, but is easily offset by portfolio quality.
                        </p>
                    </CardContent>
                </Card>

                {/* Section 3 */}
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                        <CardTitle className="text-lg">Missing Key Differentials</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            We did not see <strong>AI Integration</strong> or <strong>Python</strong> in your skills. In 2026, 70% of Senior Job postings require these. This heavily impacted your "Future Readiness" metric <strong>(-15 points)</strong>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
