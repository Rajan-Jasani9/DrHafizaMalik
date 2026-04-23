import social from "@/config/social.json";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MessageCircle, Music2 } from "lucide-react";

type Key = keyof typeof social;

const meta: Record<Key, { label: string; Icon: React.ComponentType<{ className?: string }>; href: (v: string) => string }> = {
  instagram: { label: "Instagram", Icon: Instagram, href: (v) => (v.startsWith("http") ? v : `https://instagram.com/${v.replace(/^@/, "")}`) },
  facebook: { label: "Facebook", Icon: Facebook, href: (v) => (v.startsWith("http") ? v : `https://facebook.com/${v}`) },
  youtube: { label: "YouTube", Icon: Youtube, href: (v) => (v.startsWith("http") ? v : `https://youtube.com/${v}`) },
  linkedin: { label: "LinkedIn", Icon: Linkedin, href: (v) => (v.startsWith("http") ? v : `https://linkedin.com/in/${v}`) },
  tiktok: { label: "TikTok", Icon: Music2, href: (v) => (v.startsWith("http") ? v : `https://tiktok.com/@${v.replace(/^@/, "")}`) },
  whatsapp: { label: "WhatsApp", Icon: MessageCircle, href: (v) => `https://wa.me/${v.replace(/\D/g, "")}` },
  email: { label: "Email", Icon: Mail, href: (v) => `mailto:${v}` },
  phone: { label: "Phone", Icon: Phone, href: (v) => `tel:${v}` },
};

export const SocialLinks = ({ className = "" }: { className?: string }) => {
  const entries = (Object.keys(social) as Key[]).filter((k) => social[k]?.trim());
  if (entries.length === 0) return null;
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {entries.map((k) => {
        const { label, Icon, href } = meta[k];
        return (
          <li key={k}>
            <a
              href={href(social[k])}
              target={k === "email" || k === "phone" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
};
