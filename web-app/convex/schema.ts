import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(), // Clerk ID
        email: v.string(),
        createdAt: v.number(),
    }).index("by_userId", ["userId"]),

    job_roles: defineTable({
        userId: v.string(),
        domain: v.string(),
        roleLevel: v.string(), // intern | junior | mid | senior
        experienceRange: v.string(),
        employmentType: v.string(),
        responsibilities: v.array(v.string()),
        coreSkills: v.array(v.string()),
        bonusSkills: v.array(v.string()),
    }).index("by_userId", ["userId"]),

    user_skills: defineTable({
        userId: v.string(),
        skills: v.array(v.string()), // normalized
    }).index("by_userId", ["userId"]),

    analysis_results: defineTable({
        userId: v.string(),
        readinessScore: v.number(),
        readinessStatus: v.string(), // ready | almost | needs_upskilling
        matchedSkills: v.array(v.string()),
        missingSkills: v.array(v.string()),
        resumeFitScore: v.number(),
        scoreBreakdown: v.array(
            v.object({
                skill: v.string(),
                impact: v.string(), // High/Medium/Low or numeric
            })
        ),
    }).index("by_userId", ["userId"]),

    roadmaps: defineTable({
        userId: v.string(),
        weeks: v.array(
            v.object({
                weekNumber: v.number(),
                focusSkill: v.string(),
                courses: v.array(v.string()),
                youtubePlaylists: v.array(v.string()),
            })
        ),
    }).index("by_userId", ["userId"]),
});
