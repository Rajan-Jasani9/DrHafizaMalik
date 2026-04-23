import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Baby, Flower2, Quote, ClipboardList, FileSearch, FlaskConical, CalendarCheck, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";
import social from "@/config/social.json";
import { faqs } from "@/data/faq";
import { caseStudies } from "@/data/caseStudies";
// Doctor portrait placeholder — replace with final cutout when ready.
import doctorImg from "@/assets/doctor-hafiza-malik.png";

const Index = () => {
  const location = useLocation();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "auto" }), 50);
    }
  }, [location]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thank you — your message has been received. We'll reply shortly.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: site.clinicName,
      description: site.seo.description,
      address: site.address,
      openingHours: site.hours,
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: site.doctorName,
      medicalSpecialty: ["Homeopathy", "Pediatrics", "Women's Health"],
    },
  ];

  return (
    <Layout>
      <SEO jsonLd={jsonLd} />

      {/* Hero */}
      <section className="container grid gap-6 py-12 md:grid-cols-2 md:py-16 lg:gap-8">
        <div className="flex flex-col justify-center">
          
          <h1 className="mt-5 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Gentle remedies,<br />
            <span className="text-primary">deeply individualized</span> care.
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg">
            {site.doctorName} blends classical homeopathy with a compassionate, listening approach — with a special focus on children with autism and women's health.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#contact">Book Consultation <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#specializations">Our Specializations</a>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Experience</dt>
              <dd className="mt-1 font-serif text-2xl text-foreground">{site.stats.yearsExperience}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Patients</dt>
              <dd className="mt-1 font-serif text-2xl text-foreground">{site.stats.patientsTreated}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Focus Areas</dt>
              <dd className="mt-1 font-serif text-2xl text-foreground">{site.stats.specializations}</dd>
            </div>
          </dl>
        </div>

        <div className="relative flex items-end justify-center">
          {/* Doctor cutout shot placeholder */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[3rem] bg-primary/15 blur-2xl" aria-hidden />
            <img
              src={doctorImg}
              alt={`${site.doctorName}, classical homeopath`}
              width={768}
              height={1024}
              className="max-h-[620px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">About {site.doctorName}</h2>
          <p className="mt-5 text-foreground/75">{site.shortBio}</p>
          <p className="mt-4 text-foreground/75">
            Her philosophy is simple: every person carries a unique story, and the right remedy emerges from careful listening — not a one-size-fits-all protocol.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
          {[
            { icon: Heart, title: "Compassionate", body: "Long, unhurried consultations." },
            { icon: Sparkles, title: "Classical", body: "Single remedy, individualized approach." },
            { icon: Flower2, title: "Holistic", body: "Mind, body, and lifestyle together." },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-border/70 bg-card/70 backdrop-blur">
              <CardContent className="pt-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-serif text-xl">{title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Specializations */}
      <section id="specializations" className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Specializations</h2>
          <p className="mt-4 text-foreground/75">
            Two areas of dedicated practice, built on years of focused clinical experience.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="group overflow-hidden border-border/70 bg-card/80 backdrop-blur transition-shadow hover:shadow-lg">
            <CardContent className="p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Baby className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-2xl">Children with Autism</h3>
              <p className="mt-3 text-foreground/75">
                Gentle, individualized support for sensory challenges, sleep, focus, and emotional regulation — alongside your existing therapies.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground/70">
                <li>• Sensory overload & sleep</li>
                <li>• Speech and engagement</li>
                <li>• Meltdowns and anxiety</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group overflow-hidden border-border/70 bg-card/80 backdrop-blur transition-shadow hover:shadow-lg">
            <CardContent className="p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Flower2 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-2xl">Women's Health</h3>
              <p className="mt-3 text-foreground/75">
                Hormonal balance, menstrual concerns, fertility support, prenatal care, and emotional wellbeing at every life stage.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground/70">
                <li>• PCOS & cycle irregularities</li>
                <li>• Pregnancy & postpartum</li>
                <li>• Perimenopause & mood</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">How it works</h2>
          <p className="mt-4 text-foreground/75">A calm, structured path from first consultation to lasting relief.</p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { icon: ClipboardList, title: "Consult", body: "A detailed 60–90 min case-taking." },
            { icon: FileSearch, title: "Case Study", body: "Analysis to find your constitutional picture." },
            { icon: FlaskConical, title: "Remedy", body: "A single, individualized homeopathic remedy." },
            { icon: CalendarCheck, title: "Follow-up", body: "Regular reviews to refine the plan." },
          ].map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="relative rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur">
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Step {i + 1}
              </span>
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-serif text-xl">{title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">What patients share</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { quote: "After months of struggle, our son finally sleeps through the night. Dr. Malik's care was a turning point.", who: "Mother of 5-year-old" },
            { quote: "My cycles normalized in four months, naturally — I had been on hormones for years.", who: "Patient, 29" },
            { quote: "She truly listens. I never felt rushed. The remedy worked quietly but profoundly.", who: "Patient, 41" },
          ].map((t) => (
            <Card key={t.who} className="border-border/70 bg-card/70 backdrop-blur">
              <CardContent className="pt-6">
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-3 text-foreground/80">“{t.quote}”</p>
                <p className="mt-4 text-sm font-medium text-muted-foreground">— {t.who}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Case studies teaser */}
      <section className="container py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Case studies</h2>
            <p className="mt-2 max-w-xl text-foreground/75">Real, anonymized stories from our practice.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/case-studies">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((c) => (
            <Card key={c.id} className="border-border/70 bg-card/70 backdrop-blur">
              <CardContent className="pt-6">
                <span className="text-xs uppercase tracking-wider text-primary">
                  {c.category === "autism" ? "Autism" : "Women's Health"}
                </span>
                <h3 className="mt-2 font-serif text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{c.summary}</p>
                <p className="mt-3 text-xs text-muted-foreground">{c.ageGender} · {c.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Frequently asked</h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger className="text-left font-serif text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/75">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container pb-14 pt-2 md:pt-4">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Get in touch</h2>
          <p className="mt-4 text-foreground/75">
            Reach out to book a consultation or ask a question. We aim to respond within one business day.
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Card className="border-border/70 bg-card/70 backdrop-blur lg:col-span-3">
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
                  {sending ? "Sending..." : "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/70 bg-card/70 backdrop-blur">
              <CardContent className="space-y-4 p-6">
                <h3 className="font-serif text-xl">Clinic details</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> <span>{site.address}</span></li>
                  <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 text-primary" /> <span>{site.hours}</span></li>
                  {social.phone && <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /> <a href={`tel:${social.phone}`} className="hover:text-primary">{social.phone}</a></li>}
                  {social.email && <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /> <a href={`mailto:${social.email}`} className="hover:text-primary">{social.email}</a></li>}
                  {social.whatsapp && <li className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-4 w-4 text-primary" /> <a href={`https://wa.me/${social.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</a></li>}
                </ul>
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

export default Index;
