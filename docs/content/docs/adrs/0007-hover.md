---
title: Hover
status: accepted
weight: 7
authors: rvr06
date: 2022-01-07
layout: adr
---

## Decision

We draft an entire help library, showcasing both isolated usage & structural position. Concept is explained and examples provided to better grasp the usage. Finally, we link the official github thread. Everything is available by hovering over keywords.   

```md
identifier = person "name" "description" "tags"',

workspace "" "" {',
model {',
identifier = person "name" "description" "tags"',

**Person**
[person](https://github.com/structurizr/dsl/blob/master/docs/language-reference.md#person)
Defines a person e.g. a user, actor, role, or persona.'
```

## Context

Contextual and local help maximize UX and RoI for newcomers.  
Entry point is `vscode.languages.registerHoverProvider`.

## Consequences
