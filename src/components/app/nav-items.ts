import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessagesSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { to: string; label: string; icon: LucideIcon };

export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Summarizer", icon: NotebookPen },
  { to: "/tasks", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chat", icon: MessagesSquare },
  { to: "/settings", label: "Settings", icon: Settings },
];