export type CaseCategory = "autism" | "women";

export interface CaseStudy {
  id: string;
  title: string;
  category: CaseCategory;
  ageGender: string;
  duration: string;
  summary: string;
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "c1",
    title: "Nonverbal child gaining eye contact & first words",
    category: "autism",
    ageGender: "Boy, 4 yrs",
    duration: "9 months",
    summary:
      "Presented with minimal eye contact, repetitive stimming, and no functional speech. Constitutional remedy selected after full case-taking.",
    outcome:
      "Sustained eye contact within 8 weeks, single-word requests by month 5, short phrases by month 9.",
  },
  {
    id: "c2",
    title: "Sensory overload & sleep disruption eased",
    category: "autism",
    ageGender: "Girl, 6 yrs",
    duration: "6 months",
    summary:
      "Severe auditory sensitivity and fragmented sleep. Gentle individualized remedy alongside sensory routine.",
    outcome:
      "Continuous sleep restored within 7 weeks; calmer school transitions reported by therapists.",
  },
  {
    id: "c3",
    title: "PCOS — cycle regulation without hormonal therapy",
    category: "women",
    ageGender: "Woman, 27",
    duration: "7 months",
    summary:
      "Irregular cycles (45–90 days), acne, mood swings, weight gain. Constitutional homeopathy with lifestyle counseling.",
    outcome:
      "Cycles regular within 4 months, skin cleared, mood stabilized, 6 kg natural weight loss.",
  },
  {
    id: "c4",
    title: "Recurrent migraine in perimenopause",
    category: "women",
    ageGender: "Woman, 46",
    duration: "5 months",
    summary:
      "Monthly hormonal migraines unresponsive to painkillers, with anxiety and hot flushes.",
    outcome:
      "Migraine frequency reduced from weekly to once in 3 months; flushes markedly lighter.",
  },
  {
    id: "c5",
    title: "Prenatal nausea & anxiety",
    category: "women",
    ageGender: "Woman, 32",
    duration: "3 months",
    summary:
      "First-trimester severe nausea and anticipatory anxiety. Safe, gentle remedies appropriate for pregnancy.",
    outcome:
      "Nausea controlled within 2 weeks, anxiety lifted, healthy pregnancy continued to term.",
  },
  {
    id: "c6",
    title: "Meltdowns & food selectivity in autism",
    category: "autism",
    ageGender: "Boy, 7 yrs",
    duration: "8 months",
    summary:
      "Daily meltdowns, extreme food selectivity (4 foods), gut discomfort.",
    outcome:
      "Meltdowns reduced ~80%, food range expanded to 15+ items, digestion markedly improved.",
  },
];
