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

  win.webContents.openDevTools();
  await win.loadFile(resultCmp.path);
  resultCmp.cleanFile();
};

export const renderComponent = async (Cmp: Function, props: Object = {}) => {
  await app.whenReady();
  openComponent(Cmp, props);
  const render = () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      openComponent(Cmp, props);
    }
  };
  app.on("activate", render);
  app.off("activate", render);
};
