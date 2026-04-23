import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Baby, Flower2, Quote, ClipboardList, FileSearch, FlaskConical, CalendarCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/config/site";
import { faqs } from "@/data/faq";
import { caseStudies } from "@/data/caseStudies";
// Doctor portrait — swap this file to replace the hero image.
// Replace: src/assets/doctor-hafiza-malik.png
import doctorImg from "@/assets/doctor-hafiza-malik.png";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [location]);

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
      <section className="container grid gap-10 py-16 md:grid-cols-2 md:py-24 lg:gap-14">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> Classical Homeopathy
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Gentle remedies,<br />
            <span className="text-primary">deeply individualized</span> care.
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg">
            {site.doctorName} blends classical homeopathy with a compassionate, listening approach — with a special focus on children with autism and women's health.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">Book Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
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
          {/* Doctor cutout shot — swap src/assets/doctor-hafiza-malik.png to replace */}
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
      <section id="about" className="container py-16 md:py-24">
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
      <section id="specializations" className="container py-16 md:py-24">
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
      <section id="how-it-works" className="container py-16 md:py-24">
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
      <section className="container py-16 md:py-24">
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
      <section className="container py-16 md:py-24">
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
      <section id="faq" className="container py-16 md:py-24">
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

      {/* Contact CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl border border-primary/25 bg-primary/10 p-10 text-center md:p-14">
          <h2 className="font-serif text-3xl md:text-4xl">Ready to begin your healing journey?</h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/75">
            Book a consultation with {site.doctorName} — in person or online. We'll listen, carefully.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/contact">Get in touch <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
