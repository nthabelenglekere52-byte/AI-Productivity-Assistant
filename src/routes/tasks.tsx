import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Plus, Trash2, CalendarDays, Check } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Field } from "@/components/app/Field";
import { ResponsibleAI } from "@/components/app/ResponsibleAI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTasks, type Category, type Priority } from "@/lib/useTasks";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
  head: () => ({
    meta: [
      { title: "Task Planner | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Organise workplace tasks with priorities, deadlines and categories. Tasks are saved in your browser.",
      },
      { property: "og:title", content: "Task Planner | AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Organise tasks, priorities and deadlines in one clean workspace.",
      },
    ],
  }),
});

const priorities: Priority[] = ["High", "Medium", "Low"];
const categories: Category[] = ["Work", "Meetings", "Research", "Administration", "Personal"];
const filters = ["All", "Pending", "Completed", "High Priority"] as const;

const selectClass =
  "h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const priorityStyles: Record<Priority, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-foreground",
  Low: "bg-success/15 text-foreground",
};

function TasksPage() {
  const { tasks, hydrated, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium" as Priority,
    deadline: "",
    category: "Work" as Category,
  });

  const visible = useMemo(() => {
    if (filter === "Pending") return tasks.filter((t) => !t.completed);
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    if (filter === "High Priority") return tasks.filter((t) => t.priority === "High");
    return tasks;
  }, [tasks, filter]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setTitleError("Please enter a task title.");
      return;
    }
    setTitleError(undefined);
    addTask({ ...form, title: form.title.trim() });
    setForm({ title: "", description: "", priority: "Medium", deadline: "", category: "Work" });
    toast.success("Task added");
  };

  return (
    <AppShell>
      <PageHeader
        icon={ListChecks}
        title="Task Planner"
        description="Organize tasks, priorities and deadlines. Saved automatically in your browser."
      />

      <form onSubmit={submit} className="surface-card mb-6 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Task" htmlFor="title" error={titleError}>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Prepare quarterly report"
            />
          </Field>
          <Field label="Deadline" htmlFor="deadline">
            <Input
              id="deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description" htmlFor="description">
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Optional detail or next step"
              />
            </Field>
          </div>
          <Field label="Priority" htmlFor="priority">
            <select
              id="priority"
              className={selectClass}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Category" htmlFor="category">
            <select
              id="category"
              className={selectClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <Button type="submit">
            <Plus className="size-4" aria-hidden />
            Add Task
          </Button>
        </div>
      </form>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Task filters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === f
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {!hydrated ? (
        <div className="surface-card p-8 text-sm text-muted-foreground">Loading your tasks…</div>
      ) : visible.length === 0 ? (
        <div className="surface-card p-10 text-center">
          <p className="text-sm text-muted-foreground">
            {tasks.length === 0
              ? "No tasks yet — add your first task above."
              : "No tasks match this filter."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {visible.map((task) => (
            <li
              key={task.id}
              className={cn("surface-card p-4 transition-shadow", task.completed && "opacity-70")}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    task.completed ? "border-transparent bg-success text-white" : "border-input",
                  )}
                >
                  {task.completed ? <Check className="size-3.5" aria-hidden /> : null}
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "font-medium break-words",
                      task.completed && "text-muted-foreground line-through",
                    )}
                  >
                    {task.title}
                  </p>
                  {task.description ? (
                    <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 font-medium",
                        priorityStyles[task.priority],
                      )}
                    >
                      {task.priority}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
                      {task.category}
                    </span>
                    {task.deadline ? (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="size-3.5" aria-hidden />
                        {task.deadline}
                      </span>
                    ) : null}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    deleteTask(task.id);
                    toast.success("Task deleted");
                  }}
                  aria-label={`Delete task: ${task.title}`}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ResponsibleAI compact />
    </AppShell>
  );
}
