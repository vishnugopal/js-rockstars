// src/stories/Button.stories.tsx

import * as React from "react";
import { storiesOf } from "@storybook/react";
import Story from "../components/Story";

storiesOf("Story", module).add("normal render", () => {
  return <Story itemId={12345} itemIndex={1} />;
});
