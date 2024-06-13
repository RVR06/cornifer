# Comment
workspace "Cornifer" "C4 unleashed. Period." {
	!identifiers hierarchical
	!impliedRelationships false
	
	model {
		
		adam = person "Architect" "Crafts architecture as code." ""
		
		group "DAEDALUS" {
			cornifer = softwareSystem "Cornifer" "C4 unleashed. Period." "" {
				extension = container "Cornifer" "Provides syntax highlighting, snippets, hover & more." "VS Code Extension" "#pkg" {
					grammar = component "Grammar" "Handles tokenization & theming" "TextMate|JSON" "" {
						url https://github.com/rvr06/cornifer/blob/main/syntaxes/c4.tmLanguage.json
						url https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
					}
					snippets = component "Snippets" "Provides templated snippets." "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/completionProvider.ts
						url https://code.visualstudio.com/api/references/vscode-api#languages.registerCompletionItemProvider
					}
					hover = component "Hover" "Provides contextual hover over dsl keywords" "ts|markdown" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/hoverProvider.ts
						url https://code.visualstudio.com/api/references/vscode-api#languages.registerHoverProvider
					}
					preview = component "Preview" "Leverages Structurizr engine to provide model views." "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/previewProvider.ts
					}
					format = component "Formatter" "Provides formatting capability, activated on-demand and on-save." "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/documentFormattingEditProvider.ts
					}
					syntax = component "Syntax highlighting" "Provides comprehensive C4 DSL syntax support." "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/instancesProvider.ts
						url https://github.com/rvr06/cornifer/blob/main/src/definitionProvider.ts
					}
					semantic = component "Semantic highlighting" "Parses the C4 DSL to gather relevant information such as instance assignment." "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/semanticTokensProvider.ts
					}
					symbol = component "Symbols" "Sketches outline & breadcrumbs" "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/documentSymbolProvider.ts
					}
					transpiler = component "Transpiler" "Transpiles docker compose yaml into matching dsl." "ts" "" {
						url https://github.com/rvr06/cornifer/blob/main/src/transpilerProvider.ts
					}
					
					syntax -> grammar "Leverages" "tokenization & theming" ""
					semantic -> grammar "Leverages" "theming" ""
					hover -> grammar "Leverages" "tokenization & theming" ""
				}
			}
		}
		
		structurizr = softwareSystem "Structurizr" "Diagrams as code 2.0." "#external" {
			url https://www.structurizr.com
		}
		
		vscode = softwareSystem "VS Code" "Code editing.Redefined." "#external" {
			url https://code.visualstudio.com
		}
		
		#region Relationships
		
		adam -> vscode "Uses" "" ""
		vscode -> cornifer "Leverages" "C4 support" ""
		cornifer -> structurizr "Fuels" "workspace & theme" ""
		
		vscode -> cornifer.extension "Leverages" "C4 support" ""
		cornifer.extension -> structurizr "Fuels" "workspace & theme" ""
		
		cornifer.extension.preview -> structurizr "Fuels" "workspace & theme" ""
		
		#endregion
		
		win_ = deploymentEnvironment "Windows" {
			deploymentNode "User workstation" "" "Microsoft Windows 10" "#windows" 1 {
				vscode_ = softwareSystemInstance vscode
				
				extension_ = containerInstance cornifer.extension
				
				deploymentNode "structurizr/lite:latest" "" "Docker" "#docker" 1 {
					structurizr_ = softwareSystemInstance structurizr
				}
			}
		}
		
		wsl_ = deploymentEnvironment "WSL" {
			deploymentNode "User workstation" "" "Microsoft Windows 10" "#windows" 1 {
				deploymentNode "WSL" "" "WSL2 - Ubuntu" "#linux" 1 {
					url https://docs.microsoft.com/en-us/windows/wsl/
					vscode_ = softwareSystemInstance vscode
					
					extension_ = containerInstance cornifer.extension
					
					deploymentNode "structurizr/lite:latest" "" "Docker" "#docker" 1 {
						structurizr_ = softwareSystemInstance structurizr
					}
				}
			}
		}
		
	}
	
	views {
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/semantic-alt/theme.json
		theme https://raw.githubusercontent.com/rvr06/cornifer-contrib/main/themes/heraldry/theme.json
		
		systemlandscape "C4-L" {
			include *
		}
		
		systemcontext cornifer "C4-1" {
			include *
		}
		
		container cornifer "C4-2" {
			include *
		}
		
		component cornifer.extension "C4-3" {
			include *
		}
		
		deployment * win_ "Windows" {
			include *
		}
		
		deployment * wsl_ "WSL" {
			include *
		}
	}
}

