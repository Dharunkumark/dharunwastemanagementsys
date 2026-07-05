import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Inbox, Eye, ImageOff, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteReport,
  getReports,
  updateReport,
  type ReportStatus,
  type WasteReport,
} from "@/lib/store";
import { currentUser } from "@/lib/store";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "View Reports — EcoWaste" }] }),
  component: ReportsPage,
});

const statuses: ReportStatus[] = ["Pending", "In Progress", "Completed"];

export function statusClass(status: ReportStatus) {
  return status === "Completed"
    ? "bg-primary/15 text-primary"
    : status === "In Progress"
      ? "bg-chart-4/15 text-chart-4"
      : "bg-chart-5/20 text-chart-5";
}

function ReportsPage() {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [editing, setEditing] = useState<WasteReport | null>(null);
  const [editStatus, setEditStatus] = useState<ReportStatus>("Pending");
  const [editResponse, setEditResponse] = useState("");
  const [viewing, setViewing] = useState<WasteReport | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const refresh = () => setReports(getReports());
  useEffect(() => {
    setIsAdmin(currentUser() === "admin");
    refresh();
  }, []);

  if (isAdmin === false) {
    return (
      <DashboardShell title="View Reports" subtitle="Administrator access only">
        <div className="mx-auto grid max-w-lg place-items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center shadow-card">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-destructive/15 text-destructive">
            <ShieldAlert className="h-9 w-9" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">Admin access required</h2>
          <p className="text-muted-foreground">
            Only administrators can view and manage submitted reports. Please sign in with an admin account.
          </p>
        </div>
      </DashboardShell>
    );
  }

  const openEdit = (r: WasteReport) => {
    setEditing(r);
    setEditStatus(r.status);
    setEditResponse(r.response ?? "");
  };

  const saveEdit = () => {
    if (!editing) return;
    updateReport(editing.id, { status: editStatus, response: editResponse.trim() });
    toast.success("Report updated");
    setEditing(null);
    refresh();
  };

  const remove = (id: string) => {
    deleteReport(id);
    toast.success("Report deleted");
    refresh();
  };

  return (
    <DashboardShell title="View Reports" subtitle={`${reports.length} total reports`}>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell>{r.userName}</TableCell>
                <TableCell>{r.wasteType}</TableCell>
                <TableCell className="max-w-[180px] truncate">{r.location}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(r.status)}`}>{r.status}</span>
                </TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => setViewing(r)} aria-label="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(r)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} aria-label="Delete" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {reports.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                  <Inbox className="mx-auto mb-2 h-8 w-8" /> No reports yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Report {editing?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={editStatus} onValueChange={(v) => setEditStatus(v as ReportStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="response">Response note for citizen</Label>
            <Textarea
              id="response"
              rows={3}
              value={editResponse}
              onChange={(e) => setEditResponse(e.target.value)}
              placeholder="e.g. Our team has been dispatched and will clear the site by tomorrow."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report {viewing?.id}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Reported By</p>
                  <p className="font-medium text-foreground">{viewing.userName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Waste Type</p>
                  <p className="font-medium text-foreground">{viewing.wasteType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{viewing.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{viewing.date}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Problem Described</p>
                <p className="rounded-xl bg-secondary/40 p-3 text-sm text-foreground">
                  {viewing.description || "No description provided."}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Uploaded Image</p>
                {viewing.image ? (
                  <img
                    src={viewing.image}
                    alt={`Waste report ${viewing.id}`}
                    className="max-h-72 w-full rounded-xl object-contain bg-muted"
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                    <ImageOff className="h-5 w-5" /> No image uploaded.
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewing(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}