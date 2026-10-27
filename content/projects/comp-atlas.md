---
slug: comp-atlas
title: Comp Atlas
tagline: VALORANT analytics for analysts and coaches
category: software
tier: featured
contextLabel: Personal project
period: { start: "2026-09", label: "2026" }
status: closed-beta
statusNote: Access on request
liveUrl: null
order: 4
summary: "Turns 700+ professional VALORANT maps into something you can query: find winning compositions around locked agents, or scout an opponent's map pool, lineups and pistol rounds."
stack: [Next.js, React, TypeScript, Tailwind, shadcn, Cloudflare Pages, Cloudflare Workers]
links:
  - { kind: access, label: Request beta access, href: null, note: "Closed beta, access on request" }
thumb: ranks
cover:
  src: /shots/comp-atlas/team-prep-1920.webp
  cardSrc: /shots/comp-atlas/team-prep-960.webp
  alt: "Comp Atlas Team Prep overview for Team Liquid: series record, map win rate, most picked and banned maps, per-map win-rate bars and their most-played Lotus lineup."
  width: 1920
  height: 1080
gallery:
  - src: /shots/comp-atlas/finder-1920.webp
    alt: "Comp Atlas Comp Finder with Omen and Sova locked, listing matching five-agent lineups with the teams that played them and how many maps each was used on."
    caption: "Composition Lab: lock agents and get every composition that includes them."
    width: 1920
    height: 1080
  - src: /shots/comp-atlas/core-1920.webp
    alt: "Comp Atlas Composition Lab with Omen and Sova selected as a team core, showing a 47% non-mirror win rate over 154 qualifying maps."
    caption: "Non-mirror win rates for a two-agent core across every covered event."
    width: 1920
    height: 1080
---
## The problem

Professional VALORANT produces a lot of public match data, but it's scattered across match pages and hard to interrogate. Questions an analyst actually asks, like which five-agent compositions win on Haven once a specific agent is locked, how a given team drafts across its map pool, or how often they convert a pistol round, mean clicking through dozens of series by hand. Comp Atlas turns that archive into something you can query.

## What it does

Two workflows, from the site's tagline: *build your game* and *read theirs*.

*Composition Lab* is for building. Lock one or more agents and the finder returns every composition that includes them, with pick counts and win rates filtered by competition, region and map, and links to the VODs. Rankings are available per map with a minimum-pick threshold so rare comps don't dominate. Agent win rates are computed on non-mirror matchups only, so an agent picked by both sides doesn't count against itself, and the same method extends to archetypes such as a Neon/Phoenix duo on a map.

*Team Prep* is for scouting. Pick an opponent and get their map pool with picks and bans, their most played lineup per map with full composition records, attack and defence splits, and pistol-round summaries and conversions, scoped to a single event or the whole archive.

## Data and publishing

Over 700 professional maps so far, imported from VLR.gg across events including Champions 2024, VCT 2026 Stage 2 and Champions 2026. Imports are owner-only and go through an admin workflow: choose an event, fetch its series and maps, review results and dates, then publish a coordinated snapshot that can be applied or restored. Analysts never see a half-imported event.

## Engineering

Next.js and React with Tailwind and shadcn, deployed on Cloudflare Pages with Workers for the API and server-enforced permissions on the admin routes. Every view's state (team, map, event, filters, sort) lives in the URL, so any analysis can be bookmarked or sent to a teammate. Started in September 2026 and built solo, with the feature set driven by the questions I'd want answered as a coach rather than by what was easy to compute.
