import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, RefreshCw, Trash2, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LoadingBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-6 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function EmptyBlock({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border p-10 text-center">
      <FileText className="size-6 text-muted-foreground" aria-hidden />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function ResultPanel({
  title,
  result,
  loading,
  error,
  emptyLabel,
  loadingLabel,
  onRegenerate,
  onClear,
  isDemo,
}: {
  title: string;
  result: string;
  loading: boolean;
  error?: string | null;
  emptyLabel: string;
  loadingLabel: string;
  onRegenerate?: () => void;
  onClear: () => void;
  isDemo?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy — please select and copy manually.");
    }
  };

  return (
    <section className="surface-card p-5 sm:p-6" aria-live="polite">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copy} disabled={!result}>
            {copied ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
            Copy
          </Button>
          {onRegenerate ? (
            <Button variant="outline" size="sm" onClick={onRegenerate} disabled={loading}>
              <RefreshCw className="size-4" aria-hidden />
              Regenerate
            </Button>
          ) : null}
          <Button variant="ghost" size="sm" onClick={onClear} disabled={loading}>
            <Trash2 className="size-4" aria-hidden />
            Clear
          </Button>
        </div>
      </div>

      {isDemo && result ? (
        <p className="mb-3 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground">
          Demo response — no AI provider is configured yet.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
      ) : loading ? (
        <LoadingBlock label={loadingLabel} />
      ) : result ? (
        <div className="prose-assistant max-w-none text-sm text-foreground">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      ) : (
        <EmptyBlock label={emptyLabel} />
      )}
    </section>
  );
}