import { alsoKnown, languages, skillGroups } from "@/content/skills";
import { SectionHead } from "@/components/ui/SectionHead";
import { Tags } from "@/components/ui/Tags";

export function SkillsSection() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title" tabIndex={-1}>
      <div className="container">
        <SectionHead id="skills-title" eyebrow="Stack & tools" title="Skills" />
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div key={g.id} className="skill-group">
              <h3>{g.title}</h3>
              <p>{g.summary}</p>
              <Tags items={g.tags} label={`${g.title}: tools`} />
            </div>
          ))}
        </div>
        <ul className="langs" aria-label="Languages">
          {languages.map((l) => (
            <li key={l.name}>
              {l.name} <span className="px">{l.level}</span>
            </li>
          ))}
        </ul>
        <div className="skills-also">
          <p id="skills-also-label" className="px">
            Also
          </p>
          <ul aria-labelledby="skills-also-label">
            {alsoKnown.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
