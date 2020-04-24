import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render, waitFor } from "@testing-library/react";

import Story from "../../components/Stories/Story";
import StoryResponse from "../../components/Stories/StoryResponse";

import fetchStory from "../../components/Stories/fetchStory";

const jestTest = (test as unknown) as jest.It;
const jestExpect = (expect as unknown) as jest.Expect;

jest.mock("../../components/Stories/fetchStory", () => {
  return jest.fn().mockImplementation(() => {
    return { id: 1, time: 1180776429 } as StoryResponse;
  });
});

jestTest("loads and displays greeting", async () => {
  const { getByTestId } = render(<Story itemId={2} itemIndex={1} />);

  await waitFor(() => jestExpect(fetchStory).toBeCalledTimes(1));
  jestExpect(getByTestId("story-1-index")).toHaveTextContent("1.");
});
