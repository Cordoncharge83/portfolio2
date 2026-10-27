---
slug: la-banque-postale
kind: work
title: La Banque Postale
org: La Banque Postale
role: AI Engineering Intern
period: { start: "2024-05", end: "2024-08", label: "May – August 2024" }
order: 2
summary: "Designed and built a retrieval-augmented assistant over the bank's internal documentation, end to end, and compared retrieval and re-ranking strategies to improve answer relevance."
highlights: ["End-to-end RAG assistant", "Compared retrieval & re-ranking strategies", "Retrieval over images and tables"]
stack: [Python, LangChain, PostgreSQL, pgvector, OpenAI embeddings, Semantic search, Re-ranking]
---
## The context

Internal documentation at a bank is vast, scattered and hard to search by keyword alone. The team wanted to know whether retrieval-augmented generation could give employees a reliable way to ask questions in plain language and get answers grounded in the actual documents.

## What I did

I designed and built the assistant end to end: document ingestion and chunking, embeddings, vector storage in PostgreSQL with pgvector, retrieval, re-ranking and a desktop interface, all in Python with LangChain. Rather than settle on the first pipeline that worked, I evaluated several retrieval and re-ranking strategies against each other to improve answer relevance, then extended the system beyond text so it could retrieve the images and tables buried in the documentation as well.

I delivered a working, production-ready prototype with a technical handoff so the team could carry it forward after the internship.

## What I took from it

That the quality of a RAG system lives in the retrieval, not the model. Chunking, ranking and evaluation decide whether an answer is trustworthy; the LLM mostly decides whether it reads well. That lesson shaped how I've built every AI project since.
