import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveJobRole = mutation({
    args: {
        domain: v.string(),
        roleLevel: v.string(),
        experienceRange: v.string(),
        employmentType: v.string(),
        responsibilities: v.array(v.string()),
        coreSkills: v.array(v.string()),
        bonusSkills: v.array(v.string()),
        guestId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) {
            throw new Error("Unauthorized");
        }

        // Check if exists
        const existing = await ctx.db
            .query("job_roles")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, args);
        } else {
            await ctx.db.insert("job_roles", { userId, ...args });
        }
    },
});

export const getJobRole = query({
    args: { guestId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) return null;
        return await ctx.db
            .query("job_roles")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .first();
    },
});

export const saveUserSkills = mutation({
    args: {
        skills: v.array(v.string()),
        guestId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) throw new Error("Unauthorized");

        const existing = await ctx.db
            .query("user_skills")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, args);
        } else {
            await ctx.db.insert("user_skills", { userId, ...args });
        }
    },
});

export const getUserSkills = query({
    args: { guestId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) return null;
        return await ctx.db
            .query("user_skills")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .first();
    },
});
