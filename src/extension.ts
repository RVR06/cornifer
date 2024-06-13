import {
	ConfigurationTarget,
	ExtensionContext,
	extensions,
	window,
	workspace,
} from 'vscode';

import { setupHoverProvider } from './hoverProvider';
import { setupCompletionProvider } from './completionProvider';
import { setupPreviewProvider } from './previewProvider';
import { setupSemanticTokensProvider } from './semanticTokensProvider';
import { setupDocumentFormattingEditProvider } from './documentFormattingEditProvider';
import { setupInstancesProvider } from './instancesProvider';
import { setupDefinitionProvider } from './definitionProvider';
import { setupDocumentSymbolProvider } from './documentSymbolProvider';
import { setupTranspilerProvider } from './transpilerProvider';


/*
 * Registers extension facilities
 */
export function activate(context: ExtensionContext) {
	setupCompletionProvider(context);
	setupInstancesProvider(context);
	setupHoverProvider(context);
	setupPreviewProvider(context);
	setupSemanticTokensProvider(context);
	setupDocumentFormattingEditProvider(context);
	setupDefinitionProvider(context);
	setupDocumentSymbolProvider(context);
	setupTranspilerProvider(context);

	prompt();
}


/*
 * Deals with prompt
 */
function prompt() {
	if (!workspace.getConfiguration('cornifer').get('disablePrompt', false)) {
		const ext = extensions.getExtension('rvr06.cornifer')!;
		window.showInformationMessage(`Cornifer ${ext.packageJSON.version} activated!`, 'Don\'t Ask Again')
			.then(async result => {
				if (result === 'Don\'t Ask Again') {
					await workspace.getConfiguration('cornifer')
						.update('disablePrompt', true, ConfigurationTarget.Global);
				}
			});
	}
}


export function deactivate() { }