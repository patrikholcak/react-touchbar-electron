import { ipcRenderer, contextBridge } from "electron";
import { IpcEvent, TouchBarAPI } from "./types";

export const preload = () => {
  const eventTypes: string[] = Object.values(IpcEvent);

  const touchbarAPI: TouchBarAPI = {
    send(channel, ...args) {
      if (eventTypes.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    on(channel, listener) {
      if (eventTypes.includes(channel)) {
        ipcRenderer.on(channel, listener);
        // see https://github.com/electron/electron/issues/21437#issuecomment-880929111
        return () => ipcRenderer.removeListener(channel, listener);
      }
      return () => {};
    },
  };

  contextBridge.exposeInMainWorld("touchbarAPI", touchbarAPI);
};
