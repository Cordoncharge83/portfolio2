import type { Metadata } from "next";
import Link from "next/link";
import { HeroScene } from "@/components/scene/HeroScene";
import { Starfield } from "@/components/scene/Starfield";

export const metadata: Metadata = { title: "Off the map" };

export default function NotFound() {
  return (
    <section className="lost" aria-labelledby="lost-title">
      <Starfield preset="hero" className="lost-sky" />
      <HeroScene />
      <div className="container lost-in">
        <p className="px lost-code">404</p>
        <h1 id="lost-title">This path isn&apos;t on the map.</h1>
        <p className="lost-text">
          The page you were looking for doesn&apos;t exist, or it moved. The way back to the village square is below.
        </p>
        <div className="lost-actions">
          <Link className="btn" href="/" prefetch={false}>
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
