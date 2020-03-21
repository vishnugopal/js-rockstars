import useSWR, { useSWRPages } from "swr";
import fetchStories from "../fetchStories";
import StoryIds from "../types/StoryIds";
import Story from "./Story";
import { useRef, useCallback, useEffect } from "react";

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

      if (error) return <div>failed to load stories</div>;
      if (!storyIds) return <div>...</div>;
      return (
        <>
          {storyIds.map((storyId, storyIndex) => (
            <Story key={storyId} itemId={storyId} itemIndex={storyIndex + 1} />
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

  // Implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef<HTMLDivElement>(null);
  let loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            loadMoreButtonRef.current?.click();
          }
        });
      }).observe(node);
    },
    [loadMoreButtonRef]
  );
  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <>
      <div className="container max-w-lg mx-auto mt-2">
        <div className="bg-orange-500 p-1 mb-2">
          <h1>Hacker News Stories</h1>
        </div>
        {pages}
        <button
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
          ref={loadMoreButtonRef}
        >
          {isLoadingMore
            ? ". . ."
            : isReachingEnd
            ? "no more data"
            : "load more"}
        </button>
        <hr />
      </div>
      <div
        id="page-bottom-boundary"
        style={{ border: "1px solid red" }}
        ref={bottomBoundaryRef}
      ></div>
    </>
  );
};

export default Stories;
