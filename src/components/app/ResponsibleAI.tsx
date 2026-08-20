import { ShieldCheck } from "lucide-react";

const points = [
  "Review all AI-generated content before you use or send it.",
  "AI can produce inaccurate, outdated or biased information.",
  "Never enter confidential, personal or sensitive workplace information.",
  "Verify research claims and never cite a reference you have not checked.",
  "AI should support human decision-making, not replace professional judgement.",
];

export function ResponsibleAI({ compact = false }: { compact?: boolean }) {
  return (
    <section className="surface-card mt-8 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="gradient-soft flex size-9 items-center justify-center rounded-xl text-primary">
          <ShieldCheck className="size-5" aria-hidden />
        </span>
        <h2 className="text-base font-semibold">Responsible AI</h2>
      </div>
      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        {(compact ? points.slice(0, 3) : points).map((p) => (
          <li key={p} className="flex gap-2">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}