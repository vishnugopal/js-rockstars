import useSWR, { useSWRPages } from "swr";
import fetchStories from "../fetchStories";
import Story from "./Story";
import { useRef, useCallback, useEffect } from "react";
import StoriesResponse from "../types/StoriesResponse";

const Stories = () => {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages<
    number | null,
    StoriesResponse
  >(
    "stories",
    ({ offset, withSWR }) => {
      const { data: storyItems, error } = withSWR(
        useSWR(
          `https://hacker-news.firebaseio.com/v0/newstories.json?offset=${offset ||
            0}`,
          fetchStories
        )
      );

      if (error) return <div>failed to load stories</div>;
      if (!storyItems) return <div>...</div>;
      return (
        <>
          {storyItems.map(({ storyId, index: storyIndex }) => (
            <Story key={storyId} itemId={storyId} itemIndex={storyIndex + 1} />
          ))}
        </>
      );
    },
    ({ data: storyItems }) => {
      return storyItems && storyItems.length
        ? storyItems[storyItems.length - 1].storyId + 1
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
      <div className="bg-orange-100 container max-w-2xl mx-auto mt-2">
        <div className="bg-orange-500 p-1 pb-2">
          <h1>Hacker News Stories</h1>
        </div>
        <div className="p-2">{pages}</div>
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
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </>
  );
};

export default Stories;
