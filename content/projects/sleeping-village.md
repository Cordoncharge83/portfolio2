---
slug: sleeping-village
title: The Sleeping Village
tagline: This portfolio as a 3D village you explore on foot
category: game
tier: featured
contextLabel: Personal project
period: { start: "2026", label: "2026" }
status: live
statusNote: "Playable in the browser. Project pages, mobile support and performance testing are still in progress."
liveUrl: https://portfolio.moudka.com/village/
order: 6
summary: "This portfolio as a small 3D village at sunset: guide a traveler through its streets, inspect objects inside buildings and collect each project's story in a journal. Built with React Three Fiber and Rapier."
stack: [React, TypeScript, Three.js, React Three Fiber, Rapier, Vite, Blender, Python, Cloudflare Workers]
links:
  - { kind: live, label: Play the village, href: "https://portfolio.moudka.com/village/" }
  - { kind: writeup, label: Technical write-up, href: null }
  - { kind: repo, label: GitHub, href: "https://github.com/Cordoncharge83/sleeping-village" }
thumb: village
cover:
  src: /shots/sleeping-village/entrance.webp
  cardSrc: /shots/sleeping-village/entrance-640.webp
  alt: "The traveler, a small hooded figure with a satchel, on a dirt path at the woodland entrance: timber cottages with terracotta roofs, birch trees and a 'Welcome, traveler' sign under a dusk sky, with the Journal and Map buttons in the corner."
  width: 1892
  height: 855
gallery:
  - src: /shots/sleeping-village/journal-story.webp
    alt: "The traveler's journal open on Story & Supper: a pinned screenshot of Smosh Story Finder on the left page, and 'Find the story you remember.' with a short description on the right."
    caption: "The journal. Each place discovered in the village opens a project's story; here, Smosh Story Finder in the tavern."
    width: 1280
    height: 800
---

## The idea

A portfolio usually asks people to scroll: read an introduction, look through some projects, open a case study, perhaps download a CV. That format works, but I wanted to try something more personal: a small world where visitors discover my work by exploring it.

The Sleeping Village is a browser-based 3D portfolio set in a woodland village at sunset. You guide a traveler through its streets, inspect objects inside buildings and collect project stories in a journal. Smosh Story Finder lives in a tavern, Bargainy has a trading post, Comp Atlas a map lodge and DuelSync a tournament yard. Professional experience belongs in a workshop, while education and skills have their own schoolhouse.

## Exploring is optional

The first constraint was that exploring should never be required. Someone curious can walk around and gradually fill the journal; someone looking for a particular project should reach it directly. So the village has a shortcut, **Browse all projects**, which opens every journal entry at once, and this site is its conventional companion.

That shortcut must not count as exploring. Reading every project through a menu should not silently mark every building as discovered or open the garden gate, so the interface separates permission to read an entry from whether the visitor found it in the world.

## How it's built

- **Interface and application state:** React and TypeScript.
- **3D scene and rendering:** Three.js through React Three Fiber.
- **Character movement and collision:** Rapier.
- **Development and production build:** Vite.
- **Character preparation:** Blender and Python tooling.
- **Saved discoveries:** the browser's localStorage.

There is no backend or database. Content is bundled with the application, physics runs locally and discoveries belong to the visitor's browser, so the game ships as static files, like this site, even though it behaves like a small game. The complexity sits in the client, the content preparation and the build.

## One layout, several representations

The layout follows a hand-drawn map: an entrance leading toward an old tree, branching streets, project destinations and a northern gate. Each building exists several times over: the geometry visitors see, the collision shapes that stop them walking through it, the places where interaction becomes available, and the coordinates navigation checks use. Maintained independently, moving a building becomes risky: the model moves while its invisible wall stays behind, or a ledger sits on a desk while its prompt stays outside.

So the village uses one shared layout definition. Buildings have identifiers, positions and rotations; furniture is described relative to its building; shared helpers convert those local coordinates into world coordinates, and the same definitions feed rendering and collision. Interaction checks work in the building's own space too: being close to a ledger in world coordinates doesn't mean the visitor is inside the room where it can be reached, which keeps prompts from being offered through walls.

