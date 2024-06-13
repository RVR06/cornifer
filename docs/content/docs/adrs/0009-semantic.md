---
title: Semantic
status: accepted
weight: 9
authors: rvr06
date: 2022-03-07
layout: adr
---

## Decision

Enrich `Cornifer` to support:
* Contextual Intellisense, such as completion after `Ctrl+Space` or `.`
* Go to definition (F12)
* Smart snippets with detailed view
    ```c4u
    identifier = softwareSystem
                "name"
                "description"
                "tags" {}
    ```
* Complement signature with real life usage when hovering over.

## Context

Modern IDEs support developer along the way, providing helpers and facilities, often known as _IntelliSense_.

## Consequences
