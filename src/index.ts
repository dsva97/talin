import { ipcMain } from "electron";
import { Writer } from "./components";
import { renderComponent } from "./lib";
import { speak } from "./util";

const main = async () => {
  await renderComponent(Writer, { defaultValue: "GAA" });
  ipcMain.handle("my-invokable-ipc", async (_event: any, ...args) => {
    const text = "Mandaron: " + args[0];
    speak(text);
  });
};

main();
