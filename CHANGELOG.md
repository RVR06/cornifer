# Changelog

## 1.2.2 - October 2025

### Bugs fixed

* Fix #9: broken `preview` when workspace file name is not the default one, `workspace.dsl`.

## 1.2.1 - September 2025

### Bugs fixed

* Fix GitHub Copilot extension conflict, preventing Cornifer to wake up on `.dsl` files

## 1.2.0 - September 2025

### New features

* Add nested `group` support

## 1.1.2 - April 2025

### Bugs fixed

* Fix installation section in README

## 1.1.1 - April 2025

### Bugs fixed

* Fix wrong hyperlinks in website

## 1.1.0 - April 2025

### New features

* Automate marketplace

## 1.0.0 - April 2025

### New features

* Publish to marketplace

## 0.31.3 - March 2025

### Bugs fixed

* Fix hover behavior to avoid noising extension host output

## 0.31.2 - January 2025

### Bugs fixed

* Fix missing semantic highlight for `element`

## 0.31.1 - December 2024

### Bugs fixed

* Add missing `perspectives` support for `infrastructureNode`
* Fix broken `outline` due to `custom` support within `view`
* Add missing completion for `element` & `custom` `view`
* Add missing `custom` `view` hover

## 0.31.0 - November 2024

### New features

* Add `element` support within `model` and `custom` support within `view`

## 0.30.0 - May 2024

### Bugs fixed

* Fix Quote-less `tags` for `element` & `relationship` styles
* Add missing `configuration` support
* Add `properties`, `description`, `technology` & `tags` as children elements
* Support loose `tags` syntax

## 0.29.0 - March 2024

### New features

* Add `properties` support within `view` to add `structurizr.sort` support 

### Bugs fixed

* Documentation hyperlinks are now routed to new home, `https://docs.structurizr.com/dsl/language`

## 0.28.0 - March 2024

### New features

* Because `enterprise` keyword is now deprecated, reduce its exposure while keeping existing grammar to cope with old `.dsl` workspace. 

## 0.27.1 - February 2024

### Bugs fixed

* Fix transpiler issue when `compose.yaml` is using extended `depends_on` syntax.

    ```diff
    services:
      aaa:
      depends_on:
    -   - bbb
    +   bbb:
    +     condition: service_healthy
    ```
* Fix transpiler issue when spelling word with multiple dashes or points.

    ```yaml
  services:
    xxx-yyy-zzz:
      image: xxx-yyy-zzz
    ```

* Fix transpiler issue when volume name contains dashes or points.

    ```yaml
    volumes:
      vvv-www:
    ```

## 0.27.0 - September 2023

### Doc improvements

* Housekeeping

## 0.26.1 - September 2023

### Bugs fixed

* Broken `Structurizr` preview 

## 0.26.0 - September 2023

### New features

* Introduce `DevContainer` support
* Streamline workspace (linter, import, format, ...)
* Update dependencies to fix vulnerabilities 

## 0.25.2 - September 2023

### Bugs fixed

* Multiple `deploymentGroup_identifier` semantic highlighting in `softwareSystemInstance` & `containerInstance` 

## 0.25.1 - September 2023

### Bugs fixed

* Fix transpiler issue when `compose.yaml` is missing either `volumes` section.

## 0.25.0 - September 2023

### New features

* Improve docker compose transpiler
    - Materialize `depends_on` through `relationship` 
    - Materialize `volumes` with dedicated `softwareSystem` 
    - Improve `dockerfile` support by migrating registry within `deploymentNode` description 
    - Switch to one liner syntax

## 0.24.0 - September 2023

### New features

* Introduce `disablePrompt` settings to disable prompt.
* Enforce proper default for `editor.bracketPairColorization.enabled` for `.dsl` & `.dslf` files

## 0.23.0 - September 2023

### New features

* Add missing one liner `element` syntax
    ```c4u
    person_one_liner_123 = person "person_one_liner_123" "description" "tags"
    # equivalent to
    person_one_liner_123 = person "person_one_liner_123" "description" "tags" {
    }
    ```
