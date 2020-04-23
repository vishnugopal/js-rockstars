import useSWR from "swr";
import React from "react";
import { fromUnixTime, formatRelative } from "date-fns";

import StoryResponse from "./StoryResponse";
import fetchStory from "./fetchStory";

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
    fetchStory
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>...</div>;
  return (
    <div className="mb-2 flex flex-row" data-testid={`story-${itemIndex}`}>
      <div
        className="text-gray-600 text-sm align-top mr-2 w-8 text-right"
        data-testid={`story-${itemIndex}-index`}
      >
        {itemIndex}.
      </div>
      <div>
        <div className="flex flex-col" data-testid={`story-${itemIndex}-title`}>
          <a href={data.url}>{data.title}</a>
        </div>
        <div
          className="text-xs text-gray-500"
          data-testid={`story-${itemIndex}-author`}
        >
          by {data.by} {formattedRelativeDate(data.time)}
        </div>
      </div>
    </div>
  );
};

export default Story;
