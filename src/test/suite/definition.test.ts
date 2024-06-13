import * as assert from 'assert';
import * as path from 'path';
import {
	Location,
	Position,
	Uri,
	commands
} from 'vscode';

import { getDocUri, activate } from './helper';

suite('Definition provider', () => {
	const docUri = getDocUri('definition.dsl');

	// TAB counts as 1

	test('should find a person reference', async () => {
		await match(docUri,
			new Position(12, 5), // [per|son] 
			new Location(docUri, new Position(5, 2)));
	});

	test('should find a software system reference', async () => {
		await match(docUri,
			new Position(12, 15), // [sys|tem]
			new Location(docUri, new Position(7, 3)));
	});

	test('should find a !ref reference', async () => {
		await match(docUri,
			new Position(19, 13), // [o|bs] 
			new Location(docUri, new Position(15, 7)));
	});

	test('should find a complex !ref reference', async () => {
		await match(docUri,
			new Position(25, 17), // [aaa.b|bb.ccc] 
			new Location(docUri, new Position(21, 7)));
	});

	test('should find a !include file', async () => {
		await match(docUri,
			new Position(29, 15), // [frag|ment.views.dslf] 
			new Location(
				Uri.file(path.join(path.dirname(docUri.path), 'fragment.views.dslf')),
				new Position(0, 0)));
	});

	test('should not find an invalid keyword', async () => {
		await nomatch(docUri,
			new Position(7, 15));
	});

	test('should not find an unknown identifier', async () => {
		await nomatch(docUri,
			new Position(13, 15));
	});
});

async function match(
	docUri: Uri,
	position: Position,
	expected: Location) {
	await activate(docUri);

	const actual = await commands.executeCommand<Location[]>(
		'vscode.executeDefinitionProvider',
		docUri,
		position
	);

	assert.deepStrictEqual(actual[0].uri.path, expected.uri.path);
	assert.deepStrictEqual(actual[0].range, expected.range);
}

async function nomatch(
	docUri: Uri,
	position: Position) {
	await activate(docUri);

	const actual = await commands.executeCommand<Location[]>(
		'vscode.executeDefinitionProvider',
		docUri,
		position
	);

	assert.strictEqual(actual.length, 0);
}
