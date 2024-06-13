import * as assert from 'assert';
import { getDocUri, activate } from './helper';
import {
	CompletionItemKind,
	CompletionList,
	Position,
	Uri,
	commands
} from 'vscode';

suite('Completion item provider', () => {
	const docUri = getDocUri('empty.dsl');

	test('should complete an empty dsl file', async () => {
		await testCompletion(docUri, new Position(0, 0), {
			items: [
				{ label: 'branding', kind: CompletionItemKind.Color },
				{ label: 'component', kind: CompletionItemKind.Field },
				{ label: 'component', kind: CompletionItemKind.Struct },
				{ label: 'container', kind: CompletionItemKind.Field },
				{ label: 'container', kind: CompletionItemKind.Struct },
				{ label: 'containerInstance', kind: CompletionItemKind.Variable },
				{ label: 'deployment', kind: CompletionItemKind.Struct },
				{ label: 'deploymentEnvironment', kind: CompletionItemKind.Class },
				{ label: 'deploymentGroup', kind: CompletionItemKind.Interface },
				{ label: 'deploymentNode', kind: CompletionItemKind.Interface },
				{ label: 'dynamic', kind: CompletionItemKind.Struct },
				{ label: 'filtered', kind: CompletionItemKind.Struct },
				{ label: 'group', kind: CompletionItemKind.Keyword },
				{ label: 'healthCheck', kind: CompletionItemKind.Event },
				{ label: 'infrastructureNode', kind: CompletionItemKind.Issue },
				{ label: 'person', kind: CompletionItemKind.Constant },
				{ label: 'properties', kind: CompletionItemKind.Color },
				{ label: 'relationship', kind: CompletionItemKind.Enum },
				{ label: 'softwareSystem', kind: CompletionItemKind.Field },
				{ label: 'softwareSystemInstance', kind: CompletionItemKind.Variable },
				{ label: 'styles', kind: CompletionItemKind.Color },
				{ label: 'systemContext', kind: CompletionItemKind.Struct },
				{ label: 'systemLandscape', kind: CompletionItemKind.Struct },
				{ label: 'theme', kind: CompletionItemKind.Color },
				{ label: 'workspace', kind: CompletionItemKind.Keyword }
			]
		});
	});
});

async function testCompletion(
	docUri: Uri,
	position: Position,
	expected: CompletionList) {
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
