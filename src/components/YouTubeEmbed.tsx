import { FC } from "react";

export const YouTubeEmbed: FC<{ value: { url: string } }> = ({ value }) => {
  const videoId = /\?v=([^&]+)/.exec(value.url)?.[1];
  if (!videoId) return null;
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?controls=1&rel=0`}
      className="aspect-video w-full my-10 border-none border-0"
      allowFullScreen
      allow="web-share"
    />
  );
};
