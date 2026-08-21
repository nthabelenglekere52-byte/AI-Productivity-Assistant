import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Search, Wand2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Field } from "@/components/app/Field";
import { ResultPanel } from "@/components/app/ResultPanel";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { assistResearch } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
  head: () => ({
    meta: [
      { title: "Research Assistant | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Refine research questions, surface key themes, search terms and an outline — with clear separation of AI suggestions and verified sources.",
      },
      { property: "og:title", content: "Research Assistant | AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Structure research questions and generate useful research summaries.",
      },
    ],
  }),
});

function ResearchPage() {
  const run = useServerFn(assistResearch);
  const [form, setForm] = useState({ question: "", topic: "", objectives: "", keywords: "" });
  const [questionError, setQuestionError] = useState<string | undefined>(undefined);
  const [result, setResult] = useState("");
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!form.question.trim()) {
      setQuestionError("Please enter your research question.");
      return;
    }
    setQuestionError(undefined);
    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: form });
      setResult(res.text);
      setDemo(res.demo);
      toast.success("Research guidance ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      toast.error("Could not generate research guidance");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setForm({ question: "", topic: "", objectives: "", keywords: "" });
    setResult("");
    setError(null);
    setQuestionError(undefined);
  };

  return (
    <AppShell>
      <PageHeader
        icon={Search}
        title="Research Assistant"
        description="Structure research questions and generate useful research summaries."
      />

      <div className="mb-6 flex gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
        <p className="text-sm text-foreground">
          <strong>AI suggestions are not verified sources.</strong> Everything below is generated
          guidance — search terms, themes and directions to explore. Never cite a reference you have
          not located and read yourself in a real database or library.
        </p>
      </div>

      <section className="surface-card mb-6 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Research question" htmlFor="question" error={questionError}>
              <Input
                id="question"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="e.g. How does AI adoption affect team productivity?"
              />
            </Field>
          </div>
          <Field label="Topic" htmlFor="topic">
            <Input
              id="topic"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              placeholder="e.g. Workplace automation"
            />
          </Field>
          <Field label="Keywords" htmlFor="keywords">
            <Input
              id="keywords"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              placeholder="Comma separated"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Research objectives" htmlFor="objectives">
              <Textarea
                id="objectives"
                rows={5}
                value={form.objectives}
                onChange={(e) => setForm({ ...form, objectives: e.target.value })}
                placeholder="What do you want to find out? Add any information you already have."
              />
            </Field>
          </div>
        </div>
        <div className="mt-5">
          <Button onClick={generate} disabled={loading}>
            <Wand2 className="size-4" aria-hidden />
            {loading ? "Working…" : "Generate Research Guidance"}
          </Button>
        </div>
      </section>

      <ResultPanel
        title="Research guidance (AI-generated)"
        result={result}
        loading={loading}
        error={error}
        isDemo={demo}
        emptyLabel="Your refined question, themes, search terms and outline will appear here."
        loadingLabel="Structuring your research…"
        onRegenerate={generate}
        onClear={clearAll}
      />

      <ResponsibleAI />
    </AppShell>
  );
}
