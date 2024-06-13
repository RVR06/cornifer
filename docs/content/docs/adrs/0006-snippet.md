---
title: Snippet
status: accepted
weight: 6
authors: rvr06
date: 2022-01-07
layout: adr
---

## Decision

We draft an entire collection of smart snippets leveraging semantic placeholders with full tab-support, leveraging `VS Code` built-in facility.

```ps
${1:identifier} = container "${2:name}" 
                            "${3:description}" 
                            "${4:technology}" 
                            "${5:tags}" 
                            {\n\t${0}\n}
```

## Context

Ready to use snippets ease newcomers integration and speed up veteran contribution.    
Entry point is `vscode.languages.registerCompletionItemProvider`.

## Consequences
