---
slug: duelsync
title: DuelSync
tagline: Offline-first desktop companion for Konami Tournament Software
category: software
tier: featured
contextLabel: Personal project
period: { start: "2026", label: "2026" }
status: beta
statusNote: Windows installer, access granted to organisers on request
liveUrl: https://duelsync.moudka.com
order: 3
summary: "Sits alongside Konami Tournament Software: watches the tournament file, gives organisers a calmer local dashboard, builds Top Cut brackets and publishes a live page players follow by QR code."
stack: [Tauri v2, Rust, React, TypeScript, FastAPI, SQLite, Cloudflare Workers, KV, Cloudflare Pages]
links:
  - { kind: site, label: Site, href: "https://duelsync.moudka.com" }
  - { kind: docs, label: How it works, href: null }
  - { kind: repo, label: GitHub, href: null }
thumb: bracket
cover:
  src: /shots/duelsync/community-players.webp
  cardSrc: /shots/duelsync/community-players-640.webp
  alt: "DuelSync Community Players view: a searchable table of 16 community profiles with tournaments, points and best rank, beside the selected player's tournament history."
  width: 1277
  height: 752
gallery:
  - src: /shots/duelsync/playoffs.webp
    alt: "A completed Top 4 single-elimination bracket in DuelSync, from semifinals to the final and the champion."
    caption: "Top Cut seeded from the Swiss standings and advanced by clicking through matches."
    width: 1766
    height: 701
  - src: /shots/duelsync/publishing.webp
    alt: "DuelSync event panel with the public link and QR code, the hosted publishing status, and the watched KTS tournament file with its last sync result."
    caption: "The watched KTS file, and one-click publishing of the public page players open by QR code."
    width: 900
    height: 807
---
## The problem

Yu-Gi-Oh! tournament organisers run their events in Konami Tournament Software (KTS). It's the official tool and it has to stay that way, but it offers little beyond the basics: no live page for players to follow, no Top Cut beyond what it handles natively, and a floor full of people crowding the organiser's table to see the pairings. DuelSync sits alongside KTS and fills those gaps without touching the official record.

## What it does

A background watcher reads the KTS `.tournament` file the moment it changes, so pairings, results and players flow into DuelSync with no exports or copy-paste. The organiser gets a calmer local dashboard for matches, results and standings, with BYE handling and automatic round banners. When the Swiss rounds end, DuelSync generates a single-elimination Top Cut (Top 4 to Top 64) seeded from the standings, advanced by clicking through matches. One click publishes a read-only snapshot to a hosted page, shareable by link or QR code, so players follow the event from their phones. Across events, a local community database recognises returning players and keeps their history searchable. Backup and restore are built in, and the app also works for tournaments that don't have a KTS file at all.

## Design principles

*Local-first.* Everything runs on the organiser's computer and stays usable without a connection; the internet is needed only to publish. *Privacy by design.* Public pages contain only what's meant for players; sensitive identifiers never leave the machine. *Complement, don't replace.* KTS remains the source of truth, and DuelSync integrates into the existing workflow rather than asking organisers to change it.

## Engineering

A Tauri v2 desktop app with a React frontend and a packaged FastAPI backend persisting to SQLite. The publishing path is separate: snapshots go through Cloudflare Workers and KV to a static Pages site with responsive desktop and mobile views. I owned the data model, the API, the interface, the installer and the deployment, and iterated on the whole thing with a real organiser running real events, which shaped most of the floor-level details.

## Status

Shipped as a Windows installer and currently in beta, with access granted to organisers on request.
