import {
	CompletionItem,
	ExtensionContext,
	Position,
	TextDocument,
	languages
} from 'vscode';
import { IconManager } from './iconManager';


/*
 * Provides Intellisense
 */
export function setupInstancesProvider(context: ExtensionContext) {

	const providerRoot = languages.registerCompletionItemProvider(['c4', 'c4u'],
		{
			provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {

				// Deactivation.
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				const lastDot = linePrefix.lastIndexOf('.');
				const lastArrow = linePrefix.lastIndexOf('->');

				// aaa.bb -> ccc.
				if (lastArrow !== -1) {
					if (lastDot > lastArrow) {
						return [];
					}
				}
				else {
					// aaa.b
					if (lastDot !== -1) {
						return [];
					}
				}

				const elements: IElement[] = parse(document);

				// Search for all elements that start with
				const word = document.getText(document.getWordRangeAtPosition(position));
				const matches = elements.filter(x => x.name.startsWith(word));

				return matches.map(e => {
					var item = new CompletionItem(e.name, IconManager.gimmeCompletionItemKind(e.type));
					item.detail = e.type;
					return item;
				});
			}
		}
	);

	const providerChildren = languages.registerCompletionItemProvider(['c4', 'c4u'],
		{
			provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {

				// Deactivation. Ensure at least a '.' prefix
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				const firstDot = linePrefix.indexOf('.');
				const lastDot = linePrefix.lastIndexOf('.');
				const lastArrow = linePrefix.lastIndexOf('->');

				// aaa.bb -> ccc
				if (lastArrow !== -1) {
					if (lastDot < lastArrow) {
						return [];
					}
				}
				else {
					// aaa
					if (firstDot === -1) {
						return [];
					}
				}

				const elements: IElement[] = parse(document);

				// Search for all elements whose scope is the one before '.'
				const word = document.getText(document.getWordRangeAtPosition(new Position(position.line, lastDot - 1)));
				const matches = elements.filter(x => x.scope === word);

				return matches.map(e => {
					var item = new CompletionItem(e.name, IconManager.gimmeCompletionItemKind(e.type));
					item.detail = e.type;
					return item;
				});
			}
		},
		'.'
	);

	context.subscriptions.push(providerRoot, providerChildren);
}

interface IElement {
	name: string;
	type: string;
	scope: string | undefined
}

function parse(document: TextDocument): IElement[] {

	const elements: IElement[] = [];
	const scope: (string | undefined)[] = [undefined];

	document.getText().split(/\r\n|\r|\n/)
		.forEach((line, _) => {
			if (!line.match(/^ *$/)) {

				// Discard useless ones
				var lt = line.trim();
				if (['#', '!'].some(word => lt.startsWith(word))) {
					return;
				}

				if (lt.startsWith('}')) {
					scope.pop();
				}

				// Search for assignment
				if (lt.indexOf('=') !== -1) {
					const tokens = lt.split('=');

					var element = {
						name: tokens[0].trim(),
						type: tokens[1].trim().split(' ')[0],
						scope: scope[scope.length - 1]
					};

					elements.push(element);

					if (lt.endsWith('{')) {
						scope.push(element.name);
					}
				}
				else if (lt.endsWith('{')) {
					scope.push(lt.startsWith('group "')
						? scope[scope.length - 1]
						: undefined);
				}
			}
		});

	return elements;
};