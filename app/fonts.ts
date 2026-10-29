import { Instrument_Sans, Pixelify_Sans, Silkscreen } from "next/font/google";

/*
 * Pixelify Sans for headings, the wordmark, menu links and buttons; Instrument Sans for
 * running text; Silkscreen for the small pixel labels. All three show on the first screen,
 * so their Latin files are preloaded. Files are downloaded at build time and self-hosted.
 */

export const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/*
 * The italic only appears inside running text further down a page, so it is a separate,
 * non-preloaded call. Both calls declare the same "Instrument Sans" family, so the browser
 * picks the italic faces up through --font-instrument; its own variable is never used.
 */
export const instrumentSansItalic = Instrument_Sans({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-instrument-italic",
  display: "swap",
  preload: false,
});

export const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
  display: "swap",
});
