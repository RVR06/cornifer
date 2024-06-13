import * as cp from 'child_process';
import * as path from 'path';
import * as portfinder from 'portfinder';
import {
	ExtensionContext,
	Uri,
	commands,
	env,
	window,
	workspace
} from 'vscode';

/*
 * Provides dsl preview leveraging containerized Structurizr
 */
export function setupPreviewProvider(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('cornifer.preview', async () => {

			if (!hasDocker()) {
				console.error('Preview Structurizr requires Docker to be installed');
				return;
			}

			const activeEditor = window.activeTextEditor;
			if (!activeEditor) {
				return;
			}

			let tag = workspace.getConfiguration('cornifer').structurizrLiteTag;
			let ws = path.dirname(activeEditor.document.uri.fsPath);
			let workspaceName = ws.split(path.sep).pop();

			let containerName = createRandomString();

			portfinder.getPort(function (_: any, port: any) {
				console.log(`Starting ${workspaceName} Structurizr Preview...`);

				cp.exec(`docker run -p 127.0.0.1:${port}:8080 --name ${containerName} -v "${ws}:/usr/local/structurizr" structurizr/lite:${tag}`,
					function (_, stdout, __) {
						console.log(stdout);
					});

				env.openExternal(Uri.parse(`http://localhost:${port}/workspace/diagrams`));
			});

			workspace.onDidCloseTextDocument(e => {
				if (activeEditor.document === e) {
					console.log(`Stopping ${workspaceName} Structurizr Preview ...`);
					cp.execSync(`docker rm -f ${containerName}`, { stdio: 'ignore' });
				}
			});
		}
		));
}

function hasDocker() {
	try {
		cp.execSync('docker --version', { stdio: 'ignore' });
		return true;
	} catch (e) {
		return false;
	}
}

function createRandomString() {
	var text = "cornifer_";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}