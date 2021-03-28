import { extendTheme, ColorMode } from "@chakra-ui/react";

import colors from "./colors";
import shadows from "./shadows";

const config = {
  initialColorMode: "dark" as ColorMode,
  useSystemColorMode: false,
};

const theme = extendTheme({ config, colors, shadows });

export default theme;
