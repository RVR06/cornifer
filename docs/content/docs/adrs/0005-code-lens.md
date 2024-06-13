---
title: CodeLens
status: proposed
weight: 5
authors: rvr06
date: 2022-01-06
layout: adr
---

## Decision

See how one could implement this leveraging [programmatic language features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features) & [language server](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) to achieve this.  
Entry point is `vscode.languages.registerCodeLensProvider`.

## Context

Some model insights are difficult to properly grasp, especially elements usage like relationships involved cardinality.

## Consequences
