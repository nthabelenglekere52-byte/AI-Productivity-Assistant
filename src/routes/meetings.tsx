import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { NotebookPen, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Field } from "@/components/app/Field";
import { ResultPanel } from "@/components/app/ResultPanel";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { summarizeMeeting } from "@/lib/ai.functions";

export const Route = createFileRoute("/meetings")({
  component: MeetingsPage,
  head: () => ({
    meta: [
      { title: "Meeting Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn meeting notes or transcripts into clear summaries, decisions, action items, owners and deadlines.",
      },
      { property: "og:title", content: "Meeting Summarizer | AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Clear meeting summaries with decisions, owners and deadlines.",
      },
    ],
  }),
});

function MeetingsPage() {
  const run = useServerFn(summarizeMeeting);
  const [form, setForm] = useState({ title: "", date: "", participants: "", notes: "" });
  const [noteError, setNoteError] = useState<string | undefined>(undefined);
  const [result, setResult] = useState("");
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const summarize = async () => {
    if (form.notes.trim().length < 20) {
      setNoteError("Please paste at least a few lines of meeting notes.");
      return;
    }
    setNoteError(undefined);
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: form });
      setResult(res.text);
      setDemo(res.demo);
      toast.success("Meeting summarised");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      toast.error("Could not summarise the meeting");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setForm({ title: "", date: "", participants: "", notes: "" });
    setResult("");
    setError(null);
    setNoteError(undefined);
  };

  return (
    <AppShell>
      <PageHeader
        icon={NotebookPen}
        title="Meeting Summarizer"
        description="Turn meeting notes into clear summaries and action items."
      />

      <section className="surface-card mb-6 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Meeting title" htmlFor="title">
            <Input
              id="title"
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
              placeholder="Weekly team sync"
            />
          </Field>
          <Field label="Meeting date" htmlFor="date">
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => set("date")(e.target.value)}
            />
          </Field>
          <Field label="Participants" htmlFor="participants">
            <Input
              id="participants"
              value={form.participants}
              onChange={(e) => set("participants")(e.target.value)}
              placeholder="Comma separated"
            />
          </Field>
          <div className="sm:col-span-3">
            <Field
              label="Meeting notes / transcript"
              htmlFor="notes"
              error={noteError}
              hint="Do not paste confidential or personal information."
            >
              <Textarea
                id="notes"
                rows={10}
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
                placeholder="Paste your raw notes or transcript here…"
              />
            </Field>
          </div>
        </div>
        <div className="mt-5">
          <Button onClick={summarize} disabled={loading}>
            <Wand2 className="size-4" aria-hidden />
            {loading ? "Summarising…" : "Summarize Meeting"}
          </Button>
        </div>
      </section>

      <ResultPanel
        title="Meeting summary"
        result={result}
        loading={loading}
        error={error}
        isDemo={demo}
        emptyLabel="Your summary, decisions and action items will appear here."
        loadingLabel="Reading the notes and building the summary…"
        onRegenerate={summarize}
        onClear={clearAll}
      />

      <ResponsibleAI compact />
    </AppShell>
  );
}