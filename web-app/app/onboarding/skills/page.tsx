"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const POPULAR_SKILLS = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "Tailwind CSS",
    "PostgreSQL", "GraphQL", "Docker", "AWS", "Figma", "Sass", "Redux", "Rust"
];

export default function SkillsPage() {
    const router = useRouter();
    const saveSkills = useMutation(api.onboarding.saveUserSkills);

    const [skills, setSkills] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSkills = POPULAR_SKILLS.filter(s =>
        s.toLowerCase().includes(searchTerm.toLowerCase()) && !skills.includes(s)
    );

    const addSkill = (skill: string) => {
        if (!skills.includes(skill)) {
            setSkills([...skills, skill]);
            setSearchTerm("");
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const handleNext = async () => {
        const guestId = localStorage.getItem("guestId") || undefined;

        await saveSkills({
            skills,
            guestId,
        });

        router.push("/analyze");
    };

    return (
        <div className="min-h-screen container mx-auto py-10 px-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Step 2 of 3</span>
                        <Badge variant="outline">Skills Assessment</Badge>
                    </div>
                    <CardTitle className="text-2xl">What are your top skills?</CardTitle>
                    <CardDescription>
                        Add the technologies and tools you are most proficient in.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search or add skills..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchTerm) {
                                    addSkill(searchTerm);
                                }
                            }}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[100px] content-start">
                        {skills.map((skill) => (
                            <Badge key={skill} className="px-3 py-1 text-sm flex items-center gap-2 cursor-pointer hover:bg-primary/90">
                                {skill}
                                <X className="h-3 w-3" onClick={() => removeSkill(skill)} />
                            </Badge>
                        ))}
                        {skills.length === 0 && (
                            <div className="flex items-center justify-center w-full h-20 text-muted-foreground text-sm border-2 border-dashed rounded-md">
                                No skills added yet. Start typing above.
                            </div>
                        )}
                    </div>

                    <div>
                        <Label className="mb-2 block text-xs uppercase text-muted-foreground">Suggested Skills</Label>
                        <ScrollArea className="h-[120px]">
                            <div className="flex flex-wrap gap-2">
                                {filteredSkills.map(skill => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-secondary/80"
                                        onClick={() => addSkill(skill)}
                                    >
                                        <Plus className="h-3 w-3 mr-1" />
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" onClick={() => router.back()}>Back</Button>
                    <Button onClick={handleNext} disabled={skills.length === 0}>Analyze Profile &rsaquo;</Button>
                </CardFooter>
            </Card>

            {/* Progress Bar */}
            <div className="mt-8 w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-2/3 transaction-all duration-300"></div>
            </div>
        </div>
    );
}
