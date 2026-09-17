import * as cp from 'child_process';
import * as http from 'http';
import * as path from 'path';
import * as portfinder from 'portfinder';
import {
	CancellationToken,
	CancellationTokenSource,
	ExtensionContext,
	Progress,
	ProgressLocation,
	commands,
	window,
	workspace
} from 'vscode';

/*
 * Provides dsl preview leveraging containerized Structurizr
 */
export function setupPreviewProvider(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('cornifer.preview', async () => {

						let runtime = getContainerRuntime();
			if (!hasContainerRuntime(runtime)) {
				console.error('Preview Structurizr requires a container runtime to be installed');
				return;
			}

			const activeEditor = window.activeTextEditor;
			if (!activeEditor) {
				return;
			}

			let img = workspace.getConfiguration('cornifer').structurizrImage;
			let tag = workspace.getConfiguration('cornifer').structurizrTag;
			let cmd = workspace.getConfiguration('cornifer').structurizrCmd;
			let autoRefresh = workspace.getConfiguration('cornifer').structurizrAutoRefreshInterval;
			const imageName = `${img}:${tag}`;

			if (!hasContainerImage(runtime, imageName)) {
				const choice = await window.showWarningMessage(
					`${runtime} image ${imageName} is not available locally and will be downloaded. This may take a while. Continue?`,
					'Continue',
					'Cancel'
				);

				if (choice !== 'Continue') {
					return;
				}

				const pulled = await pullContainerImage(runtime, imageName);
				if (!pulled) {
					window.showErrorMessage(`Failed to pull ${runtime} image ${imageName}.`);
					return;
				}
			}

			let ws = path.dirname(activeEditor.document.uri.fsPath);
			let workspaceName = ws.split(path.sep).pop();
			let workspaceFile = activeEditor.document.uri.fsPath;

			let containerName = createRandomString();
			const port = await getAvailablePort();

			console.log(`Starting ${workspaceName} Structurizr Preview...`);

			cp.exec(`${runtime} run -p ${port}:8080 --name ${containerName} -v "${ws}:/usr/local/structurizr" -v "${workspaceFile}:/usr/local/structurizr/workspace.dsl" -e STRUCTURIZR_AUTOREFRESHINTERVAL=${autoRefresh} ${img}:${tag} ${cmd}`,
				function (_, stdout, __) {
					console.log(stdout);
				});

			const previewUrl = !cmd ? `http://localhost:${port}/workspace/diagrams` : `http://localhost:${port}/workspace/1/diagrams`;
			const cts = new CancellationTokenSource();
			void waitAndOpenPreview(previewUrl, cts.token);

			workspace.onDidCloseTextDocument(e => {
				if (activeEditor.document === e) {
					console.log(`Stopping ${workspaceName} Structurizr Preview ...`);
					cts.cancel();
					cts.dispose();
					cp.execSync(`${runtime} rm -f ${containerName}`, { stdio: 'ignore' });
				}
			});
		}
		));
}

const containerRuntimes = ['docker', 'wslc'] as const;
type ContainerRuntime = typeof containerRuntimes[number];

function getContainerRuntime(): ContainerRuntime {
	const runtime = workspace.getConfiguration('cornifer').containerRuntime;
	return containerRuntimes.includes(runtime) ? runtime : 'docker';
}

function hasContainerRuntime(runtime: ContainerRuntime) {
	try {
		cp.execSync(`${runtime} --version`, { stdio: 'ignore' });
		return true;
	} catch (e) {
		return false;
	}
}

function hasContainerImage(runtime: ContainerRuntime, imageName: string) {
	try {
		cp.execSync(`${runtime} image inspect ${imageName}`, { stdio: 'ignore' });
		return true;
	} catch (e) {
		return false;
	}
}

async function pullContainerImage(runtime: ContainerRuntime, imageName: string): Promise<boolean> {
	return window.withProgress(
		{
			location: ProgressLocation.Notification,
			title: 'Cornifer',
			cancellable: false
		},
		(progress) => {
			progress.report({ message: `Pulling ${imageName}…` });
			return new Promise<boolean>(resolve => {
			cp.exec(`${runtime} pull ${imageName}`, (error) => resolve(!error));
			});
		}
	);
}

function getAvailablePort(): Promise<number> {
	return new Promise((resolve, reject) => {
		portfinder.getPort((error: any, port: any) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(port);
		});
	});
}

function createRandomString() {
	var text = "cornifer_";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

async function waitAndOpenPreview(previewUrl: string, token: CancellationToken) {
	await window.withProgress(
		{
			location: ProgressLocation.Notification,
			title: 'Cornifer',
			cancellable: false
		},
		async (progress: Progress<{ message: string }>, _token: CancellationToken) => {
			progress.report({ message: 'Starting container…' });
			const ready = await pollUntilReady(previewUrl, progress, token);
			if (ready) {
				await openPreviewToSide(previewUrl);
			}
		}
	);
}

async function pollUntilReady(url: string, progress: Progress<{ message: string }>, token: CancellationToken): Promise<boolean> {
	const maxAttempts = 60;
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		if (token.isCancellationRequested) {
			return false;
		}

		const status = await probeStatus(url);
		if (status !== undefined && status < 400) {
			return true;
		}

		progress.report({ message: `Spinning up your architecture canvas… (${attempt}/${maxAttempts})` });
		await delay(1000);
	}

	return false;
}

function probeStatus(url: string): Promise<number | undefined> {
	return new Promise(resolve => {
		const req = http.get(url, { timeout: 1000 }, res => {
			resolve(res.statusCode);
			res.resume();
		});

		req.on('error', () => resolve(undefined));
		req.on('timeout', () => { req.destroy(); resolve(undefined); });
	});
}

function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function openPreviewToSide(previewUrl: string) {
	if (window.tabGroups.all.length === 1) {
		await commands.executeCommand('workbench.action.newGroupRight');
	}
	await commands.executeCommand('workbench.action.focusRightGroup');
	await commands.executeCommand('simpleBrowser.show', previewUrl);
}