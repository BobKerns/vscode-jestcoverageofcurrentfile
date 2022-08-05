import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'jestcoverageofcurrentfile.run',
    () => {
      const document = vscode.window.activeTextEditor?.document
      if (!document) {
        return
      }
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri)
      if (!workspaceFolder) {
        return
      }

      const testFile = document.fileName.replace(
        `${workspaceFolder.uri.fsPath}/`,
        ''
      )
      // transform xxx.spec.ts or xxx.test.tsx to xxx.ts*
      // xxx.ts* can match xxx.ts and xxx.tsx
      const collectFrom = testFile.replace(/\.(spec|test)(\.[tj]s)x?$/, '$2*')

      const terminal =
        vscode.window.terminals.find(item => item.name === 'jest-coverage') ||
        vscode.window.createTerminal('jest-coverage')

      const { jestCommand, runCommand } = vscode.workspace.getConfiguration(
        'jestcoverageofcurrentfile'
      )

      const command = runCommand
        ? runCommand
            .replace('$testFile', testFile)
            .replace('$collectFrom', collectFrom)
        : `${
            jestCommand || 'npm test'
          } -- "${testFile}" "--watchAll=false" "--coverage" "--collectCoverageFrom=${collectFrom}"`

      terminal.show()
      terminal.sendText(command)
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
