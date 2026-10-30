---
slug: game-recommender
title: Game Recommender
tagline: Semantic game recommendations from a plain-language description
category: software
tier: compact
contextLabel: Personal project
period: { start: "2026-01", label: "2026" }
status: archived
liveUrl: null
order: 9
summary: "Describe the kind of game you want in plain words and get titles ranked by semantic similarity: OpenAI embeddings stored in PostgreSQL with pgvector, a FastAPI REST API and a React interface."
highlights: ["Embedding pipeline", "pgvector similarity search", "FastAPI + React"]
stack: [Python, FastAPI, OpenAI embeddings, PostgreSQL, pgvector, React]
links:
  - { kind: repo, label: GitHub, href: "https://github.com/Cordoncharge83/Whatnexttoplay" }
thumb: search
---

A semantic recommendation web app. Game descriptions are embedded and stored in PostgreSQL with pgvector; a natural-language query is embedded the same way and matched by vector similarity, with query embeddings cached so repeated searches skip the embedding call. Results are exposed through a FastAPI REST API and browsed in a React interface.
