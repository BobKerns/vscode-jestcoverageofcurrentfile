import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('jestcoverageofcurrentfile.run', () => {
		const document = vscode.window.activeTextEditor?.document;
		if(!document) {
			return;
		}
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if(!workspaceFolder) {
			return;
		}

		const testFile = document.fileName.replace(`${workspaceFolder.uri.fsPath}/`, '');
		// transform xxx.spec.ts or xxx.test.tsx to xxx.ts*
		// xxx.ts* can match xxx.ts and xxx.tsx
		const collectFrom = testFile.replace(/\.(spec|test)(\.[tj]s)x?$/, '$2*');

		let terminal = vscode.window.terminals.find(item => item.name === 'jest-coverage' && !item.exitStatus);
		if(!terminal) {
			terminal = vscode.window.createTerminal('jest-coverage');
		}

		terminal.show();
		terminal.sendText(`npm test -- "${testFile}" "--watchAll=false" "--coverage" "--collectCoverageFrom=${collectFrom}"`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
