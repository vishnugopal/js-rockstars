import useSWR from "swr";
import fetch from "../fetch";
import StoryIds from "../types/StoryIds";
import Story from "./Story";

const Stories = () => {
  const { data, error } = useSWR<StoryIds>(
    "https://hacker-news.firebaseio.com/v0/newstories.json",
    fetch
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      {data.slice(0, 10).map(storyId => (
        <Story key={storyId} itemId={storyId} />
      ))}
    </>
  );
};

export default Stories;
