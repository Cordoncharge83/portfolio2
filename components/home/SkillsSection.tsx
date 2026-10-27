import { alsoKnown, languages, skillGroups } from "@/content/skills";
import { Chapter } from "@/components/ui/Chapter";
import { Tags } from "@/components/ui/Tags";

export function SkillsSection() {
  return (
    <Chapter id="skills" numeral="III." title="Skills">
      <div className="skill-groups">
        {skillGroups.map((g) => (
          <section key={g.id} className="skill-group" aria-labelledby={`skill-${g.id}`}>
            <h3 id={`skill-${g.id}`}>{g.title}</h3>
            <p>{g.summary}</p>
            <Tags items={g.tags} label={`${g.title} tools`} />
          </section>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <section className="grid gap-3 content-start" aria-labelledby="skill-languages">
          <h3 id="skill-languages" className="text-[1.3rem]">
            Languages
          </h3>
          <ul className="languages">
            {languages.map((l) => (
              <li key={l.name}>
                {l.name} <span className="level">{l.level}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="grid gap-3 content-start" aria-labelledby="skill-also">
          <h3 id="skill-also" className="text-[1.3rem]">
            Also
          </h3>
          <Tags items={alsoKnown} label="Other languages and tools" />
        </section>
      </div>
    </Chapter>
  );
}
