import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { MessagesSquare, Send, Trash2, Loader2, User, Bot } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "AI Chat | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Ask questions and get help with emails, meetings, task prioritisation, research and weekly planning.",
      },
      { property: "og:title", content: "AI Chat | AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Conversational help with everyday workplace tasks.",
      },
    ],
  }),
});

const suggestions = [
  "Draft a professional email.",
  "Summarize these meeting notes.",
  "Help me prioritize my tasks.",
  "Help me structure my research.",
  "Create a weekly work plan.",
];

function textOf(parts: Array<{ type: string; text?: string }>) {
  return parts
    .map((p) => (p.type === "text" ? (p.text ?? "") : ""))
    .join("")
    .trim();
}

function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message || "The assistant could not respond."),
  });

  const loading = status === "submitted" || status === "streaming";

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || loading) return;
    setInput("");
    await sendMessage({ text: value });
  };

  return (
    <AppShell>
      <PageHeader
        icon={MessagesSquare}
        title="AI Chat"
        description="Ask questions and get assistance with workplace tasks."
      />

      <section className="surface-card flex min-h-[28rem] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <span className="text-sm font-medium">Conversation</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMessages([]);
              toast.success("Conversation cleared");
            }}
            disabled={messages.length === 0}
          >
            <Trash2 className="size-4" aria-hidden />
            Clear
          </Button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
          {messages.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Start a conversation — or try one of these prompts:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={cn("flex gap-3", isUser ? "flex-row-reverse text-right" : "")}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-xl",
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "gradient-soft text-primary",
                    )}
                  >
                    {isUser ? (
                      <User className="size-4" aria-hidden />
                    ) : (
                      <Bot className="size-4" aria-hidden />
                    )}
                  </span>
                  <div
                    className={cn(
                      "max-w-[85%] text-sm",
                      isUser
                        ? "rounded-2xl bg-primary px-4 py-2.5 text-left text-primary-foreground"
                        : "prose-assistant text-foreground",
                    )}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{textOf(m.parts)}</p>
                    ) : (
                      <ReactMarkdown>{textOf(m.parts)}</ReactMarkdown>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Thinking…
            </div>
          ) : null}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="border-t border-border p-4"
        >
          <div className="flex items-end gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <Textarea
              id="chat-input"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask about emails, meetings, tasks or research…"
              className="min-h-[3rem] flex-1 resize-none"
            />
            <Button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
              <Send className="size-4" aria-hidden />
            </Button>
          </div>
        </form>
      </section>

      <ResponsibleAI compact />
    </AppShell>
  );
}
