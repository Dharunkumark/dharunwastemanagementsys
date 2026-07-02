import { Link } from "@tanstack/react-router";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">EcoWaste</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-sidebar-foreground/70">
            Keeping our environment clean through smart waste management. A real-life solution
            empowering citizens and administrators alike.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-sidebar-foreground">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-sidebar-foreground/70">
            <li><Link to="/" className="hover:text-sidebar-primary">Home</Link></li>
            <li><Link to="/report" className="hover:text-sidebar-primary">Report Waste</Link></li>
            <li><Link to="/reports" className="hover:text-sidebar-primary">View Reports</Link></li>
            <li><Link to="/login" className="hover:text-sidebar-primary">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-sidebar-foreground">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-sidebar-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-sidebar-primary" /> support@ecowaste.in</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-sidebar-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sidebar-primary" /> Green Tech Park, Bengaluru</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-4 text-center text-xs text-sidebar-foreground/60">
        © {new Date().getFullYear()} EcoWaste — Real-Life Solution for Waste Management System.
      </div>
    </footer>
  );
}