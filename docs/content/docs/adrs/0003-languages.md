---
title: Languages
status: accepted
weight: 3
authors: rvr06
date: 2022-01-05
layout: adr
---

## Decision

2 versions of the language are introduced. The main one `c4` associated with `.dsl` file provides respectful implementation. The 2nd one `c4u` - `u` standing for unstructured - provides loose implementation. It is not associated to any file extension, and must be restricted to snippet within `markdown` file.

```json
{
    "contributes": {
        "languages": [
            {
                "id": "c4",
                "extensions": [
                    ".dsl"
                ],
                "description": "C4 DSL IDE support",
                "configuration": "./language-configuration.json"
            },
            {
                "id": "c4u",
                "description": "Unstructured C4 DSL IDE support for snippet purpose",
                "extensions": [],
                "configuration": "./language-configuration.json"
            }
        ]
    }
}
```

We define a main grammar file, where we enforce a valid `.dsl` file can start with either `comment` or `workspace` keywords only. We attach this grammar to the main language `c4`.

```json
{
    "scopeName": "source.c4",
    "patterns": [
        {
            "include": "#comment"
        },
        {
            "include": "#workspace"
        }
    ],
}
```

Then we define a 2nd grammar, that complements entry points of the main grammar with new ones leveraging `source.c4#person` construct. This way, one is able to write a non-valid but colorful snippet with a single `person`. 

```json
{
    "scopeName": "source.c4u",
    "patterns": [
        {
            "include": "source.c4"
        }
        {
            "include": "source.c4#person"
        }
    ],
}
```

Finally, we use `c4u` language identifier the way we are used within _Markdown_ `.md` file.

```md
'''c4u
identifier = container "name" "description" "technology" "tags" {}
'''
```

We benefit from this usage to fuel `Hover` insights as well.

## Context

`Structurizr DSL` is a structured language. Once grammar has been crafted, it allows for tokenization & theming. Downside of enforcing language structure is that we lose the syntax highlighting for lone snippet eg within _Markdown_ `.md` file, but if we accept to noise every single line by its matching upstream structure.

This said, `TextMate` grammar files can be chained, allowing one to reuse previously created rules and avoiding duplication. By only amending entry points, we can slightly amend the grammar validity.

## Consequences

Promote `c4u` as language identifier for _Markdown_ `.md` file.

