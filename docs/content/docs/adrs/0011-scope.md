---
title: Scope
status: accepted
weight: 11
authors: rvr06
date: 2023-01-01
layout: adr
---

## Decision

Update grammar to seamlessly deal with the 2 flavors:
* Explicit
    ```c4u
    s1 = softwareSystem "s1" "description" "tags" 

    p1 = person "p1" "description" "tags" {
        -> s1 "description" "technology" "tags"
    }
    ```
* Implicit
    ```c4u
    s1 = softwareSystem "s1" "description" "tags" 

    p1 = person "p1" "description" "tags" 
    
    p1-> s1 "description" "technology" "tags"
    ```

## Context

Due to its inherent nature coupled with IDE built-in facilities - such as region, collapse, outline - navigating through a `.dsl` file is pretty easy. This said, `relationships` can become difficult to deal with as we have more flexibility to position them within the file.

To deal with that, `Structurizr` language knows about [scoped relationship](https://github.com/structurizr/dsl/blob/master/docs/language-reference.md#relationship) where left part of the relationship defaults to the element in scope.  

## Consequences

Encourage people to use `scoped relationship` to promote encapsulation. There is no reason to materialize a relationship involving 2 components of a container outside of the scope of this container, but noising the higher level picture.