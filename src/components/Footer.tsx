import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { SocialLinks } from "@/components/SocialLinks";

export const Footer = () => (
  <footer className="mt-20 border-t border-border bg-background/60">
    <div className="container grid gap-10 py-12 md:grid-cols-3">
      <div>
        <h3 className="font-serif text-2xl">{site.clinicName}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>
      <div>
        <h4 className="font-serif text-lg">Explore</h4>
        <ul className="mt-3 space-y-2 text-sm">
          <li><Link to="/" className="text-foreground/70 hover:text-primary">Home</Link></li>
          <li><Link to="/case-studies" className="text-foreground/70 hover:text-primary">Case Studies</Link></li>
          <li><Link to="/contact" className="text-foreground/70 hover:text-primary">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-serif text-lg">Visit</h4>
        <address className="mt-3 space-y-1 text-sm not-italic text-foreground/70">
          <div>{site.address}</div>
          <div>{site.hours}</div>
        </address>
      </div>
    </div>
    <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} {site.clinicName}. All rights reserved.
    </div>
  </footer>
);
