---
title: Syntax highlighting
description: >
    Every DSL deserves color.
author: Romain Vasseur
date: 2022-01-03
---

`Cornifer` comes with a comprehensive C4 DSL grammar, which allows powerful syntax highlighting. Color schema is aligned with [semantic convention](https://rvr06.github.io/c4-bootcamp/convention.html) we agreed upon.

At the time of writing, language server has not been implemented yet, preventing extension to provide error checks. In the meanwhile, a tacit workaround is to assume that if you read/write a line w/o any colors, this line is wrong ie conflicts with the underlying grammar (either misspelled or wrongly placed). [Hover](#hover) facility is at the rescue to provide guidance.

![](/assets/highlighting.gif)