import { ipcMain } from "electron";
import { Writer } from "./components";
import { renderComponent, getListener } from "./lib";
import { ListenEmitter } from "./lib/listen/customEmitter";
import { speak } from "./util";

const listen = async (sender: (text: string) => void) => {
  const { listenFull, listenPartial } = await import("./lib/listen").then((m) =>
    m.getListener("comando")
  );

  listenFull.on("youtube", (phrase = "") => {
    speak("Open youtube " + phrase);
  });
  listenPartial.on("dictado", (phrase: string) => {
    console.log("emitiendoooo", phrase);
    sender(phrase);
  });
};

const openDictation = async (listenPartial: ListenEmitter) => {
  const win = await renderComponent(Writer, { defaultValue: "GAA" });
  win.webContents.openDevTools();

  ipcMain.handle("my-invokable-ipc", async (_event: any, ...args) => {
    const text = args[0];
    speak(text);
  });

  const sender = (text: string) => win.webContents.send("write", text);

  listenPartial.on("dictado", async (phrase: string) => {
    sender(phrase);
  });
};

const main = async () => {
  const { listenPartial } = getListener("comando");

  await openDictation(listenPartial);
};

main();
