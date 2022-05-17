import { ipcRenderer, contextBridge } from "electron";
import { IpcEvent, IPCListenerFunction } from "./types";

export const preload = () => {
  const eventTypes: string[] = Object.values(IpcEvent);

  contextBridge.exposeInMainWorld("touchbarAPI", {
    send(channel: string, ...args: any[]) {
      if (eventTypes.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    on(channel: string, listener: IPCListenerFunction) {
      if (eventTypes.includes(channel)) {
        ipcRenderer.on(channel, listener);
        return this;
      }
    },
    removeListener(channel: string, listener: IPCListenerFunction) {
      if (eventTypes.includes(channel)) {
        ipcRenderer.removeListener(channel, listener);
        return this;
      }
    },
  });
};
