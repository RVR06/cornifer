import {
    CancellationToken,
    Definition,
    DefinitionLink,
    ExtensionContext,
    Location,
    Position,
    ProviderResult,
    TextDocument,
    Uri,
    languages
} from 'vscode';
import * as path from 'path';


/*
 * Identifies assignments to support Go To Definition (F12) command
 */
export function setupDefinitionProvider(context: ExtensionContext) {

    context.subscriptions.push(
        languages.registerDefinitionProvider(['c4', 'c4u'],
            {
                provideDefinition(document: TextDocument,
                    position: Position,
                    _: CancellationToken):
                    ProviderResult<Definition | DefinitionLink[]> {

                    const elements: IElement[] = [];

                    document.getText().split(/\r\n|\r|\n/)
                        .forEach((line, i) => {
                            if (!line.match(/^ *$/)) {

                                // Search for assignment
                                if (line.indexOf('=') !== -1) {
                                    const tokens = line.split('=');

                                    elements.push({
                                        name: tokens[0].trim(),
                                        position: new Position(i, document.lineAt(i).firstNonWhitespaceCharacterIndex),
                                        uri: document.uri
                                    });
                                }

                                // Search for !ref
                                if (line.indexOf('!ref') !== -1) {
                                    const tokens = line.split(' ');

                                    elements.push({
                                        name: tokens[1].trim(),
                                        position: new Position(i, document.lineAt(i).firstNonWhitespaceCharacterIndex + 5), // 5 == !ref shift
                                        uri: document.uri
                                    });
                                }

                                // Search for !include
                                if (line.indexOf('!include') !== -1) {
                                    const tokens = line.split(' ');

                                    var file = tokens[1];
                                    elements.push({
                                        name: file.trim(),
                                        position: new Position(0, 0),
                                        uri: Uri.file(path.join(path.dirname(document.uri.path), file))
                                    });
                                }

                                // Search for extends
                                if (line.indexOf('extends') !== -1) {
                                    const tokens = line.split(' ');

                                    var file = tokens[2];
                                    elements.push({
                                        name: file.trim(),
                                        position: new Position(0, 0),
                                        uri: Uri.file(path.join(path.dirname(document.uri.path), file))
                                    });
                                }
                            }
                        });

                    // Try word first
                    var word = document.getText(document.getWordRangeAtPosition(position));
                    var match = elements.find(x => x.name === word);

                    if (match) {
                        return new Location(match.uri, match.position);
                    }

                    // Try extended word, ie all between leading & trailing spaces
                    word = document.getText(document.getWordRangeAtPosition(position, /\S+/));
                    match = elements.find(x => x.name === word);

                    if (match) {
                        return new Location(match.uri, match.position);
                    }

                    // Try prefix, ie all before last dot
                    var matches = word.match(/(\S+)\.(\w+)/);
                    if (matches !== null) {
                        word = matches[1];
                        match = elements.find(x => x.name === word);

                        return match
                            ? new Location(match.uri, match.position)
                            : undefined;
                    }
                }
            }
        )
    );
}

interface IElement {
    name: string;
    position: Position;
    uri: Uri
}

