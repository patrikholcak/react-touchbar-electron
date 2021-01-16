import { IpcRenderer } from "electron";

function log(...message: any[]) {
  console.log("\x1b[34m%s\x1b[0m", "[TouchBar debug]\x1b", ...message);
}

export function debug(...message: any[]) {
  if (process.env.TOUCHBAR_DEBUG) log(...message);
}

export function getIpcRenderer(): IpcRenderer {
  const ipcRenderer = globalThis.require?.("electron").ipcRenderer;

  if (!ipcRenderer) {
    log(
      "Couldn’t find `ipcRenderer` in this environment. Using a mock instead."
    );

    return {
      // @ts-expect-error
      on: (...args) => console.log("on", ...args),
      send: (...args) => console.log("send", ...args),
      // @ts-expect-error
      removeListener: (...args) => console.log("removeListener", ...args),
    };
  }

  return ipcRenderer;
}

/**
 * Generate an RFC 4122 compliant universally unique identifier using the web
 * crypto API
 *
 * Taken from https://gist.github.com/bentranter/ed524091170137a72c1d54d641493c1f
 */
export function uuid(): string {
  // get sixteen unsigned 8 bit random values
  var u = window.crypto.getRandomValues(new Uint8Array(16));

  // set the version bit to v4
  u[6] = (u[6] & 0x0f) | 0x40;

  // set the variant bit to "don't care" (yes, the RFC calls it that)
  u[8] = (u[8] & 0xbf) | 0x80;

  return Array.from(u)
    .map((num, i) =>
      [3, 5, 7, 9].includes(i) ? `${num.toString(16)}-` : num.toString(16)
    )
    .join("");
}
