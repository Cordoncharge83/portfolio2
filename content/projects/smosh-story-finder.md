---
slug: smosh-story-finder
title: Smosh Story Finder
tagline: A searchable archive of Reading Reddit Stories
category: software
tier: featured
contextLabel: Personal project
period: { start: "2026", label: "2026" }
status: live
liveUrl: https://smosh-story-finder.moudka.com
order: 1
summary: "A searchable archive where a story, not a video, is the unit of data: filter by guest, title or subreddit and land on the exact timestamp in the episode."
stack: [React, TypeScript, Vite, Motion, Radix UI, Python, YouTube Data API v3, GitHub Actions, Cloudflare Pages & Pages Functions]
links:
  - { kind: live, label: Live site, href: "https://smosh-story-finder.moudka.com" }
  - { kind: writeup, label: "Technical write-up (Hashnode)", href: "https://smosh-stories-finder-tech.hashnode.dev" }
  - { kind: repo, label: GitHub, href: null }
thumb: search
cover:
  src: /shots/smosh-story-finder/home-light-1920.webp
  cardSrc: /shots/smosh-story-finder/home-light-960.webp
  darkSrc: /shots/smosh-story-finder/home-dark-1920.webp
  darkCardSrc: /shots/smosh-story-finder/home-dark-960.webp
  alt: "Smosh Story Finder home page: the headline 'Find the story. Relive the reactions.' above a carousel of guest portraits arranged in front of the show's couch."
  width: 1920
  height: 1080
gallery:
  - src: /shots/smosh-story-finder/filtered-light-1920.webp
    darkSrc: /shots/smosh-story-finder/filtered-dark-1920.webp
    alt: "Search filtered to stories featuring both Angela and Chanse: 37 stories found, grouped by episode, with story cards showing subreddit and title."
    caption: "AND semantics: picking Angela and Chanse returns only the stories they share, grouped by episode."
    width: 1920
    height: 1080
  - src: /shots/smosh-story-finder/flipped-light-1920.webp
    darkSrc: /shots/smosh-story-finder/flipped-dark-1920.webp
    alt: "A story card flipped to show its episode, the start timestamp 2:54 and a Watch episode button, next to unflipped cards."
    caption: "The back of a card links straight to the moment the story starts."
    width: 1920
    height: 1080
---
## The problem

*Reading Reddit Stories* has been running for years: hundreds of episodes, each one a couch session where several Reddit stories are read and discussed. Revisiting a specific story, or finding every episode with a particular pair of guests, meant scrubbing through video descriptions by hand. YouTube indexes videos, not the stories inside them.

## What I built

A searchable archive where a *story*, not a video, is the unit of data. Users pick one or more guests (AND semantics: Angela + Chanse returns only episodes featuring both), search by story title, filter by subreddit, and land directly on the timestamp in the original video. Filters serialize into the URL so any selection is shareable, and a Cloudflare Pages Function rewrites the Open Graph tags per-link so shared searches get a meaningful preview instead of the generic homepage card.

The interface is deliberately Smosh-flavoured: a rotating guest carousel modelled on the show's couch, flip cards (title, subreddit and guests on the front; episode, thumbnail and "Watch episode" on the back), infinite scroll via `IntersectionObserver`, and reduced-motion support.

## The hard part: the data

Episode descriptions are the only structured source, and they're inconsistent: timestamps in mixed formats, sponsor and credit segments mixed in with story chapters, Reddit links that are sometimes missing, sometimes pointing to a comment or an update rather than a new story, guests credited under several name variants. Naïvely splitting on timestamps would have produced a catalogue that slowly filled with errors.

So the pipeline separates *collection* from *publication*:

- A **weekly GitHub Actions job** runs a Python collector against the YouTube Data API v3, detects episodes missing from the catalogue, parses chapters and Reddit links, and produces a candidate report, without ever touching the live data.
- A **custom browser-based review tool** lets me correct titles and timestamps, resolve subreddits, skip non-story sections, fix guest associations and add portraits, then exports a reviewed batch.
- A second workflow with **preview** and **publish** modes validates the batch, runs the importer and site checks, builds, commits and deploys through Cloudflare Pages.

Imports are **idempotent**: episodes are keyed by YouTube video ID, manually corrected records are never overwritten by a re-collection, episodes are held back as a unit if any story is unresolved, and an import ledger remembers skipped episodes so they stop reappearing as candidates.

## Deliberate simplicity

No database, no API. The catalogue is a version-controlled JSON file bundled into the frontend, with filtering done client-side after normalising case, accents, apostrophe variants and punctuation. For a small, read-heavy dataset updated in batches, this removes a whole layer of infrastructure, and every data change is reviewable in Git. I documented the trade-offs (bundle growth, rebuild-per-update) and the point at which I'd revisit the decision.

## What it taught me

That the complexity of a product rarely matches the complexity of its interface. A search bar and a grid of cards are only useful because of the system behind them: where the data comes from, how it's verified, and what happens when it's wrong.
