// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, ExtensionContext } from "vscode";

import { VueBoilerplatePanel } from "./panels/VueBoilerplatePanel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-webview-vite-vue-boilerplate" is now active!'
  );

  const showHelloWorldCommand = commands.registerCommand(
    "vscode-webview-vite-vue-boilerplate.pageShow",
    () => {
      window.showInformationMessage("Hello World from vscode-webview-vite-vue-boilerplate!");
      VueBoilerplatePanel.render(context.extensionUri);
    }
  );

  context.subscriptions.push(showHelloWorldCommand);
}

// This method is called when your extension is deactivated
export function deactivate() { }
