import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existingPodcast = await ctx.db.query("podcasts").first();
    if (existingPodcast) {
      return { seeded: false, reason: "podcasts already exist" };
    }

    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), "seed-user"))
      .unique();

    const userId =
      existingUser?._id ??
      (await ctx.db.insert("users", {
        email: "seed@example.com",
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        clerkId: "seed-user",
        name: "Seed User",
      }));

    const sampleAudioUrl =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    const podcasts = [
      {
        podcastTitle: "Tech Today",
        podcastDescription: "Daily tech headlines with quick context.",
        imageUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        audioUrl: sampleAudioUrl,
        author: "Seed User",
        authorId: "seed-user",
        authorImageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        voicePrompt: "Clear, friendly, energetic delivery.",
        imagePrompt: "abstract tech podcast cover",
        voiceType: "alloy",
        audioDuration: 180,
        views: 124,
      },
      {
        podcastTitle: "Design Signals",
        podcastDescription: "Signals, trends, and critiques in design.",
        imageUrl:
          "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        audioUrl: sampleAudioUrl,
        author: "Seed User",
        authorId: "seed-user",
        authorImageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        voicePrompt: "Thoughtful and concise narration.",
        imagePrompt: "minimalist design podcast cover",
        voiceType: "nova",
        audioDuration: 240,
        views: 86,
      },
      {
        podcastTitle: "Founders & Makers",
        podcastDescription: "Short interviews with builders and founders.",
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        audioUrl: sampleAudioUrl,
        author: "Seed User",
        authorId: "seed-user",
        authorImageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        voicePrompt: "Warm, conversational tone.",
        imagePrompt: "startup podcast cover with bold typography",
        voiceType: "fable",
        audioDuration: 210,
        views: 52,
      },
    ];

    await Promise.all(
      podcasts.map((podcast) =>
        ctx.db.insert("podcasts", {
          ...podcast,
          user: userId,
        })
      )
    );

    return { seeded: true, count: podcasts.length };
  },
});

export const backfillAudioUrls = mutation({
  args: {},
  handler: async (ctx) => {
    const sampleAudioUrl =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    const podcasts = await ctx.db.query("podcasts").collect();
    const missing = podcasts.filter((podcast) => !podcast.audioUrl);

    await Promise.all(
      missing.map((podcast) =>
        ctx.db.patch(podcast._id, { audioUrl: sampleAudioUrl })
      )
    );

    return { updated: missing.length };
  },
});
