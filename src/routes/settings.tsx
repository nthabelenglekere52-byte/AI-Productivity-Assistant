import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, KeyRound, Github, ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "How the AI provider is configured, where data is stored and how to use the assistant responsibly.",
      },
      { property: "og:title", content: "Settings | AI Workplace Assistant" },
      {
        property: "og:description",
        content: "AI configuration, data storage and responsible use settings.",
      },
    ],
  }),
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        description="How this assistant is configured and where your data lives."
      />

      <section className="surface-card mb-6 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <KeyRound className="size-5 text-primary" aria-hidden />
          <h2 className="text-base font-semibold">AI provider</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          AI requests run on the server only. The API key is read from the server environment
          variable <code className="rounded bg-muted px-1.5 py-0.5">LOVABLE_API_KEY</code> and is
          never sent to the browser. If no key is configured, every feature falls back to realistic
          demo responses so the interface stays fully usable.
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Server functions:</strong>{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">src/lib/ai.functions.ts</code>
          </li>
          <li>
            <strong className="text-foreground">Chat stream endpoint:</strong>{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">src/routes/api/chat.ts</code>
          </li>
          <li>
            <strong className="text-foreground">Provider setup:</strong>{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">src/lib/ai-gateway.server.ts</code>
          </li>
        </ul>
      </section>

      <section className="surface-card mb-6 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-5 text-primary" aria-hidden />
          <h2 className="text-base font-semibold">Data storage</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Tasks are stored locally in your browser (localStorage) so they survive a page refresh.
          Nothing is uploaded to a database. Generated content is not saved — copy anything you want
          to keep.
        </p>
      </section>

      <section className="surface-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Github className="size-5 text-primary" aria-hidden />
          <h2 className="text-base font-semibold">Project</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Full setup, configuration and contribution notes live in the project{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">README.md</code>.
        </p>
      </section>

      <ResponsibleAI />
    </AppShell>
  );
}
