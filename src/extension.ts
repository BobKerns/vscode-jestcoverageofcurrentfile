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
      // transform xxx.spec.ts or xxx.test.tsx to xxx.ts
      // Or __test__/xxx.[jt]sx? to xxx.[jt]s. In this case, xxx can include subdirectories.
      // test/, _test_/, __test__/, spec/, _spec_/, and __spec__/ are all recognized.
      // xxx.ts* can match xxx.ts and xxx.tsx
      const collectFrom =
        testFile.replace(
          /(\/[^\/]+)\.(?:spec|test)(\.[tj]s)x?$|\/(?:spec|test|_spec_|_test_|__spec__|__test__)(\/.+)(\.[jt]s)x?$/,
          '$1$2$3$4*' // $1$2 for the first case, $3$4 for the second case.
        )

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
