import * as path from 'path';
import {
	Range,
	TextDocument,
	TextEditor,
	Uri,
	extensions,
	window,
	workspace
} from 'vscode';

export let doc: TextDocument;
export let editor: TextEditor;
export let documentEol: string;
export let platformEol: string;


export async function activate(docUri: Uri) {
	// The extensionId is `publisher.name` from package.json
	const ext = extensions.getExtension('archicionado.cornifer')!;
	await ext.activate();
	try {
		doc = await workspace.openTextDocument(docUri);
		editor = await window.showTextDocument(doc);
		await sleep(2000); // Wait for server activation
	} catch (e) {
		console.error(e);
	}
}

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDocPath = (p: string) => {
	return path.resolve(__dirname, '../../../testFixture', p);
};

export const getDocUri = (p: string) => {
	return Uri.file(getDocPath(p));
};

export async function setTestContent(content: string): Promise<boolean> {
	const all = new Range(
		doc.positionAt(0),
		doc.positionAt(doc.getText().length)
	);
	return editor.edit(eb => eb.replace(all, content));
}

export const getContent = (): string => {
	const editor = window.activeTextEditor as TextEditor;
	return editor.document.getText();
};