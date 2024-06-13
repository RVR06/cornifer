import * as assert from 'assert';
import * as fs from 'fs';
import {
	DocumentSymbol,
	Uri,
	commands
} from 'vscode';
import {
	activate,
	getDocUri
} from './helper';

suite('Document symbol provider', () => {

	const dsl = getDocUri('symbol.dsl');
	const json = getDocUri('symbol.json');

	const rawadata: string = fs.readFileSync(json.fsPath, 'utf-8');

	test('should surface symbols from dsl file', async () => {
		await testSymbol(dsl, JSON.parse(rawadata));
	});
});


interface IElement {
	name: string;
	kind: string;
	range: string;
	children: IElement[]
}

function symbolToElement(symbol: DocumentSymbol): IElement {
	return {
		name: symbol.name,
		kind: symbol.kind.toString(),
		range: `[${symbol.range.start.line}.${symbol.range.start.character}, ${symbol.range.end.line}.${symbol.range.end.character}]`,
		children: symbol.children.map(x => symbolToElement(x))
	};
};

async function testSymbol(
	docUri: Uri,
	expected: IElement) {

	await activate(docUri);

	let actual = await commands.executeCommand<DocumentSymbol[]>(
		'vscode.executeDocumentSymbolProvider',
		docUri,
	);

	// var json = JSON.stringify(symbolToElement(actual[0]));
	assert.deepStrictEqual(symbolToElement(actual[0]), expected);
}


