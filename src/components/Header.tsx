import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "about", label: "About" },
  { id: "specializations", label: "Specializations" },
  { id: "how-it-works", label: "How It Works" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  const goToSection = (id: string) => {
    setOpen(false);
    if (!onHome) {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label={site.clinicName}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">{site.clinicName}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="text-sm text-foreground/70 transition-colors hover:text-primary"
            >
              {s.label}
            </button>
          ))}
          <Link to="/case-studies" className="text-sm text-foreground/70 transition-colors hover:text-primary">
            Case Studies
          </Link>
          <Button size="sm" onClick={() => goToSection("contact")}>
            Contact
          </Button>
        </nav>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
              >
                {s.label}
              </button>
            ))}
            <Link to="/case-studies" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Case Studies
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
