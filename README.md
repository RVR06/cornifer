# C4 DSL Visual Studio Code Extension

![](https://img.shields.io/badge/last_updated-may_2024-0c7cba)
![](https://img.shields.io/badge/vsix-v0.30.0-ef8d22)

![](https://img.shields.io/badge/publisher-rvr06-fcc438)
![](https://img.shields.io/badge/chat-on_github_issue-19967d)
![](https://img.shields.io/badge/contributions-welcome-834187)

![](https://img.shields.io/badge/build-passing-7ab648)
![](https://img.shields.io/badge/features-8-de5f85)
![](https://img.shields.io/badge/known_issues-0-c92d39)

Whether you are a seasoned [C4 DSL](https://docs.structurizr.com/dsl/language) author or plan to start your **architecture as code** journey, `Cornifer` extension will support you along the way. Coupled with [Structurizr](https://structurizr.com/) engine, it provides a top-notch architecture stack. Give it a try and start contributing to the code-first architecture community.

## Installation

Navigate to the [latest release](https://github.com/rvr06/cornifer/releases/latest) and download the `.vsix` file. 

Then, within VSCode, open the `Extensions` view, select for `Install from VSIX` from `Views and more actions` button and browse to the `.vsix`.

To automate the installation of the extension in a devcontainer, follow these steps:

1. Place the `.vsix` file in the repository under the `.devcontainer` directory, for example, `.devcontainer/extensions/cornifer-<version>.vsix`.

2. Make the extension available to the devcontainer by adding it as a volume, e.g. in case you use compose add the extention folder als volume in the `docker-compose.yml`:

```yaml
version: '3'

services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile

    volumes:
      # Update this to wherever you want VS Code to mount the folder of your project
      - ../..:/workspaces:cached
      # Unpublished extensions
      - ./extensions:/extensions
```

3. Finally, install the extension in the devcontainer.json:

```json
"customizations": {
    "vscode": {    
        "extensions": [
            "/extensions/cornifer-<version>.vsix"
        ]
    }
}
```

> **Note:** An error may be displayed in the editor indicating that the format for defining the extension is not supported. This is a bug; the format is supported and this will install an extension from the container's filesystem.


## Overview of the extension features

### Format document

<img 
    alt="format"
    src="https://rvr06.github.io/cornifer/docs/features/format/format.gif" />

### Syntax highlighting

<img 
    alt="highlighting"
    src="https://rvr06.github.io/cornifer/docs/features/highlighting/highlighting.gif" />

### Semantic highlighting

<img 
    alt="semantic"
    src="https://rvr06.github.io/cornifer/docs/features/semantic/semantic.gif" />

### Code completion

<img 
    alt="completion"
    src="https://rvr06.github.io/cornifer/docs/features/intellisense/intellisense.gif" />

### Hover

<img 
    alt="hover"
    src="https://rvr06.github.io/cornifer/docs/features/hover/hover.png" />

### Live preview

<img 
    alt="preview"
    src="https://rvr06.github.io/cornifer/docs/features/preview/preview.png" />

### Outline preview

![outline](https://rvr06.github.io/cornifer/docs/features/breadcrumb/breadcrumb.png)

### Docker compose transpiler

![transpiler](https://rvr06.github.io/cornifer/docs/features/transpiler/transpiler.png)
