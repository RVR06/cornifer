---
title: Fragments
status: accepted
weight: 14
authors: rvr06
date: 2023-02-01
layout: adr
---

## Decision

* Introduce `!ref`, `extends` and `!include` keywords
* Introduce `.dsl` fragment, aka `.dslf` file, support
    ```json
    {
        "id": "c4u",
        "extensions": [
            ".dslf"
        ],
        "description": "Unstructured C4 DSL IDE support for snippet or fragment purpose.",
        "configuration": "./language-configuration.json",
    }
    ```
* Use `.dslf` to declare `Structurizr` fragments for reuse, and compose them in `workspace.dsl` via the `!include` keyword. 
All features but preview one are available within .dslf as well

## Context

Workspaces are likely to sizably grow over time. As for code, it is not so much the amount of lines but the amount of responsibilities this single workspace is now in charge of that may become an issue and thus lead to changes.

As always with those controversial topics, YMMV, but we can foresee to common scenarios that may induce changes:
* Clustering teams contribution ie _segregating_
* Providing variations without noising reference ie _branching_

## Consequences
