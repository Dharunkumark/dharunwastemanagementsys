import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Recycle,
  MapPin,
  BarChart3,
  ShieldCheck,
  Bell,
  Smartphone,
  LogIn,
  Trash2,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/hero-waste.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  { icon: MapPin, title: "Geo-tagged Reports", desc: "Citizens report waste with exact location so cleanup crews respond faster." },
  { icon: BarChart3, title: "Smart Dashboard", desc: "Administrators track pending, in-progress and completed reports in real time." },
  { icon: Bell, title: "Instant Alerts", desc: "Status updates keep everyone informed from report to resolution." },
  { icon: Recycle, title: "Waste Segregation", desc: "Classify plastic, organic, e-waste, medical and metal for proper disposal." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Report on the go with a fully responsive, easy-to-use interface." },
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "Role-based access keeps citizen and administrator data protected." },
];

const stats = [
  { value: "1,200+", label: "Reports Resolved" },
  { value: "45+", label: "City Zones" },
  { value: "128+", label: "Active Citizens" },
  { value: "98%", label: "Response Rate" },
];

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-float-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Leaf className="h-4 w-4 text-primary" /> Smart India Hackathon Project
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Real-Life Solution for{" "}
              <span className="text-primary">Waste Management System</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Keeping Our Environment Clean Through Smart Waste Management.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-eco">
                <Link to="/login"><LogIn className="h-4 w-4" /> Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/report"><Trash2 className="h-4 w-4" /> Report Waste</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-hero opacity-10 blur-2xl" />
            <img
              src={heroImg}
              alt="Citizens sorting waste into recycling bins in a clean green smart city"
              width={1280}
              height={960}
              className="relative w-full rounded-3xl border border-border shadow-card"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">About the Project</h2>
          <p className="mt-4 text-muted-foreground">
            EcoWaste bridges the gap between citizens and municipal authorities. Anyone can quickly
            report improperly disposed waste with a location and photo, while administrators
            monitor, prioritise and resolve reports from a single professional dashboard. The result
            is faster cleanups, better waste segregation, and cleaner, healthier communities.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Powerful Features</h2>
            <p className="mt-3 text-muted-foreground">Everything you need for smart, efficient waste management.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-hero px-8 py-14 text-center shadow-eco">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to make your city cleaner?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Join hundreds of citizens already reporting and resolving waste problems.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to="/register">Get Started <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