## Movement that doesn't depend on the screen

React handles the discrete states well: playing, reading the journal, viewing the map, changing settings, pausing. Character position changes far too often for that, so continuous values live in refs and update the Three.js objects inside React Three Fiber's `useFrame`. The loop only tells React when the nearby destination changes.

Physics advances at a fixed 60 Hz timestep. An accumulator tracks elapsed time, and rendering interpolates between the previous and current physics positions, so the traveler moves at the same speed on a 60 Hz and a 144 Hz display:

```ts
accumulator += delta;

while (accumulator >= PHYSICS_STEP) {
  previous.copy(current);
  current.copy(stepPhysics());
  accumulator -= PHYSICS_STEP;
}

rendered.lerpVectors(previous, current, accumulator / PHYSICS_STEP);
```

Input is normalised so moving diagonally isn't faster; walking is 2.9 metres per second and running 5. Rapier's kinematic character controller and a capsule collider handle collision, with ground snapping and a small autostep for thresholds. There is no jumping or climbing: reliably reaching a project matters more than movement mechanics.

## The camera bug that only showed up while sprinting

The first follow camera compared its distance from the player with the available distance and corrected itself when the difference grew too large. At running speed, ordinary camera lag exceeded that threshold, and the camera snapped forward even on an open path.

The fix separated three concerns. The camera follows the same interpolated position used to render the traveler, so it no longer chases a separately moving target. The viewing direction is smoothed with a time-based factor, `1 - Math.exp(-14 * delta)`. And a ray cast from the camera pivot toward the intended position, ignoring the traveler's collider, handles obstacles: the camera retracts immediately when something blocks it and eases back when the way clears.

Regression checks run the camera at simulated 30, 60, 90 and 144 frames per second and with uneven frame timings. The lesson: a correction should respond to the condition it is meant to solve, and movement lag was not evidence of an obstruction.

## The journal

The journal carries most of the portfolio content, so it is ordinary HTML and CSS above the 3D scene: parchment pages, a leather frame and bookmarks, with real text and controls. Entries have pages for the story, engineering details or a gallery, navigable with buttons or arrow keys. It is a native dialog with focus handling; movement input is cleared when play stops, so a held key can't walk the traveler behind an open book, and the pointer is released while reading.

Discoveries are saved as a small versioned record of entry identifiers. Loading it checks the version, filters out unknown identifiers and duplicates, and falls back to an empty list on invalid data. The garden gate opens when all six required entries are discovered, checking membership in that set rather than accepting any six saved values, and its collider follows the same state, so a restored save reopens the passage. If storage is unavailable, discoveries still work for the visit and the journal explains why they won't be kept.

## Assets and deployment

The environment uses selected Quaternius assets, and the traveler is customised from KayKit. A preparation script copies each glTF model with the buffers and textures it references, keeps the license files, caps runtime textures at 1024 pixels and records hashes of source and processed files, so the process can be inspected and repeated. The traveler is a skinned GLB with seven animation clips, of which Idle, Walk and Run are wired into the game loop. A low-graphics mode lowers the pixel ratio and turns off shadows.

Everything lives under `/village/`. Runtime asset and journal image paths go through a helper that applies Vite's base path, and a production checker follows model dependencies to verify that every resource resolves. The game is deployed as its own Cloudflare Worker, whose routes take `/village/` on this site's domain.

## What's next

The village supports movement, collision, camera control, furnished destinations, journal entries, saved discoveries and the garden gate, and it is playable today. Project presentations still need editing and media, contact and CV actions need finishing inside the experience, performance needs measuring on representative hardware, and usability and accessibility need broader testing.

The content is also still kept twice: the village has its own journal text, while this site publishes the same projects as `/content.json`. The plan is to share facts, links, statuses and media, and let each experience present them in its own rhythm.

What made this project interesting is how often a visual idea turned into a question about system boundaries. The map became shared layout data, smooth movement a timing problem, and a camera bug a lesson in separating follow behaviour from obstruction detection. And if someone would rather go straight to the projects, the portfolio makes that easy too.
