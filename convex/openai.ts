import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    const fallbackUrl =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice as SpeechCreateParams["voice"],
        input,
      });

      return await mp3.arrayBuffer();
    } catch (error) {
      console.warn("Falling back to placeholder audio:", error);
      const response = await fetch(fallbackUrl);
      return await response.arrayBuffer();
    }
  },
});

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const fallbackUrl =
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1024&q=80";

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        size: "1024x1024",
        quality: "standard",
        n: 1,
      });

      const url = response.data[0].url;
      if (!url) {
        throw new Error("Error generating thumbnail");
      }

      const imageResponse = await fetch(url);
      return await imageResponse.arrayBuffer();
    } catch (error) {
      console.warn("Falling back to placeholder thumbnail:", error);
      const imageResponse = await fetch(fallbackUrl);
      return await imageResponse.arrayBuffer();
    }
  }
})
