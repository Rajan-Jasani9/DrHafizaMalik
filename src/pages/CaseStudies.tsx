import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { caseStudies, type CaseCategory } from "@/data/caseStudies";

type Filter = "all" | CaseCategory;

const CaseStudies = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? caseStudies : caseStudies.filter((c) => c.category === filter);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Case Studies — Hafiza Malik Homeopathy",
    about: ["Autism", "Women's Health", "Classical Homeopathy"],
  };

  return (
    <Layout>
      <SEO
        title="Case Studies"
        description="Anonymized homeopathy case studies from Dr. Hafiza Malik's practice — children with autism and women's health."
        path="/case-studies"
        jsonLd={jsonLd}
      />
      <section className="container py-16 md:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Case studies</h1>
          <p className="mt-4 text-foreground/75">
            Real, anonymized outcomes from our classical homeopathy practice. Individual results vary.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {([
            { id: "all", label: "All" },
            { id: "autism", label: "Autism" },
            { id: "women", label: "Women's Health" },
          ] as const).map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.id as Filter)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <article key={c.id}>
              <Card className="h-full border-border/70 bg-card/70 backdrop-blur">
                <CardContent className="pt-6">
                  <span className="text-xs uppercase tracking-wider text-primary">
                    {c.category === "autism" ? "Autism" : "Women's Health"}
                  </span>
                  <h2 className="mt-2 font-serif text-xl">{c.title}</h2>
                  <p className="mt-2 text-sm text-foreground/70">{c.summary}</p>
                  <div className="mt-4 rounded-lg bg-primary/10 p-3 text-sm">
                    <span className="font-medium text-primary">Outcome: </span>
                    <span className="text-foreground/80">{c.outcome}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{c.ageGender} · {c.duration}</p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
