import fetch from "isomorphic-unfetch";

import StoryIds from "./types/StoryIds";
import StoriesResponse from "./types/StoriesResponse";

const MAX_STORIES_TO_FETCH = 30;

export default async function(
  input: RequestInfo,
  init?: RequestInit
): Promise<StoriesResponse> {
  const inputUrl = typeof input === "string" ? new URL(input) : undefined;
  const fetchOffset = Number(inputUrl?.searchParams.get("offset")) || 0;
  const fetchCount =
    Number(inputUrl?.searchParams.get("count")) || MAX_STORIES_TO_FETCH;

  /**
   * The HN API does not support any offset, so we always fetch everything, and just
   * offset from the ID provided.
   */
  const res = await fetch(input, init);
  const storiesResponse: StoryIds = await res.json();

  /**
   * We map these to indices here so that we can render item numbers
   * in the view properly.
   */
  const storiesResponseWithIndices = storiesResponse.map((storyId, index) => ({
    storyId,
    index
  }));

  /**
   * Get all values in the response that have a lower storyId than the provided offset.
   */
  const storiesOffset =
    fetchOffset == 0 // The first time offset is 0
      ? storiesResponseWithIndices
      : storiesResponseWithIndices.filter(
          ({ storyId }) => storyId < fetchOffset - 1
        );

  /**
   * Limit it by fetchCount
   */
  const storiesOffsetAndLimited = storiesOffset.slice(0, fetchCount);

  return Promise.resolve(storiesOffsetAndLimited);
}
