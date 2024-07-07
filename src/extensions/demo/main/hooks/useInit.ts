import { useRef } from "react";

import { hexToHSL } from "@/shared/utils";

export default () => {
  const inited = useRef(false);

  if (!inited.current) {
    const { primaryColor } =
      (
        window as Window & {
          _reearth_plugin_extension_init_data_?: {
            primaryColor?: string;
          };
        }
      )._reearth_plugin_extension_init_data_ ?? {};

    if (primaryColor) {
      const hslColor = hexToHSL(primaryColor);
      if (!hslColor) return;
      document.documentElement.style.setProperty("--primary", hslColor);
    }
  }

  inited.current = true;
};
