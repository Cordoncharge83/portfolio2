import { Hero } from "@/components/home/Hero";
import { WorkSection } from "@/components/home/WorkSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.shortName,
  url: site.url,
  jobTitle: "Software engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.alumniOf },
  sameAs: profile.socials.map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
