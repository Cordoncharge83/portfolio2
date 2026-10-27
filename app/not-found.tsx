import Link from "next/link";
import { DuskVillage } from "@/components/scene/DuskVillage";

export const metadata = { title: "Off the map" };

export default function NotFound() {
  return (
    <section className="grid gap-6 py-12">
      <p className="label">404</p>
      <h1 className="hero-title">This path isn&apos;t on the map.</h1>
      <p className="text-[1.2rem] text-muted max-w-[36rem]">
        The page you were looking for doesn&apos;t exist, or it moved. The way back to the village square is below.
      </p>
      <div>
        <Link className="btn btn-primary" href="/">
          Back to the home page
        </Link>
      </div>
      <DuskVillage compact />
    </section>
  );
}
