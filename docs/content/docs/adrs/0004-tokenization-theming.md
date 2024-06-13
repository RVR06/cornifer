---
title: Tokenization & Theming
status: accepted
weight: 4
authors: rvr06
date: 2022-01-05
layout: adr
---

## Decision

Mapping with existing concept of `namespace` & `class` can be confusing. Instead we decide to introduce brand-new taxonomy like `keyword.person`, `entity.name.person` & `constant.numeric.instances`.  

Tokenization lies within grammar file, where we leverage `regex` expression to match line content. Once done, we tag meaningful pieces accordingly.

```json
{
    "person": {
        "name": "meta.person",
        "match": "(?i)(\\s*)(.*?)(\\s*=\\s*)(person)(\\s+)\"(.*?)\"(\\s+)\"(.*?)\"(\\s+)\"(.*?)\"",
        "captures": {
            "2": {
                "name": "entity.name.person"
            },
            "4": {
                "name": "keyword.person"
            },
            "6": {
                "name": "string.name"
            },
            "8": {
                "name": "string.description"
            },
            "10": {
                "name": "string.tag"
            }
        }
    },
}
```

We also provide a semantic color mapping, to enforce coherency between authoring & publishing part.

```json
{
    "contributes": {
        "configurationDefaults": {
            "editor.tokenColorCustomizations": {
                "textMateRules": [
                    {
                        "scope": [
                            "keyword.person"
                        ],
                        "settings": {
                            "foreground": "#834187",
                            "fontStyle": "bold"
                        }
                    }
                ]
            }
        }
    }
}
```

## Context

Syntax colorization is a must-have to efficiently write C4 models. It is a [2 stages](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide) approach.   


## Consequences

It seems difficult to enforce synchronization between `Cornifer` colormap & `structurizr` theme. 
See if and how we could expose color map to end-user to allow theming amendment.
