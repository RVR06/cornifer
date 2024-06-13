---
title: Short form & one liner
status: accepted
weight: 13
authors: rvr06
date: 2023-01-01
layout: adr
---

## Decision

Even if it is up to each indiviual or team to contextually agree upon the best strategy, tooling should enable each approach.  
Thus, grammar will be extended to seamlessly deal with all flavors.

Those following lines are both valid and equivalent, from the more detailled declaration to the minimum viable one.
```c4u
c1 = container "c1" "description" "technology" "tags" {
}
c1 = container "c1" "description" "technology" "tags"
c1 = container "c1" "description" "technology"
c1 = container "c1" "description"
c1 = container "c1"
```

## Context

Moving to code-first approach means we have to shift the way we are thinking about our architecture staples. 

> The more you write, the more you have to deal with.  
> The less you write, the more you have to figure out.

## Consequences

Evangelize regarding the fact that grammar validity does not mean model completeness.  
Even if it is perfectly fine to declare a `container` without specifying neither `description`, `technology` and `tags`, the model you end up with will not be that useful..