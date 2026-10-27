---
slug: sopra-steria
kind: work
title: Sopra Steria
org: Sopra Steria
role: Software Engineer Intern
focus: Java
period: { start: "2025-04", end: "2025-10", label: "April – October 2025" }
order: 1
summary: "Six months on ARPEGE, the healthcare information system used by France's national health insurance: features across production releases, incident fixes and a restartable Spring Batch job."
highlights: ["200,000+ line Java/Angular codebase", "Spring Batch job over ~9,000 records", "80%+ test coverage on touched components"]
stack: [Java, Spring Boot, Spring Batch, Angular, SQL, JUnit, Mockito, Log4j2, SOAP UI, Git]
---
## The context

Six months on ARPEGE, a healthcare information system used by the CNAM, France's national health insurance, serving millions of insured people. A mature Java/Spring Boot and Angular codebase of 200,000+ lines, with the release cadence, business rules and test discipline that come with production-critical public infrastructure.

## What I did

I shipped features across several production releases and spent a good share of my time on the other side of the lifecycle: production incidents. Diagnosing one meant reading the business rule, the SQL behind it and the Java that applied it, often through Log4j2 traces, then designing a fix that wouldn't surprise the rest of the system. Every change was validated with JUnit and Mockito, and I kept the components I touched above 80% automated coverage.

One piece I'm particularly proud of: a Spring Batch job to re-process roughly 9,000 records in bulk, where correctness and restartability mattered more than speed.

## What I took from it

How large systems actually get maintained: reading before writing, mocking external services (SOAP UI) so tests stay deterministic, and treating a codebase you didn't write with the care of one you did. It's the counterweight to my AI and side-project work, where I'm usually building from a blank page.
