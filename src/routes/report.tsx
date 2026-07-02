import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Upload, Send } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addReport, nextReportId, currentUser, type WasteType } from "@/lib/store";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report Waste — EcoWaste" }] }),
  component: ReportPage,
});

const wasteTypes: WasteType[] = ["Plastic", "Organic", "Electronic", "Medical", "Metal", "Other"];

function ReportPage() {
  const navigate = useNavigate();
  const [reportId, setReportId] = useState("RPT-...");
  const [image, setImage] = useState<string>();
  const [form, setForm] = useState({
    userName: "",
    wasteType: "" as WasteType | "",
    location: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    setReportId(nextReportId());
    setForm((f) => ({ ...f, userName: currentUser() ?? "" }));
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.wasteType) {
      toast.error("Please select a waste type");
      return;
    }
    addReport({
      id: reportId,
      userName: form.userName || "Anonymous",
      wasteType: form.wasteType,
      location: form.location,
      description: form.description,
      image,
      date: form.date,
      status: "Pending",
    });
    toast.success(`Report ${reportId} submitted!`);
    navigate({ to: "/reports" });
  };

  return (
    <DashboardShell title="Report Waste" subtitle="Submit a new waste report">
      <form onSubmit={handleSubmit} className="grid max-w-3xl gap-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reportId">Report ID</Label>
          <Input id="reportId" value={reportId} readOnly className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userName">User Name</Label>
          <Input id="userName" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Waste Type</Label>
          <Select value={form.wasteType} onValueChange={(v) => setForm({ ...form, wasteType: v as WasteType })}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              {wasteTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Street, area, city" required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the waste problem" required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="image">Upload Image</Label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-4 text-sm text-muted-foreground hover:bg-secondary/60">
            <Upload className="h-5 w-5 text-primary" />
            {image ? "Image selected — click to change" : "Click to upload an image"}
            <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>
          {image && <img src={image} alt="Preview" className="mt-2 h-32 rounded-xl object-cover" />}
        </div>
        <Button type="submit" size="lg" className="sm:col-span-2"><Send className="h-4 w-4" /> Submit Report</Button>
      </form>
    </DashboardShell>
  );
}