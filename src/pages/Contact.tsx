import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/config/site";
import social from "@/config/social.json";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thank you — your message has been received. We'll reply shortly.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact — ${site.clinicName}`,
    mainEntity: {
      "@type": "MedicalBusiness",
      name: site.clinicName,
      address: site.address,
      telephone: social.phone || undefined,
      email: social.email || undefined,
    },
  };

  return (
    <Layout>
      <SEO
        title="Contact"
        description={`Contact ${site.doctorName} for homeopathic consultations — in person or online.`}
        path="/contact"
        jsonLd={jsonLd}
      />

      <section className="container py-16 md:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Get in touch</h1>
          <p className="mt-4 text-foreground/75">
            Reach out to book a consultation or ask a question. We aim to respond within one business day.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3 border-border/70 bg-card/70 backdrop-blur">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="Your full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Optional" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" name="topic" placeholder="e.g. Women's health, Autism support" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required rows={6} placeholder="How can we help?" />
                </div>
                <Button type="submit" size="lg" disabled={sending} className="w-fit">
                  {sending ? "Sending…" : "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/70 bg-card/70 backdrop-blur">
              <CardContent className="space-y-4 p-6">
                <h2 className="font-serif text-xl">Clinic details</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> <span>{site.address}</span></li>
                  <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 text-primary" /> <span>{site.hours}</span></li>
                  {social.phone && <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /> <a href={`tel:${social.phone}`} className="hover:text-primary">{social.phone}</a></li>}
                  {social.email && <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /> <a href={`mailto:${social.email}`} className="hover:text-primary">{social.email}</a></li>}
                  {social.whatsapp && <li className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-4 w-4 text-primary" /> <a href={`https://wa.me/${social.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</a></li>}
                </ul>
                <div className="pt-2">
                  <p className="mb-2 text-sm text-muted-foreground">Follow us</p>
                  <SocialLinks />
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/70 bg-card/70 backdrop-blur">
              <div className="aspect-video">
                <iframe
                  title="Clinic location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
