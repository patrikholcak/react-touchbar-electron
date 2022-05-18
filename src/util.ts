import { TouchBarAPI } from "./types";

function log(...message: any[]) {
  if (isElectron()) {
    console.log("\x1b[34m%s\x1b[0m", "[TouchBar debug]\x1b", ...message);
  }
}

export function debug(...message: any[]) {
  if (process.env.TOUCHBAR_DEBUG) log(...message);
}

export function getTouchbarAPI(): TouchBarAPI {
  const touchbarAPI =
    (globalThis as any).touchbarAPI ||
    globalThis.require?.("electron").ipcRenderer;

  if (!touchbarAPI) {
    log(
      "Couldn’t find `ipcRenderer` in this environment. Using a mock instead."
    );

    return {
      // @ts-expect-error
      on: (...args) => log("on", ...args),
      send: (...args) => log("send", ...args),
      // @ts-expect-error
      removeListener: (...args) => log("removeListener", ...args),
    };
  }

  return touchbarAPI;
}

/**
 * Check wherever this code runs inside of an electron frame or a normal browser
 *
 * Taken from: https://github.com/cheton/is-electron
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2018 Cheton Wu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @returns {Boolean}
 */
export function isElectron() {
  // Renderer process
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to false
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
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
