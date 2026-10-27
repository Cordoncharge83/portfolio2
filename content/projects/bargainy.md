---
slug: bargainy
title: Bargainy
tagline: AI negotiation coach
category: software
tier: featured
contextLabel: Personal project
period: { start: "2026", label: "2026" }
status: live
liveUrl: https://bargainy.moudka.com
order: 2
summary: "Rehearse a salary, rent or purchase negotiation against an AI counterpart that pushes back, then get coaching and wording to reuse. The counterpart never sees your goal."
stack: [React, TypeScript, Gemini, Structured outputs, Spline, Cloudflare Pages]
links:
  - { kind: live, label: Live site, href: "https://bargainy.moudka.com" }
  - { kind: repo, label: GitHub, href: null }
thumb: chat
cover:
  src: /shots/bargainy/home-1920.webp
  cardSrc: /shots/bargainy/home-960.webp
  alt: "Bargainy landing page: the headline 'Find your words. Then make your case.' beside an example salary negotiation with a recruiter, the user's counteroffer and a coaching tip."
  width: 1920
  height: 1080
gallery:
  - src: /shots/bargainy/practice-1920.webp
    alt: "Bargainy practice room: an AI recruiter pushes back on a 47,000 euro ask while the user drafts a reply."
    caption: "The practice room. The private goal stays on your side of the screen; the counterpart only sees the shared situation."
    width: 1920
    height: 1080
  - src: /shots/bargainy/report-1920.webp
    alt: "Bargainy coaching report with a readiness score of 78 out of 100, a summary, and lists of what worked and what to try differently."
    caption: "The coaching debrief, rendered from a structured model response."
    width: 1920
    height: 1080
---
## The idea

Most people know what they want from a salary discussion, a rent negotiation or a purchase. What they rarely get is a chance to practise asking. Bargainy is a rehearsal room: you describe the situation, negotiate with an AI counterpart that pushes back, and end the session with coaching on what worked, what to change, and wording you can reuse in the real conversation. No account required.

## How a session works

You pick a scenario (job offer, rent or purchase), describe what the other side already knows, and state your private objective. The counterpart is prompted to defend its own position: it raises objections, makes counteroffers and adapts to your replies. When you end the session, the coach returns a readiness score, a summary, strengths, points to improve, suggested phrasing and a concrete next step. A separate Quick Coach mode answers single questions, such as how to respond when someone says the price is final, without a full roleplay.

## The main design decision

The counterpart must never see your goal, otherwise the practice is meaningless. Each roleplay request contains only the shared situation and the conversation so far; your objective is kept entirely out of it and sent only to the final coaching call, where it's used to judge how well your approach served what you actually wanted. Keeping those two contexts strictly separate is what makes the counterpart behave like a real other side.

## Engineering

A React and TypeScript frontend with server-side calls to Gemini. The model is asked for structured outputs so the coaching report renders as distinct sections rather than free text, with fallbacks between models when a call fails, protected environment variables, and error handling that keeps a session recoverable. Rent and purchase counterparts are tuned to reply more briefly than the recruiter, which made those conversations feel more natural in testing. The Quick Coach is fronted by an interactive 3D assistant built in Spline. Deployed on Cloudflare Pages under a custom domain.

## What I took from it

It's the project where I spent the most time on how an LLM feature should behave for the user rather than on whether it works: what the model is allowed to know, what shape its answers take, and what happens when it fails.
