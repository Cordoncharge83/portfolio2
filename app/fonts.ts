import localFont from "next/font/local";
import { Alegreya_Sans, Alegreya_Sans_SC, Caveat } from "next/font/google";

/*
 * Fraunces from Google Fonts with SOFT pinned to 100 (the soft, rounded cut) and
 * weight limited to 400–600, keeping the optical-size axis. Pinning the axes cuts
 * the Latin files from ~270 KB to ~100 KB. Files in assets/fonts (SIL OFL 1.1).
 */
export const fraunces = localFont({
  src: [
    { path: "../assets/fonts/Fraunces-Soft-latin.woff2", weight: "400 600", style: "normal" },
    { path: "../assets/fonts/Fraunces-Soft-Italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const alegreya = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-alegreya",
  display: "swap",
});

export const alegreyaSC = Alegreya_Sans_SC({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-alegreya-sc",
  display: "swap",
  preload: false,
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});
