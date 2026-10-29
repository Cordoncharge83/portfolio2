import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { profile } from "@/content/profile";

export const dynamic = "force-static";
export const alt = "Mouadh, software engineer and game developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: profile.roleLine,
    title: profile.shortName,
    subtitle: profile.ogSubtitle,
  });
}
