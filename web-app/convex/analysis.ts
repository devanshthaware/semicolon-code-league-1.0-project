import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveAnalysis = mutation({
    args: {
        readinessScore: v.number(),
        readinessStatus: v.string(),
        matchedSkills: v.array(v.string()),
        missingSkills: v.array(v.string()),
        resumeFitScore: v.number(),
        scoreBreakdown: v.array(
            v.object({
                skill: v.string(),
                impact: v.string(),
            })
        ),
        guestId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) throw new Error("Unauthorized");

        const existing = await ctx.db
            .query("analysis_results")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, args);
        } else {
            await ctx.db.insert("analysis_results", { userId, ...args });
        }
    },
});

export const getAnalysis = query({
    args: { guestId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) return null;
        return await ctx.db
            .query("analysis_results")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();
    },
});

export const getUserDataForAnalysis = query({
    args: { guestId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) return null;

        const jobRole = await ctx.db
            .query("job_roles")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        const userSkills = await ctx.db
            .query("user_skills")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        return {
            jobRole,
            userSkills
        };
    },
});

// internal action later? or just client side logic to save?
// Prompt says "Analysis step (compute + save result)".
// For now I'll assume we can compute on client or server. Server actions preferred for heavy lifting but rule based can be client or action.
// I will add a mutation to GENERATE roadmap here or in roadmap.ts
