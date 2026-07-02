// Lightweight localStorage-backed store for the demo app.
export type WasteType = "Plastic" | "Organic" | "Electronic" | "Medical" | "Metal" | "Other";
export type ReportStatus = "Pending" | "In Progress" | "Completed";

export interface WasteReport {
  id: string;
  userName: string;
  wasteType: WasteType;
  location: string;
  description: string;
  image?: string;
  date: string;
  status: ReportStatus;
}

export interface AppUser {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  password: string;
}

const REPORTS_KEY = "ecowaste_reports";
const USERS_KEY = "ecowaste_users";
const SESSION_KEY = "ecowaste_session";

const isBrowser = () => typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

const seedReports: WasteReport[] = [
  { id: "RPT-1001", userName: "Aarav Sharma", wasteType: "Plastic", location: "MG Road, Bengaluru", description: "Overflowing plastic bins near the bus stop.", date: "2026-06-28", status: "Pending" },
  { id: "RPT-1002", userName: "Priya Nair", wasteType: "Organic", location: "Anna Nagar, Chennai", description: "Food waste dumped in the park.", date: "2026-06-26", status: "In Progress" },
  { id: "RPT-1003", userName: "Rahul Verma", wasteType: "Electronic", location: "Sector 62, Noida", description: "Old monitors and cables left on the pavement.", date: "2026-06-24", status: "Completed" },
  { id: "RPT-1004", userName: "Sneha Iyer", wasteType: "Medical", location: "Kothrud, Pune", description: "Discarded syringes near clinic gate.", date: "2026-06-22", status: "Pending" },
  { id: "RPT-1005", userName: "Karan Mehta", wasteType: "Metal", location: "Navrangpura, Ahmedabad", description: "Scrap metal blocking the footpath.", date: "2026-06-20", status: "Completed" },
];

export function getReports(): WasteReport[] {
  const existing = read<WasteReport[] | null>(REPORTS_KEY, null);
  if (existing === null) {
    write(REPORTS_KEY, seedReports);
    return seedReports;
  }
  return existing;
}

export function saveReports(reports: WasteReport[]) {
  write(REPORTS_KEY, reports);
}

export function addReport(report: WasteReport) {
  const reports = getReports();
  reports.unshift(report);
  saveReports(reports);
}

export function updateReport(id: string, patch: Partial<WasteReport>) {
  const reports = getReports().map((r) => (r.id === id ? { ...r, ...patch } : r));
  saveReports(reports);
}

export function deleteReport(id: string) {
  saveReports(getReports().filter((r) => r.id !== id));
}

export function nextReportId(): string {
  const reports = getReports();
  const nums = reports
    .map((r) => parseInt(r.id.replace(/[^0-9]/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return `RPT-${max + 1}`;
}

export function getUsers(): AppUser[] {
  return read<AppUser[]>(USERS_KEY, []);
}

export function addUser(user: AppUser) {
  const users = getUsers();
  users.push(user);
  write(USERS_KEY, users);
}

export function userCount(): number {
  // Seed demo count so the dashboard looks populated.
  return getUsers().length + 128;
}

export function login(username: string, password: string): boolean {
  const users = getUsers();
  const found = users.find((u) => u.username === username && u.password === password);
  // Allow demo login without registration.
  if (found || (username === "admin" && password === "admin")) {
    write(SESSION_KEY, { username });
    return true;
  }
  return false;
}

export function logout() {
  if (isBrowser()) localStorage.removeItem(SESSION_KEY);
}

export function currentUser(): string | null {
  const s = read<{ username: string } | null>(SESSION_KEY, null);
  return s?.username ?? null;
}