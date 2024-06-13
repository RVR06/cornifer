import * as fs from 'fs';
import * as assert from 'assert';
import {
	TextEdit,
	Uri,
	WorkspaceEdit,
	commands,
	workspace
} from 'vscode';

import {
	getContent,
	getDocUri,
	activate
} from './helper';

suite('Format document provider', () => {
	const before = getDocUri(`format/before.dsl`);
	const after = getDocUri(`format/after.dsl`);

	let expected = fs.readFileSync(after.fsPath, 'utf8');

	test(`should format file`, async () => {
		await testFormat(before, expected);
	});
});

async function testFormat(
	before: Uri,
	expected: string) {

	await activate(before);

	await commands.executeCommand<TextEdit[] | undefined>('vscode.executeFormatDocumentProvider', before)
		.then(async edits => {
			if (edits) {
				const we = new WorkspaceEdit();
				for (const edit of edits) {
					we.replace(before, edit.range, edit.newText);
				}
				await workspace.applyEdit(we);
			}
		});

	assert.strictEqual(getContent(), expected);
}