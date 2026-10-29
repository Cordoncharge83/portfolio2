import type { GalleryImage } from "@/lib/content";
import { srcSetFor } from "@/lib/images";

/* The gallery spans the write-up column: 820px beside the 290px aside, full width on phones. */
const sizes = "(min-width: 1240px) 820px, (min-width: 861px) calc(100vw - 420px), calc(100vw - 44px)";

/* eslint-disable @next/next/no-img-element -- static export: pre-sized WebP files */
export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  return (
    <section className="gallery" aria-labelledby="screens">
      <h2 id="screens">Screens</h2>
      <div className="gallery-list">
        {images.map((img, i) => {
          const shared = { width: img.width, height: img.height, sizes, loading: "lazy", decoding: "async" } as const;
          return (
            <figure key={img.src}>
              <div className="gallery-frame">
                {img.darkSrc ? (
                  <>
                    <img src={img.src} srcSet={srcSetFor(img.src)} alt={img.alt} {...shared} className="day-only" />
                    <img
                      src={img.darkSrc}
                      srcSet={srcSetFor(img.darkSrc)}
                      alt={img.alt}
                      {...shared}
                      className="night-only"
                    />
                  </>
                ) : (
                  <img src={img.src} srcSet={srcSetFor(img.src)} alt={img.alt} {...shared} />
                )}
              </div>
              <figcaption>
                <span className="px gallery-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{img.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
