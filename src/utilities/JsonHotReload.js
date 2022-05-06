import { PluginOption } from "vite";

export default function JsonHotReload() {
  return {
    name: 'json-hot-reload',
    handleHotUpdate({ file, server }) {
      if (file.includes('assets') && file.endsWith('.json')) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },
  }
}
