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

      if (error) return <div>failed to load</div>;
      if (!storyIds) return <div>...</div>;
      return (
        <>
          {storyIds.map(storyId => (
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

  // Implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);
  let loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const scrollObserver = useCallback(node => {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          console.log("hello");
          loadMoreButtonRef.current?.click();
        }
      });
    }).observe(node);
  }, []);
  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <>
      <div>
        <h1>Hacker News Stories</h1>
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
