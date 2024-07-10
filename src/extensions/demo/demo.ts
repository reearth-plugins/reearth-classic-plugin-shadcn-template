import html from "@distui/demo/main/index.html?raw";

import { GlobalThis } from "@/shared/reearthTypes";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

// Listen to message from UI
reearth.on("message", (msg: { action: string; payload?: unknown }) => {
  if (msg.action === "flyToTokyo") {
    reearth.camera.flyTo(
      {
        lat: 35.68505398711427,
        lng: 139.75584459383325,
        height: 5000,
      },
      { duration: 1 },
    );
  }
});

// Post message to UI
reearth.ui.postMessage({
  action: "__init__",
  payload: {
    primaryColor: reearth.widget?.property?.appearance?.primary_color,
  },
});
