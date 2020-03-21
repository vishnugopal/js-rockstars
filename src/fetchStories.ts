import fetch from "isomorphic-unfetch";

import StoryIds from "./types/StoryIds";

export default async function(
  input: RequestInfo,
  init?: RequestInit
): Promise<StoryIds> {
  const inputUrl = typeof input === "string" ? new URL(input) : undefined;
  const fetchOffset = Number(inputUrl?.searchParams.get("offset")) || 0;
  const fetchCount = Number(inputUrl?.searchParams.get("count")) || 100;

  console.log(fetchOffset);

  /**
   * The HN API does not support any offset, so we always fetch everything, and just
   * offset from the ID provided.
   */
  const res = await fetch(input, init);
  const storiesResponse: StoryIds = await res.json();

  /**
   * Get all values in the response that have a lower storyId than the provided offset.
   */
  const storiesOffset =
    fetchOffset == 0
      ? storiesResponse
      : storiesResponse.filter(storyId => storyId < fetchOffset - 1);

  const storiesOffsetAndLimited = storiesOffset.slice(0, fetchCount);
  console.log(storiesOffsetAndLimited[storiesOffsetAndLimited.length - 1]);
  console.log(storiesOffsetAndLimited);

  return Promise.resolve(storiesOffsetAndLimited);
}
