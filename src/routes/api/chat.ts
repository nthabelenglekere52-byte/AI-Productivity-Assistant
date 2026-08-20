import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  ASSISTANT_MODEL,
  createLovableAiGatewayProvider,
  getApiKey,
} from "@/lib/ai-gateway.server";
import { demoChat } from "@/lib/demo-responses";

const SYSTEM =
  "You are the AI Workplace Assistant: a concise, professional productivity assistant. Help with emails, meeting summaries, task prioritisation, research structuring and work planning. Use markdown. Never invent citations or facts; say when something must be verified by a human.";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: UIMessage[] };
        const messages = body.messages;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = getApiKey();
        if (!key) {
          // ===== AI CONNECTION POINT: no provider configured -> demo reply =====
          const last = messages[messages.length - 1];
          const text = last?.parts
            ?.map((p) => (p.type === "text" ? p.text : ""))
            .join(" ")
            .trim();
          return new Response(demoChat(text || "..."), {
            headers: { "content-type": "text/plain; charset=utf-8" },
          });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway(ASSISTANT_MODEL),
          system: SYSTEM,
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});