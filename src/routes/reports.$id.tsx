import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ImageOff, Inbox } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { getReports, type WasteReport } from "@/lib/store";
import { statusClass } from "./reports";

export const Route = createFileRoute("/reports/$id")({
  head: () => ({ meta: [{ title: "Report Details — EcoWaste" }] }),
  component: ReportDetailPage,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}

function ReportDetailPage() {
  const { id } = useParams({ from: "/reports/$id" });
  const [report, setReport] = useState<WasteReport | null | undefined>(undefined);

  useEffect(() => {
    setReport(getReports().find((r) => r.id === id) ?? null);
  }, [id]);

  if (report === undefined) {
    return <DashboardShell title="Report Details">Loading…</DashboardShell>;
  }

  if (report === null) {
    return (
      <DashboardShell title="Report Details">
        <div className="grid place-items-center gap-4 rounded-2xl border border-border bg-card p-12 text-center shadow-card">
          <Inbox className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">No report found with ID “{id}”.</p>
          <Button asChild variant="outline">
            <Link to="/reports">
              <ArrowLeft className="h-4 w-4" /> Back to Reports
            </Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title={`Report ${report.id}`} subtitle="Full report details">
      <div className="mb-4">
        <Button asChild variant="outline" size="sm">
          <Link to="/reports">
            <ArrowLeft className="h-4 w-4" /> Back to Reports
          </Link>
        </Button>
      </div>

      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(report.status)}`}>
            {report.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Report ID" value={report.id} />
          <Field label="Reported By" value={report.userName} />
          <Field label="Waste Type" value={report.wasteType} />
          <Field label="Location" value={report.location} />
          <Field label="Date" value={report.date} />
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Problem Described</p>
          <p className="rounded-xl bg-secondary/40 p-3 text-sm text-foreground">
            {report.description || "No description provided."}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Admin Response</p>
          <p className="rounded-xl bg-primary/10 p-3 text-sm text-foreground">
            {report.response || "No response added yet."}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Uploaded Image</p>
          {report.image ? (
            <img
              src={report.image}
              alt={`Waste report ${report.id}`}
              className="max-h-96 w-full rounded-xl bg-muted object-contain"
            />
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              <ImageOff className="h-5 w-5" /> No image uploaded.
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}