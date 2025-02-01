import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => {
          ipcRenderer.send(channel, ...args)
        },
        on: (channel: string, listener: (...args: any[]) => void) => {
          ipcRenderer.on(channel, (_, ...args) => listener(...args))
        },
        removeListener: (channel: string, listener: (...args: any[]) => void) => {
          ipcRenderer.removeListener(channel, listener)
        },
        invoke: async (channel: string, ...args: any[]) => {
          try {
            const response = await ipcRenderer.invoke(channel, ...args)
            return response
          } catch (error) {
            console.error('Error invoking IPC:', error)
            throw error
          }
        }
      }
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

//note
// Import the necessary Electron components.
// const contextBridge = require('electron').contextBridge;
// const ipcRenderer = require('electron').ipcRenderer;

// // White-listed channels.
// const ipc = {
//     'render': {
//         // From render to main.
//         'send': [
//             'play-vlc-magnet' // Channel name
//         ],
//         // From main to render.
//         'receive': [],
//         // From render to main and back again.
//         'sendReceive': []
//     }
// };

// // Exposed protected methods in the render process.
// contextBridge.exposeInMainWorld(
//     // Allowed 'ipcRenderer' methods.
//     'ipcRender', {
//         // From render to main.
//         send: (channel, args) => {
//             let validChannels = ipc.render.send;
//             if (validChannels.includes(channel)) {
//                 ipcRenderer.send(channel, args);
//             }
//         },
//         // From main to render.
//         receive: (channel, listener) => {
//             let validChannels = ipc.render.receive;
//             if (validChannels.includes(channel)) {
//                 // Deliberately strip event as it includes `sender`.
//                 ipcRenderer.on(channel, (event, ...args) => listener(...args));
//             }
//         },
//         // From render to main and back again.
//         invoke: (channel, args) => {
//             let validChannels = ipc.render.sendReceive;
//             if (validChannels.includes(channel)) {
//                 return ipcRenderer.invoke(channel, args);
//             }
//         }
//     }
// );
