/// <reference types="jest"/>
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render, waitFor } from "@testing-library/react";

import Story from "../../src/components/Story";
import StoryResponse from "../../src/types/StoryResponse";

import fetchStory from "../../src/fetchStory";

jest.mock("../../src/fetchStory", () => {
  return jest.fn().mockImplementation(() => {
    return { id: 1, time: 1180776429 } as StoryResponse;
  });
});

test("loads and displays greeting", async () => {
  const { getByTestId } = render(<Story itemId={2} itemIndex={1} />);

  await waitFor(() => expect(fetchStory).toBeCalledTimes(1));
  expect(getByTestId("story-1-index")).toHaveTextContent("1.");
});
