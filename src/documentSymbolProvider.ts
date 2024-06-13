import {
    CancellationToken,
    DocumentSymbol,
    ExtensionContext,
    Position,
    ProviderResult,
    Range,
    SymbolInformation,
    SymbolKind,
    TextDocument,
    languages
} from 'vscode';
import { IconManager } from './iconManager';


/*
 * Surfaces symbols to feed outline view and breadcrumbs
 */
export function setupDocumentSymbolProvider(context: ExtensionContext) {

    const keywords = [
        'workspace', 'configuration', 'model', 'person', 'enterprise', 'group',
        'softwareSystem', 'container', 'component', 'perspectives', '!ref', '!include',
        'deploymentEnvironment', 'deploymentGroup', 'deploymentNode', 'infrastructureNode',
        'softwareSystemInstance', 'containerInstance',
        'views', 'theme', 'branding', 'styles', 'properties', 'element', 'relationship',
        'systemLandscape', 'systemContext', 'filtered', 'deployment', 'dynamic'
    ];

    const provider = languages.registerDocumentSymbolProvider(['c4', 'c4u'],
        {
            provideDocumentSymbols(document: TextDocument,
                _: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {

                const defaultPos = new Position(0, 0);
                const defaultRange = new Range(defaultPos, defaultPos);

                const root = new DocumentSymbol('root', 'root', SymbolKind.File, defaultRange, defaultRange);
                const fake = new DocumentSymbol('fake', 'fake', SymbolKind.File, defaultRange, defaultRange);
                const current: DocumentSymbol[] = [root];

                for (var i = 0; i < document.lineCount; i++) {
                    var line = document.lineAt(i);

                    // Filter
                    const trimmed = line.text.trim();
                    if (!trimmed || ['#', '!docs', '!adrs', '!identifiers', '!impliedRelationships'].some(word => trimmed.startsWith(word))) {
                        continue;
                    }

                    const location = new Position(i, line.firstNonWhitespaceCharacterIndex);

                    // Close node
                    if (line.text.endsWith('}')) {
                        const symbol = current.pop();

                        if (symbol === fake) {
                            continue;
                        }

                        // Amend position to cover full range
                        symbol!.range = new Range(symbol!.range.start, new Position(i, location.character));
                        current[current.length - 1].children.push(symbol!);

                    }
                    else {

                        // Silent meaningless section
                        if (['{', 'animation {'].some(w => trimmed.startsWith(w))) {
                            current.push(fake);
                            continue;
                        }

                        const tokens = trimmed.split(' ').filter(Boolean);
                        const key = tokens[1] === '=' ? tokens[2] : tokens[0];

                        // Ensure we have keyword
                        if (!keywords.includes(key)) {
                            continue;
                        }

                        // Extract metadata
                        const { name, detail, kind, offset } = extractNameAndDetail(trimmed);

                        // Open node
                        if (line.text.endsWith('{')) {
                            const symbol = new DocumentSymbol(
                                name,
                                detail,
                                kind,
                                new Range(location, new Position(i, location.character + offset)),
                                new Range(location, new Position(i, location.character + offset)));

                            current.push(symbol);
                        }
                        else {
                            // Leaf
                            current[current.length - 1].children.push(
                                new DocumentSymbol(
                                    name,
                                    detail,
                                    kind,
                                    line.range,
                                    new Range(location, new Position(i, location.character + offset))));
                        }
                    }

                }
                return root.children;
            }
        }
    );
    context.subscriptions.push(provider);
}

function extractNameAndDetail(line: string) {

    const tokens = line.split(' ').filter(Boolean);

    if (tokens[1] === '=') {
        return { name: tokens[0], detail: tokens[2], kind: IconManager.gimmeSymbolKind(tokens[2]), offset: tokens[0].length };
    }
    else {
        const keyword = tokens[0];

        switch (keyword) {
            case 'group':
                return { name: tokens[1].split('"').join(''), detail: keyword, kind: IconManager.gimmeSymbolKind(keyword), offset: keyword.length };
            case 'systemLandscape':
                return { name: keyword, detail: '', kind: IconManager.gimmeSymbolKind(keyword), offset: keyword.length };
            case 'systemContext':
            case 'dynamic':
                return { name: tokens[1], detail: keyword, kind: IconManager.gimmeSymbolKind(keyword), offset: keyword.length };
            case 'container':
            case 'component':
                return { name: tokens[1], detail: keyword, kind: IconManager.gimmeSymbolKind(`views_${keyword}`), offset: keyword.length };
            case 'deployment':
                return { name: tokens[2], detail: keyword, kind: IconManager.gimmeSymbolKind(keyword), offset: keyword.length };
            case 'filtered':
                return { name: tokens[1].split('"').join(''), detail: keyword, kind: IconManager.gimmeSymbolKind(keyword), offset: keyword.length };
            default:
                return { name: keyword, detail: '', kind: IconManager.gimmeSymbolKind(keyword), offset: keyword.length };
        }
    }

}
