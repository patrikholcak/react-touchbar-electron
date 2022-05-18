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
      }
      return this;
    },
    removeListener(channel, listener) {
      if (eventTypes.includes(channel)) {
        ipcRenderer.removeListener(channel, listener);
      }
      return this;
    },
  };

  contextBridge.exposeInMainWorld("touchbarAPI", touchbarAPI);
};
