"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const DOMAINS = ["Frontend Development", "Backend Development", "Full Stack", "Data Science", "Product Management", "UI/UX Design"];
const LEVELS = ["Intern", "Junior", "Mid-Level", "Senior"];
const EMPLOYMENT_TYPES = ["Full-time", "Contract", "Freelance"];

export default function JobRolePage() {
    const router = useRouter();
    const saveRole = useMutation(api.onboarding.saveJobRole);

    const [domain, setDomain] = useState("");
    const [roleLevel, setRoleLevel] = useState("");
    const [experience, setExperience] = useState([1]);
    const [employmentType, setEmploymentType] = useState("");
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const [newResp, setNewResp] = useState("");

    const handleAddResp = () => {
        if (newResp.trim()) {
            setResponsibilities([...responsibilities, newResp.trim()]);
            setNewResp("");
        }
    };

    const removeResp = (index: number) => {
        setResponsibilities(responsibilities.filter((_, i) => i !== index));
    };

    const handleNext = async () => {
        const guestId = localStorage.getItem("guestId") || undefined;

        await saveRole({
            domain,
            roleLevel,
            experienceRange: `${experience[0]} years`,
            employmentType,
            responsibilities,
            coreSkills: [], // Will be filled in next step if we want to preload, but strictly following wireframe, next step is Skills
            bonusSkills: [],
            guestId,
        });

        router.push("/onboarding/skills");
    };

    const isFormValid = domain && roleLevel && employmentType;

    return (
        <div className="min-h-screen container mx-auto py-10 px-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Step 1 of 3</span>
                        <Badge variant="outline">Profile Setup</Badge>
                    </div>
                    <CardTitle className="text-2xl">Tell us about your target role</CardTitle>
                    <CardDescription>
                        We'll customize your readiness assessment based on these details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Target Domain</Label>
                        <Select onValueChange={setDomain}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Domain" />
                            </SelectTrigger>
                            <SelectContent>
                                {DOMAINS.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Role Level</Label>
                            <Select onValueChange={setRoleLevel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LEVELS.map((l) => (
                                        <SelectItem key={l} value={l}>{l}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Employment Type</Label>
                            <Select onValueChange={setEmploymentType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {EMPLOYMENT_TYPES.map((t) => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Experience (Years)</Label>
                            <span className="text-sm font-medium">{experience[0]} years</span>
                        </div>
                        <Slider
                            value={experience}
                            onValueChange={setExperience}
                            max={20}
                            step={1}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Key Responsibilities (Optional)</Label>
                        <div className="flex gap-2">
                            <Input
                                value={newResp}
                                onChange={(e) => setNewResp(e.target.value)}
                                placeholder="e.g. Develop React components..."
                                onKeyDown={(e) => e.key === 'Enter' && handleAddResp()}
                            />
                            <Button type="button" variant="secondary" onClick={handleAddResp}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {responsibilities.map((resp, i) => (
                                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                    {resp}
                                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeResp(i)} />
                                </Badge>
                            ))}
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" onClick={() => router.back()}>Back</Button>
                    <Button onClick={handleNext} disabled={!isFormValid}>Next: Skills &rsaquo;</Button>
                </CardFooter>
            </Card>

            {/* Progress Bar */}
            <div className="mt-8 w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/3 transaction-all duration-300"></div>
            </div>
        </div>
    );
}
