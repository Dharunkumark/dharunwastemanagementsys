import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle2, Users, ArrowUpRight } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getReports, userCount, type WasteReport } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — EcoWaste" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    setReports(getReports());
    setUsers(userCount());
  }, []);

  const pending = reports.filter((r) => r.status !== "Completed").length;
  const completed = reports.filter((r) => r.status === "Completed").length;

  const cards = [
    { label: "Total Reports", value: reports.length, icon: FileText, tone: "bg-chart-1/15 text-chart-1" },
    { label: "Pending Reports", value: pending, icon: Clock, tone: "bg-chart-5/20 text-chart-5" },
    { label: "Completed Reports", value: completed, icon: CheckCircle2, tone: "bg-primary/15 text-primary" },
    { label: "Registered Users", value: users, icon: Users, tone: "bg-chart-2/15 text-chart-2" },
  ];

  const statusBadge = (status: WasteReport["status"]) =>
    status === "Completed"
      ? "bg-primary/15 text-primary"
      : status === "In Progress"
        ? "bg-chart-4/15 text-chart-4"
        : "bg-chart-5/20 text-chart-5";

  return (
    <DashboardShell title="Dashboard" subtitle="Overview of waste management activity">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 text-3xl font-extrabold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Reports</h2>
          <Link to="/reports" className="text-sm font-medium text-primary hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {reports.slice(0, 5).map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-secondary/40 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate font-medium text-foreground">{r.wasteType} · {r.location}</div>
                <div className="text-xs text-muted-foreground">{r.id} · {r.userName} · {r.date}</div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}