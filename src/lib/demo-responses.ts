/**
 * Demo (offline) responses. Used only when no AI provider is configured,
 * so every interface feature can still be demonstrated end to end.
 */
export function demoEmail(input: {
  recipient: string;
  purpose: string;
  keyPoints: string;
  tone: string;
  length: string;
}) {
  const points = input.keyPoints
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  return `Subject: ${input.purpose}

Dear ${input.recipient || "Colleague"},

I hope this message finds you well. I am writing regarding ${input.purpose.toLowerCase() || "an update"}.

${points.length ? points.map((p) => `• ${p}`).join("\n") : "• (Add key points to see them reflected here.)"}

Please let me know if you would like to discuss this further or if any additional detail would be helpful.

Kind regards,
[Your name]

_(Demo response — ${input.tone.toLowerCase()} tone, ${input.length.toLowerCase()} length. Connect an AI provider for live generation.)_`;
}

export function demoMeeting(input: {
  title: string;
  date: string;
  participants: string;
  notes: string;
}) {
  return `## Meeting Summary
**${input.title || "Untitled meeting"}** — ${input.date || "date not provided"}
Participants: ${input.participants || "not provided"}

The team reviewed the items captured in the notes, aligned on priorities and agreed on the next steps below.

## Key Discussion Points
- ${input.notes.split("\n").filter(Boolean).slice(0, 3).join("\n- ") || "No notes supplied."}

## Decisions Made
- Proceed with the agreed approach discussed in the meeting.

## Action Items
| Action | Owner | Deadline |
| --- | --- | --- |
| Circulate the summary | ${input.participants.split(",")[0]?.trim() || "Owner"} | Within 2 days |
| Confirm next meeting | Team | Next week |

## Follow-up Items
- Verify all owners and deadlines before sharing.

_(Demo response — connect an AI provider for live summarisation.)_`;
}

export function demoResearch(input: {
  question: string;
  topic: string;
  objectives: string;
  keywords: string;
}) {
  return `## Refined Research Question
${input.question || "How can workplace productivity be improved with AI tools?"}

## Key Themes
- ${input.topic || "Topic"} — core concepts and definitions
- Benefits, risks and limitations
- Practical implementation in organisations

## Suggested Search Terms
${input.keywords || "productivity, workplace automation, responsible AI"}

## Research Outline
1. Introduction and background
2. Literature landscape
3. Methodology
4. Findings and discussion
5. Conclusion and recommendations

## Summary of Supplied Information
${input.objectives || "No objectives supplied."}

## Possible Sources to Investigate (AI-generated suggestions — verify before citing)
- Peer-reviewed journals in the field (search via Google Scholar / Scopus)
- Reports from recognised industry or government bodies
- Your institution's library database

> These are suggested *directions*, not verified references. No citation above should be treated as a real source until you have located and checked it yourself.

_(Demo response — connect an AI provider for live research assistance.)_`;
}

export function demoChat(message: string) {
  return `**Demo mode:** no AI provider is configured, so here is a sample reply.

You asked: "${message}"

In a live setup I would answer this using the configured AI model. Meanwhile you can still explore the Email Generator, Meeting Summarizer, Task Planner and Research Assistant — they all work with demo responses.`;
}