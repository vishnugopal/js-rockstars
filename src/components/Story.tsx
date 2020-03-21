import useSWR from "swr";
import { fromUnixTime, formatRelative } from "date-fns";

import fetch from "../fetch";
import StoryResponse from "../types/StoryResponse";

interface StoryProps {
  itemId: number;
  itemIndex: number;
}

const formattedRelativeDate = (unixTimestamp: number) => {
  const date = fromUnixTime(unixTimestamp);
  return formatRelative(date, new Date());
};

const Story: React.FC<StoryProps> = ({ itemId, itemIndex }) => {
  const { data, error } = useSWR<StoryResponse>(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`,
    fetch
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>...</div>;
  return (
    <div className="mb-2 flex flex-row">
      <div className="text-gray-600 text-sm align-top mr-2">{itemIndex}.</div>
      <div>
        <div className="flex flex-col">
          <a href={data.url}>{data.title}</a>
        </div>
        <div className="text-xs text-gray-500">
          by {data.by} {formattedRelativeDate(data.time)}
        </div>
      </div>
    </div>
  );
};

export default Story;
