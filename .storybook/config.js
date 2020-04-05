import { configure } from "@storybook/react";

import "../styles/index.css";

// automatically import all files ending in *.stories.tsx
configure(require.context("../src/stories", true, /\.stories\.tsx?$/), module);
