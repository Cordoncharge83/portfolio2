import type { GalleryImage } from "@/lib/content";
import { srcSetFor } from "@/lib/images";

const sizes = "(min-width: 68rem) 42rem, (min-width: 54rem) calc(100vw - 22rem), 100vw";

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
                <img src={img.src} srcSet={srcSetFor(img.src)} sizes={sizes} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="dark:hidden" />
                <img src={img.darkSrc} srcSet={srcSetFor(img.darkSrc)} sizes={sizes} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="hidden dark:block" />
              </>
            ) : (
              <img src={img.src} srcSet={srcSetFor(img.src)} sizes={sizes} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
            )}
          </div>
          <figcaption>{img.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}
