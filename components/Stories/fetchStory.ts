import fetch from "isomorphic-unfetch";
import StoryResponse from "./StoryResponse";

export default async function(
  input: RequestInfo,
  init?: RequestInit
): Promise<StoryResponse> {
  const res = await fetch(input, init);
  const storyResponse: StoryResponse = await res.json();

  /**
   * If it's a Ask HN story, it won't have a url, in which case
   * we know it's a static url, so we add that in.
   */
  if (!storyResponse.url) {
    storyResponse.url = `https://news.ycombinator.com/item?id=${storyResponse.id}`;
  }

  return Promise.resolve(storyResponse);
}
