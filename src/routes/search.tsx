import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReports, type WasteReport } from "@/lib/store";
import { statusClass } from "./reports";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — EcoWaste" }] }),
  component: SearchPage,
});

const wasteOptions = ["All", "Plastic", "Organic", "Electronic", "Medical", "Metal", "Other"];
const statusOptions = ["All", "Pending", "In Progress", "Completed"];

function SearchPage() {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [q, setQ] = useState("");
  const [wasteType, setWasteType] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => setReports(getReports()), []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesTerm =
        !term ||
        r.id.toLowerCase().includes(term) ||
        r.userName.toLowerCase().includes(term) ||
        r.location.toLowerCase().includes(term);
      const matchesType = wasteType === "All" || r.wasteType === wasteType;
      const matchesStatus = status === "All" || r.status === status;
      return matchesTerm && matchesType && matchesStatus;
    });
  }, [reports, q, wasteType, status]);

  return (
    <DashboardShell title="Search Reports" subtitle="Find reports by ID, user, type, location or status">
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-3">
          <Label>Search (Report ID, User Name or Location)</Label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to search..." className="pl-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Waste Type</Label>
          <Select value={wasteType} onValueChange={setWasteType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {wasteOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {statusOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell>{r.userName}</TableCell>
                <TableCell>{r.wasteType}</TableCell>
                <TableCell className="max-w-[180px] truncate">{r.location}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(r.status)}`}>{r.status}</span>
                </TableCell>
                <TableCell>{r.date}</TableCell>
              </TableRow>
            ))}
            {results.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No matching reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  );
}