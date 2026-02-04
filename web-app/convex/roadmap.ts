import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveRoadmap = mutation({
    args: {
        weeks: v.array(
            v.object({
                weekNumber: v.number(),
                focusSkill: v.string(),
                courses: v.array(v.string()),
                youtubePlaylists: v.array(v.string()),
            })
        ),
        guestId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) throw new Error("Unauthorized");

        const existing = await ctx.db
            .query("roadmaps")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, args);
        } else {
            await ctx.db.insert("roadmaps", { userId, ...args });
        }
    },
});

export const getRoadmap = query({
    args: { guestId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const userId = identity?.subject ?? args.guestId;

        if (!userId) return null;
        return await ctx.db
            .query("roadmaps")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .first();
    },
});
