import useSWR from "swr";
import fetch from "../fetch";
import StoryParameters from "../types/StoryParameters";

interface StoryProps {
  itemId: number;
}

const Story: React.FC<StoryProps> = ({ itemId }) => {
  const { data, error } = useSWR<StoryParameters>(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`,
    fetch
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>...</div>;
  return (
    <div>
      {itemId} {data.by} <a href={data.url}>{data.title}</a>
    </div>
  );
};

export default Story;
