// src/stories/Button.stories.tsx

import * as React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import Story from "../src/Stories/Story";

export default {
  title: "Story",
  decorators: [withKnobs],
};
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.

// Knobs for React props
export const normalRender = () => (
  <Story itemId={number("itemId", 12345)} itemIndex={1} />
);
