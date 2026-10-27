import { getJournal, getProjects } from "@/lib/content";
import { profile } from "@/content/profile";
import { alsoKnown, languages, skillGroups } from "@/content/skills";

/** The whole portfolio as data, for the village game. Generated at build time. */
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    profile,
    projects: getProjects(),
    journal: getJournal(),
    skills: { groups: skillGroups, languages, alsoKnown },
  });
}
