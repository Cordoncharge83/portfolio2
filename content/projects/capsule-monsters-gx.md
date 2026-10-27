---
slug: capsule-monsters-gx
title: CapsuleMonstersGX
tagline: Grid-based tactical RPG in Unity
category: game
tier: featured
contextLabel: Personal project
period: { start: "2026", label: "2026" }
status: in-development
liveUrl: null
order: 5
summary: "A grid-based tactical RPG inspired by Capsule Monster Coliseum, with an AP economy that grows as you summon, capsule deployment, fusion, and an enemy that plays by the same rules."
highlights: ["Shared AP economy for player and enemy", "Goal-based BFS enemy pathfinding", "Vertical slice: Jaden vs Zane"]
takeaway: null
stack: [Unity 6, C#, 2D URP, Tilemap, TextMesh Pro]
links:
  - { kind: repo, label: GitHub, href: "https://github.com/Cordoncharge83/CapsuleMonstersGX" }
thumb: grid
draft: true
---

## The idea

CapsuleMonstersGX is a grid-based tactical RPG inspired by *Yu-Gi-Oh! Capsule Monster Coliseum* and set in the GX era. The aim is to keep what defined the original (tactical positioning, a growing AP economy, capsule deployment and fusion) while modernising the pacing, feedback and readability of combat.

## What it does

Moving, attacking and summoning all cost AP. Summoning a monster also raises your maximum AP for later turns, up to a level cap: start at 2 AP, summon Avian for +1, and the next turn restores to 3. Early summons are an investment in tempo.

Before the battle, you place capsules in a deployment zone; each stays on the field until you spend AP to summon it. Two adjacent monsters can fuse into a stronger unit, at the summon cost of the result, so fusion is a tactical power spike rather than a free upgrade.

The arena is modelled on the Duel Academy duel platform: an octagonal field with a blocked centre and left and right lanes. Units move and attack in cross, diagonal or diamond patterns, and six elements scale damage by 1.5x or 0.5x.

The enemy follows the same rules. It deploys capsules, summons with AP, grows its own maximum AP and ends its turn when the AP runs out. Newly summoned units, on either side, wait a turn before acting.

## The hard part: getting the enemy around the arena

Once the arena had blocked terrain, enemy movement broke down: units got stuck, oscillated between positions and ignored the arena's geometry.

I fixed it in two passes. The first added a lightweight BFS so moves were scored on real walkable distance, with penalties for backtracking and undoing progress. The second replaced the remaining "move towards the target" scoring, which measured geometric closeness and still left units orbiting or drifting towards invalid corners. The AI now works out every free cell from which its attack pattern can reach the target, runs a BFS to the nearest one, and scores each candidate move on path progress towards it, minus penalties for tiles near or threatened by player units. Enemies now commit to a lane and navigate around the platform.

## Engineering

Unity 6 with the 2D Universal Render Pipeline, and Tilemaps for the grid, blocking terrain and highlights. The code is split into components: `GridManager` for input, placement and summoning, `TurnManager` for turns and both AP pools, `EnemyAI`, and a `FusionManager` driven by recipes keyed by unit ID. Enemy turns run as coroutines with short delays and range previews, so you can follow what the AI is doing.

## Status

In development. The current goal is a polished vertical slice battle, Jaden vs Zane, with the focus on balancing and combat feel rather than content. Beyond the slice, the README plans more GX-era monsters and characters, more fusion variety, capsule and deck management, and a story and progression structure.
