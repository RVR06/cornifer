import {
    CancellationToken,
    DocumentFormattingEditProvider,
    ExtensionContext,
    FormattingOptions,
    languages,
    ProviderResult,
    TextDocument,
    TextEdit
} from 'vscode';


/*
 * Provides smart formatting
 */
export function setupDocumentFormattingEditProvider(context: ExtensionContext) {
    context.subscriptions.push(
        languages.registerDocumentFormattingEditProvider(
            ['c4', 'c4u'],
            new DocumentFormatter()));
}


class DocumentFormatter implements DocumentFormattingEditProvider {

    tabTypes = new Map<number, string>();

    constructor() {
        let tabs = "";
        Array.from({ length: 20 },
            (_, i) => {
                this.tabTypes.set(i, tabs);
                tabs += '\t';
            });
    }

    public provideDocumentFormattingEdits(
        document: TextDocument,
        _: FormattingOptions,
        __: CancellationToken): ProviderResult<TextEdit[]> {

        var counter = 0;

        const patches: TextEdit[] = [];
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);

            var raw = line.text.trim();

            // Fix 'empty curly braces' structurizr engine issue
            raw = raw.replace(/{( |\t)*}$/, '').trimEnd();

            if (raw.startsWith('}')
                || (raw.startsWith('#') && raw.endsWith('}'))) {
                counter--;
            }

            raw = `${this.tabTypes.get(counter)}${raw}`;

            if (raw.endsWith('{')) {
                counter++;
            }

            patches.push(TextEdit.replace(line.range, raw));
        }

        return patches;
    }
}