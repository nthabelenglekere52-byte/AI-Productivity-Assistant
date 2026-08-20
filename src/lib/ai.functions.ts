import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { demoEmail, demoMeeting, demoResearch } from "./demo-responses";

const EmailInput = z.object({
  recipient: z.string().min(1),
  purpose: z.string().min(1),
  keyPoints: z.string().default(""),
  tone: z.string().default("Professional"),
  length: z.string().default("Medium"),
});

const MeetingInput = z.object({
  title: z.string().default(""),
  date: z.string().default(""),
  participants: z.string().default(""),
  notes: z.string().min(1),
});

const ResearchInput = z.object({
  question: z.string().min(1),
  topic: z.string().default(""),
  objectives: z.string().default(""),
  keywords: z.string().default(""),
});

/** ===== AI CONNECTION POINT (server-only) ===== */
async function runPrompt(system: string, prompt: string): Promise<string> {
  const { createLovableAiGatewayProvider, ASSISTANT_MODEL, getApiKey } = await import(
    "./ai-gateway.server"
  );
  const key = getApiKey();
  if (!key) return "";

  const { streamText } = await import("ai");
  const gateway = createLovableAiGatewayProvider(key);
  const result = streamText({
    model: gateway(ASSISTANT_MODEL),
    system,
    prompt,
  });
  return await result.text;
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const text = await runPrompt(
      "You are a workplace communication assistant. Write clear, respectful, ready-to-send business emails in markdown. Always start with a 'Subject:' line. Never invent facts that were not supplied.",
      `Write an email.
Recipient / role: ${data.recipient}
Purpose: ${data.purpose}
Key points:
${data.keyPoints}
Tone: ${data.tone}
Length: ${data.length}`,
    );
    return { text: text || demoEmail(data), demo: !text };
  });

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => MeetingInput.parse(d))
  .handler(async ({ data }) => {
    const text = await runPrompt(
      "You summarise meetings. Output markdown with these headings exactly: '## Meeting Summary', '## Key Discussion Points', '## Decisions Made', '## Action Items' (a markdown table with Action | Owner | Deadline), '## Follow-up Items'. Only use information present in the notes; write 'Not specified' where unknown.",
      `Meeting title: ${data.title}
Date: ${data.date}
Participants: ${data.participants}
Notes/transcript:
${data.notes}`,
    );
    return { text: text || demoMeeting(data), demo: !text };
  });

export const assistResearch = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) => {
    const text = await runPrompt(
      "You are a research assistant. Output markdown with headings: '## Refined Research Question', '## Key Themes', '## Suggested Search Terms', '## Research Outline', '## Summary of Supplied Information', '## Possible Sources to Investigate'. CRITICAL: never fabricate citations, authors, titles, DOIs or years. Under sources, suggest only types of sources, databases and search strategies, and end with a clear note that these are unverified AI suggestions that must be checked before citing.",
      `Research question: ${data.question}
Topic: ${data.topic}
Objectives: ${data.objectives}
Keywords: ${data.keywords}`,
    );
    return { text: text || demoResearch(data), demo: !text };
  });