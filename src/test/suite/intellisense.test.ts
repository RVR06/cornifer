import * as assert from 'assert';
import { getDocUri, activate } from './helper';
import {
	CompletionItemKind,
	CompletionList,
	Position,
	Uri,
	commands
} from 'vscode';

suite('Completion item provider (intellisense)', () => {
	const docUri = getDocUri('intellisense.dsl');

	test('Should find all children from a parent', async () => {
		await testIntellisense(docUri, new Position(12, 5), {
			items: [
				{ label: 'c1', kind: CompletionItemKind.Field },
				{ label: 'c2', kind: CompletionItemKind.Field }
			]
		});
	});
});

async function testIntellisense(
	docUri: Uri,
	position: Position,
	expected: CompletionList
) {
	await activate(docUri);

	const actual = await commands.executeCommand<CompletionList>(
		'vscode.executeCompletionItemProvider',
		docUri,
		position
	);

	assert.strictEqual(actual.items.length, expected.items.length);

	expected.items.forEach((e, i) => {
		const actualItem = actual.items[i];
		assert.strictEqual(actualItem.label, e.label);
		assert.strictEqual(actualItem.kind, e.kind);
	});
}
