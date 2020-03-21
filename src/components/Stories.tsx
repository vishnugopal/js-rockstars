import useSWR, { useSWRPages } from "swr";
import fetchStories from "../fetchStories";
import StoryIds from "../types/StoryIds";
import Story from "./Story";

const Stories = () => {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<
    number | null,
    StoryIds
  >(
    "stories",
    ({ offset, withSWR }) => {
      const { data: storyIds, error } = withSWR(
        useSWR(
          `https://hacker-news.firebaseio.com/v0/newstories.json?offset=${offset ||
            0}`,
          fetchStories
        )
      );

      if (error) return <div>failed to load</div>;
      if (!storyIds) return <div>loading...</div>;
      return (
        <>
          {storyIds.slice(0, 10).map(storyId => (
            <Story key={storyId} itemId={storyId} />
          ))}
        </>
      );
    },
    ({ data: storyIds }) => {
      return storyIds && storyIds.length
        ? storyIds[storyIds.length - 1] + 1
        : null;
    },
    []
  );

  return (
    <div>
      <h1>Pagination (offset from data)</h1>
      {pages}
      <button onClick={loadMore} disabled={isReachingEnd || isLoadingMore}>
        {isLoadingMore ? ". . ." : isReachingEnd ? "no more data" : "load more"}
      </button>
      <hr />
    </div>
  );
};

export default Stories;
