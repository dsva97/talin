import { app, BrowserWindow } from "electron";
import { getHtmlCmp } from ".";

const openComponent = async (
  Cmp: Function,
  props: Object = {},
  win?: BrowserWindow
) => {
  const resultCmp = getHtmlCmp(Cmp, props);

  if (props instanceof BrowserWindow) {
    win = props;
  } else {
    win =
      win ||
      new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          contextIsolation: false, // false, // <----- SHOULD BE TRUE
          nodeIntegration: true, // true // <------ SHOULD BE FALSE
        },
      });
  }

  await win.loadFile(resultCmp.path);
  resultCmp.cleanFile();
  return win;
};

export const renderComponent = async (Cmp: Function, props: Object = {}) => {
  await app.whenReady();
  const win = await openComponent(Cmp, props);
  const render = async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await openComponent(Cmp, props);
    }
  };
  app.on("activate", render);
  app.off("activate", render);
  return win;
};