* Add missing short form `element` syntax
    ```c4u
    person_one_liner_123 = person "person_one_liner_123" "" ""
    person_one_liner_12 = person "person_one_liner_12" ""
    person_one_liner_1 = person "person_one_liner_1"
    ```
    
### Bugs fixed

* Multiple `deploymentGroup_identifier` semantic highlighting in `softwareSystemInstance` & `containerInstance` 
    ```c4u
    deploymentGroup_ = deploymentGroup "deploymentGroup"
    deploymentGroup2_ = deploymentGroup "deploymentGroup2"
    
    deploymentNode = deploymentNode "deploymentNode" "description" "technology" "tags" 1 {
        containerInstance softwareSystem.container deploymentGroup_,deploymentGroup2_ "tags"
    ```
 * Fix `softwareSystem_identifier` & `container_identifier` semantic highlighting in `softwareSystemInstance` & `containerInstance`    
    ```c4u
    deploymentNode = deploymentNode "deploymentNode" "description" "technology" "tags" 1 {
        containerInstance softwareSystem.container "" "tags"
    ```

## 0.22.0 - February 2023

### New features

* Add `infrastructureNode` one-liner support
* Fix semantic identification for `relationship` (first identifier not found)

## 0.21.0 - February 2023

### New features

* Introduce docker compose transpiler

## 0.20.0 - January 2023

### New features

* Introduce `extends` keyword support

### Bugs fixed

* Fix semantic identification for hierarchical reference like `!ref aaa.bbb`
* Fix go to definition for hierarchical reference like `!ref aaa.bbb`

## 0.19.1 - January 2023

### Bugs fixed

- Add missing configuration defaults for `.dslf`

## 0.19.0 - January 2023

### New features

* Introduce `!ref` keyword support (symbol, hover, semantic token, go to definition)
* Improve `!include` keyword support (symbol, hover, semantic token, go to definition)

## 0.18.0 - January 2023

### New features

* Introduce `.dsl` fragment, aka `.dslf` file, support.  
Use `.dslf` to declare `Structurizr` fragments for reuse, and compose them in `workspace.dsl` via the `!include` keyword. All features but `preview` one are available within `.dslf` as well. 

## 0.17.1 - January 2023

### Bugs fixed

* Reduce artifact size
* Clean up CI/CD
* Bump dependencies version

## 0.17.0 - January 2023

### New features

* Improve `styles` & `branding` support 

## 0.16.0 - January 2023

### New features

