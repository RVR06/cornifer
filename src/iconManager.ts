/* eslint-disable @typescript-eslint/naming-convention */

import {
    CompletionItemKind,
    SymbolKind
} from "vscode";


/*
 * Maps dsl elements to icons
 */
export class IconManager {

    static map: any;
    static symbolKinds: any;

    static gimmeCompletionItemKind(keyword: string): CompletionItemKind {
        return IconManager.map[keyword];
    }
    static gimmeSymbolKind(keyword: string): SymbolKind {
        return IconManager.symbolKinds[keyword];
    }

    static {
        IconManager.map = {
            'workspace': CompletionItemKind.Keyword,
            'group': CompletionItemKind.Keyword,
            'person': CompletionItemKind.Constant,
            'softwareSystem': CompletionItemKind.Field,
            'container': CompletionItemKind.Field,
            'component': CompletionItemKind.Field,
            'relationship': CompletionItemKind.Enum,
            '!ref': CompletionItemKind.Function,
            '!include': CompletionItemKind.Function,
            'deploymentEnvironment': CompletionItemKind.Class,
            'deploymentGroup': CompletionItemKind.Interface,
            'deploymentNode': CompletionItemKind.Interface,
            'infrastructureNode': CompletionItemKind.Issue,
            'softwareSystemInstance': CompletionItemKind.Variable,
            'containerInstance': CompletionItemKind.Variable,
            'healthCheck': CompletionItemKind.Event,
            'view': CompletionItemKind.Struct,
            'theme': CompletionItemKind.Color,
            'styles': CompletionItemKind.Color,
            'properties': CompletionItemKind.Color,
            'configuration': CompletionItemKind.Color,
            'element': SymbolKind.Field,
            'branding': CompletionItemKind.Color
        };

        IconManager.symbolKinds = {
            'workspace': SymbolKind.Module,
            'group': SymbolKind.Module,
            'model': SymbolKind.Module,
            'enterprise': SymbolKind.Module,
            'perspectives': SymbolKind.Null,
            'person': SymbolKind.Constant,
            'softwareSystem': SymbolKind.Field,
            'container': SymbolKind.Field,
            'component': SymbolKind.Field,
            'relationship': SymbolKind.Enum,
            '!ref': SymbolKind.Function,
            '!include': SymbolKind.Function,

            'deploymentEnvironment': SymbolKind.Class,
            'deploymentGroup': SymbolKind.Array,
            'deploymentNode': SymbolKind.Interface,
            'infrastructureNode': SymbolKind.Number,
            'softwareSystemInstance': SymbolKind.Variable,
            'containerInstance': SymbolKind.Variable,
            'healthCheck': SymbolKind.Event,

            'views': SymbolKind.Module,
            'systemLandscape': SymbolKind.Struct,
            'systemContext': SymbolKind.Struct,
            'views_container': SymbolKind.Struct,
            'views_component': SymbolKind.Struct,
            'deployment': SymbolKind.Struct,
            'dynamic': SymbolKind.Struct,
            'filtered': SymbolKind.Struct,
            'custom': SymbolKind.Struct,
            'theme': SymbolKind.TypeParameter,
            'styles': SymbolKind.TypeParameter,
            'properties': SymbolKind.TypeParameter,
            'configuration': SymbolKind.TypeParameter,
            'element': SymbolKind.Field,
            'branding': SymbolKind.TypeParameter,
        };
    }
}