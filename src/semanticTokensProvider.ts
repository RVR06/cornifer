import {
	CancellationToken,
	ExtensionContext,
	SemanticTokens,
	SemanticTokensBuilder,
	SemanticTokensLegend,
	TextDocument,
	languages
} from "vscode";


/**
 * Complements regex-based syntax highlighting with semantic context
 */
export function setupSemanticTokensProvider(context: ExtensionContext) {
	context.subscriptions.push(languages.registerDocumentSemanticTokensProvider(
		['c4', 'c4u'],
		new DocumentSemanticTokensProvider(),
		legend));
}

const tokenTypes = new Map<string, number>();

const legend = (function () {
	const tokenTypesLegend = [
		'person',
		'softwareSystem',
		'softwareSystemInstance',
		'container',
		'containerInstance',
		'component',
		'deploymentEnvironment',
		'deploymentGroup',
		'deploymentNode',
		'infrastructureNode',
		'reference'
	];
	tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));

	return new SemanticTokensLegend(tokenTypesLegend, []);
})();

interface IInstance {
	name: string;
	type: string;
}

interface IParsedToken {
	line: number;
	offset: number;
	length: number;
	tokenType: string;
}

class DocumentSemanticTokensProvider implements DocumentSemanticTokensProvider {
	async provideDocumentSemanticTokens(
		document: TextDocument,
		_: CancellationToken): Promise<SemanticTokens> {
		const allTokens = this.parseText(document.getText());
		const builder = new SemanticTokensBuilder();
		allTokens.forEach((token) => {
			builder.push(
				token.line,
				token.offset,
				token.length,
				tokenTypes.has(token.tokenType) ? tokenTypes.get(token.tokenType)! : -1,
				0);
		});
		return builder.build();
	}

	private parseText(text: string): IParsedToken[] {
		const instances: IInstance[] = [];
		const semantics: IParsedToken[] = [];

		text.split(/\r\n|\r|\n/)
			.forEach((line, i) => {
				if (!line.match(/^ *$/)) {

					// Discard useless ones
					var lt = line.trim();
					if (['#', '!docs', '!adrs', '!identifiers', '!impliedRelationships', '!include', '}'].some(word => lt.startsWith(word))) {
						return;
					}

					// Search for !ref
					if (line.indexOf('!ref') !== -1) {
						const tokens = line.split(' ');
						instances.push({
							name: tokens[1].trim(),
							type: 'reference'
						});
						return;
					}

					// Search for assignment
					if (line.indexOf('=') !== -1) {
						const tokens = line.split('=');
						instances.push({
							name: tokens[0].trim(),
							type: tokens[1].trim().split(' ')[0]
						});
					}

					// Match word
					let offset = 0;
					var tokens = line.split(/[ ,]/);
					tokens.forEach(token => {
						if (!token.startsWith('"')) {

							token.split('.').forEach(word => {
								let match = instances.find(x => x.name === word.trim());
								if (match) {
									semantics.push({
										line: i,
										offset: offset,
										length: word.length,
										tokenType: match.type
									});
								}
								offset += word.length + 1;
							});
						}
						else {
							offset += token.length + 1;
						}
					});

					// Match hierarchical identifier
					offset = 0;
					tokens.forEach(token => {
						if (!token.startsWith('"')) {

							var trim = token.length - token.trim().length;

							// Seach for xxx.yyy and match xxx.yyy
							var matches = token.match(/(\S+)/);
							if (matches !== null) {
								var word = matches[1];
								let match = instances.find(x => x.name === word.trim());
								if (match) {
									semantics.push({
										line: i,
										offset: offset + trim,
										length: word.length,
										tokenType: match.type
									});
								}
							}

							// Seach for xxx.yyy and match xxx.yyy.zzz
							var matches = token.match(/(\S+)\.(\w+)/);
							if (matches !== null) {
								var word = matches[1];
								let match = instances.find(x => x.name === word.trim());
								if (match) {
									semantics.push({
										line: i,
										offset: offset + trim,
										length: word.length,
										tokenType: match.type
									});
								}
							}
							offset += token.length + 1;
						}
						else {
							offset += token.length + 1;
						}
					});
				}
			});
		return semantics;
	}
}
