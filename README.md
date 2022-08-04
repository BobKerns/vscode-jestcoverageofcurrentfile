# JestCoverageOfCurrentFile

## What is JestCoverageOfCurrentFile

`JestCoverageOfCurrentFile` is a VS Code extension to easily get Jest coverage info for current test file.

1. focus on the test file, for example, `src/pages/no-match/index.test.js`
2. press `cmd + k` first (in windows is `ctrl + k`), and then press `j`
3. it will open a terminal and run `npm test -- "src/pages/no-match/index.test.js" "--watchAll=false" "--coverage" "--collectCoverageFrom=src/pages/no-match/index.js*"`

![demo](./demo.gif)

It saves the time of manully typing the command.

## How to install

Check [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=findxc.jestcoverageofcurrentfile) to install, or just search it in your VS Code Extensions.

## Can I custom the command

In VS Code Settings, search jestcoverageofcurrentfile and you can find 2 items.

- Jest Command: The default is "npm test". If in your package.json scripts, "jest" but not "test" means jest, set this value to "npm run jest"
- Run Command: Custom the command to run. The $testFile and $collectFrom in command will be corretly replaced. For example, npm test -- "$testFile" "--coverage" "--collectCoverageFrom=$collectFrom"
