import { useCallback, useEffect, useState } from "react";

export type Priority = "High" | "Medium" | "Low";
export type Category = "Work" | "Meetings" | "Research" | "Administration" | "Personal";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  category: Category;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "aiwa.tasks.v1";

/** Tasks are persisted in browser localStorage so they survive a refresh. */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw) as Task[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage may be unavailable */
    }
  }, [tasks, hydrated]);

  const addTask = useCallback((task: Omit<Task, "id" | "completed" | "createdAt">) => {
    setTasks((t) => [
      { ...task, id: crypto.randomUUID(), completed: false, createdAt: Date.now() },
      ...t,
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((t) => t.filter((x) => x.id !== id));
  }, []);

  return { tasks, hydrated, addTask, toggleTask, deleteTask };
}
