import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Field } from "@/components/app/Field";
import { ResultPanel } from "@/components/app/ResultPanel";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  component: EmailPage,
  head: () => ({
    meta: [
      { title: "Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails in seconds — choose recipient, purpose, key points, tone and length.",
      },
      { property: "og:title", content: "Email Generator | AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Draft clear, professional workplace emails with AI assistance.",
      },
    ],
  }),
});

const tones = ["Professional", "Friendly", "Formal", "Concise", "Persuasive"];
const lengths = ["Short", "Medium", "Long"];

const selectClass =
  "h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [form, setForm] = useState({
    recipient: "",
    purpose: "",
    keyPoints: "",
    tone: "Professional",
    length: "Medium",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const generate = async () => {
    const next: Record<string, string> = {};
    if (!form.recipient.trim()) next.recipient = "Please enter a recipient or role.";
    if (!form.purpose.trim()) next.purpose = "Please describe the purpose of the email.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setError(null);
    try {
      const res = await run({ data: form });
      setResult(res.text);
      setDemo(res.demo);
      toast.success("Email generated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      toast.error("Could not generate the email");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setForm({ recipient: "", purpose: "", keyPoints: "", tone: "Professional", length: "Medium" });
    setResult("");
    setError(null);
    setErrors({});
  };

  return (
    <AppShell>
      <PageHeader
        icon={Mail}
        title="Email Generator"
        description="Create professional workplace emails in seconds."
      />

      <section className="surface-card mb-6 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Recipient / role" htmlFor="recipient" error={errors.recipient}>
            <Input
              id="recipient"
              value={form.recipient}
              onChange={(e) => set("recipient")(e.target.value)}
              placeholder="e.g. Line manager, Thabo (Finance)"
            />
          </Field>
          <Field label="Email purpose" htmlFor="purpose" error={errors.purpose}>
            <Input
              id="purpose"
              value={form.purpose}
              onChange={(e) => set("purpose")(e.target.value)}
              placeholder="e.g. Request a deadline extension"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Key points"
              htmlFor="keyPoints"
              hint="One point per line. Only supplied facts will be used."
            >
              <Textarea
                id="keyPoints"
                rows={5}
                value={form.keyPoints}
                onChange={(e) => set("keyPoints")(e.target.value)}
                placeholder={"Project is 80% complete\nNeed two extra days\nWill share draft on Friday"}
              />
            </Field>
          </div>
          <Field label="Tone" htmlFor="tone">
            <select
              id="tone"
              className={selectClass}
              value={form.tone}
              onChange={(e) => set("tone")(e.target.value)}
            >
              {tones.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Length" htmlFor="length">
            <select
              id="length"
              className={selectClass}
              value={form.length}
              onChange={(e) => set("length")(e.target.value)}
            >
              {lengths.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <Button onClick={generate} disabled={loading}>
            <Wand2 className="size-4" aria-hidden />
            {loading ? "Generating…" : "Generate Email"}
          </Button>
        </div>
      </section>

      <ResultPanel
        title="Generated email"
        result={result}
        loading={loading}
        error={error}
        isDemo={demo}
        emptyLabel="Your generated email will appear here."
        loadingLabel="Drafting your email…"
        onRegenerate={generate}
        onClear={clearAll}
      />

      <ResponsibleAI compact />
    </AppShell>
  );
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/email"!</div>
}
