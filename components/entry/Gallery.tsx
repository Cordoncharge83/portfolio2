import type { GalleryImage } from "@/lib/content";

/* eslint-disable @next/next/no-img-element -- static export: pre-sized WebP files */
export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  return (
    <section className="gallery" aria-labelledby="screens">
      <h2 id="screens">Screens</h2>
      {images.map((img) => (
        <figure key={img.src}>
          <div className="gallery-frame">
            {img.darkSrc ? (
              <>
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="dark:hidden" />
                <img src={img.darkSrc} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="hidden dark:block" />
              </>
            ) : (
              <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
            )}
          </div>
          <figcaption>{img.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}
