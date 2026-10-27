import { Alegreya_Sans, Alegreya_Sans_SC, Caveat, Fraunces } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
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
