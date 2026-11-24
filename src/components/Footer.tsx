import Link from "next/link";
export default function Footer() {


  return (
    <footer className="bg-section border-t border-border mt-auto">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-foreground tracking-tight"
            >
              PizzaHub
            </Link>
            <p className="mt-2 text-sm text-text-muted">
              Pizza ordering and delivery platform for customers, vendors, and admins.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Platform
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Join Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboard Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Dashboard
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/dashboard/customer" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Customer Orders
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Vendor Menu
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Admin Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; 2026 PizzaHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-text-muted hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-text-muted hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}