* Introduce settings to specify `Structurizr/Lite` [docker image tag](https://hub.docker.com/r/structurizr/lite/tags) to use for preview, default to `latest`.

## 0.15.0 - January 2023

### New features

* Improve `relationship` support, including implicit and scoped:
    ```diff
    system1 = softwareSystem "" "" "" {
        container1 = container "" "" "" "" {
            component1 = component "" "" "" "" {
            }
            component2 = component "" "" "" "" {
    +           -> component1 "description" "technology" "tags"
            }
        }
        container2 = container "" "" "" "" {
    +       -> container2 "description" "technology" "tags"
        }
        
    +   container1 -> container2 "description" "technology" "tags"
    }
    ```

## 0.14.1 - June 2022

### Bugs fixed

* Fix `deploymentNode` regex for 2+ digits `#instances`

## 0.14.0 - May 2022

### New features

* Support for light themes with more readable colors.

## 0.13.2 - May 2022

### Bugs fixed 

* Fix broken `outline` due to space issue.
* Fix dependency reported vulnerability issue

## 0.13.1 - April 2022

### Bugs fixed 

* Fix `systemLandscape` & `systemContext` case issues, preventing `outline` to work properly

## 0.13.0 - April 2022

### New features 

* Add examples for keyword within `hover`

### Bugs fixed

* Fix broken `outline` due to case issue. Keywords are **case-sensitive**.
* Fix grammar typos

## 0.12.0 - April 2022

### Bugs fixed

* Fix broken features gif in `README.md`

## 0.12.0 - April 2022

### New features

* Enrich grammar with `styles`, including `element` & `relationship`

### Bugs fixed

* Fix `outline` view when `views` section contains `styles` 
* Fix `intellisense` for children in `group`

## 0.11.2 - March 2022

### Bugs fixed

* Housekeeping

## 0.11.1 - March 2022

### Bugs fixed

* Fix broken `breadcrumb`

## 0.11.0 - March 2022

### New features

* Surface `symbols` to feed `Outline` view

## 0.10.1 - March 2022

### Bugs fixed

* Fix `IntelliSense` conflict on the right part of `->` relationship
* Fix icon for `IntelliSense` identifiers

## 0.10.0 - March 2022

### New features

* Improve `IntelliSense` (contextual `Ctrl+Space` and `.` triggers)
* Add `GoToDefinition` (`F12` on identifiers)
* Enrich snippet with detail view, eg:
    ```
    identifier =
        softwareSystem
        "name"
        "description"
        "tags" {}
    ```

## 0.9.0 - March 2022

### New features

* Enrich grammar with `group`

## 0.8.0 - March 2022

### New features

* Enrich grammar with `branding` & `logo`

## 0.7.3 - March 2022

### Bugs fixed

* Missing default for `healthCheck` snippet

## 0.7.2 - March 2022

### Bugs fixed

* `Preview` fails when mounting workspace, where path contains spaces

## 0.7.1 - March 2022

### Bugs fixed

* Provide good default for `deploymentGroup_identifier` in `softwareSystemInstance` & `containerInstance` snippet
* Provide good default for `#instances` in `deploymentNode` snippet

## 0.7.0 - March 2022

### New features

* Add `theme` keyword support

## 0.6.3 - March 2022

### Bugs fixed

* Fix format engine conflicting with comment

## 0.6.2 - March 2022

### Bugs fixed

* Apply comment style to the whole line, instead of leading `#` only
* Change `section` color to be light theme friendly
* Ensure we can comment everywhere 

## 0.6.1 - March 2022

### Bugs fixed

* Allow `person` within `enterprise`

## 0.6.0 - February 2022

### New features

* Treeview icons

## 0.5.3 - February 2022

### Bugs fixed

* Light theme icon conflict
* Outdated documentation
* Runtime status warning (`'configuration.semanticTokenType.description' must be defined and can not be empty`)

## 0.5.2 - February 2022

### Bugs fixed

* Handle 0..* deployment groups reference

## 0.5.1 - February 2022

### Bugs fixed

* Curly braces policy

## 0.5.0 - February 2022

### New features

* Semantic highlighting

### Bugs fixed

* Person relationship regex
    ```c4u
    # Person is colorized as software system instead of person
    person -> container "description" "technology" "tags"
    ```
* Lagging relationship regex
    ```c4u
    # Lagging
    identifier -> ident|

    # Working
    # Starts from relationship snippet
    from_identifier -> to_identifier "description" "technology" "tags"
    ```

## 0.4.1 - February 2022

### Bugs fixed

* Structurizr engine issue
    ```c4u
    # Failing
    identifier = container "name" "description" "technology" "tags" {}
    identifier = container "name" "description" "technology" "tags" { }

    # Working
    identifier = container "name" "description" "technology" "tags" { 
    }
    ```

## 0.4.0 - February 2022

### New features

* Format document (`Shift`+`Alt`+`F`)

## 0.3.1 - January 2022

### Bugs fixed

* `README` animation

## 0.3.0 - January 2022

### New features

* Improve `deployment` relative grammar

## 0.2.0 - January 2022

### New features

* `dynamic` grammar, completion & hover
* `serial` pipe grammar
* `parallel` pipe grammar
* `filtered` grammar, completion & hover
* `animation` grammar
* `perspectives` grammar
* `!` grammar

## 0.1.0 - January 2022

### New features

+ Structurizr Lite Preview

## 0.0.1 - January 2022

### New features

+ Code completion
+ Syntax highlighting
+ Hover