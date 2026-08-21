import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessagesSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "AI Workplace Assistant | Work Smarter, Responsibly" },
      {
        name: "description",
        content:
          "An AI productivity suite for the workplace: draft emails, summarize meetings, plan tasks, structure research and chat with an assistant.",
      },
      { property: "og:title", content: "AI Workplace Assistant | Work Smarter, Responsibly" },
      {
        property: "og:description",
        content:
          "Draft emails, summarize meetings, plan tasks and structure research with an AI assistant built for responsible workplace use.",
      },
    ],
  }),
});

const features = [
  {
    to: "/email",
    icon: Mail,
    title: "Email Generation",
    description: "Draft professional emails with the right tone, purpose and length.",
  },
  {
    to: "/meetings",
    icon: NotebookPen,
    title: "Meeting Summarization",
    description: "Turn raw notes into key points, decisions and owned action items.",
  },
  {
    to: "/tasks",
    icon: ListChecks,
    title: "Task Planning",
    description: "Track priorities, deadlines and categories — saved in your browser.",
  },
  {
    to: "/research",
    icon: Search,
    title: "Research Assistance",
    description: "Sharpen questions, surface themes and build a research outline.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Chatbot",
    description: "Ask anything about your work and get conversational guidance.",
  },
] as const;

const principles = [
  { icon: Zap, title: "Fast by default", text: "Every task starts from a focused, simple form." },
  {
    icon: Lock,
    title: "Private by design",
    text: "Keys stay on the server; tasks stay in your browser.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible output",
    text: "Clear disclaimers — you stay the decision maker.",
  },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <section className="gradient-brand mb-8 overflow-hidden rounded-3xl px-6 py-10 text-primary-foreground sm:px-10 sm:py-14">
        <p className="text-sm font-medium opacity-90">AI Workplace Assistant</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Work smarter on everyday workplace tasks
        </h1>
        <p className="mt-4 max-w-2xl text-sm opacity-90 sm:text-base">
          Draft emails, summarize meetings, plan your tasks and structure research — with an
          assistant that keeps you in control of every decision.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Start chatting
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Draft an email
          </Link>
        </div>
      </section>

      <h2 className="mb-4 text-lg font-semibold tracking-tight">What you can do</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ to, icon: Icon, title, description }) => (
          <Link
            key={to}
            to={to}
            className="surface-card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="gradient-soft flex size-11 items-center justify-center rounded-2xl text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Open
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {principles.map(({ icon: Icon, title, text }) => (
          <div key={title} className="surface-card p-5">
            <Icon className="size-5 text-primary" aria-hidden />
            <h3 className="mt-3 text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <ResponsibleAI />
    </AppShell>
  );
}
