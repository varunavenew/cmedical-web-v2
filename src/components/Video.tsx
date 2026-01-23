"use client";
import { FC, useState } from "react";
import { Image } from "./Image";

interface VideoObject {
  videoType: "file" | "youtube";
  videoFile?: {
    asset?: {
      _id?: string;
      _ref?: string;
      _type?: string;
      url?: string;
      originalFilename?: string;
      mimeType?: string;
    };
  };
  youtubeUrl?: string;
  poster?: SanityImage;
  alt?: string;
}

interface VideoProps {
  video: VideoObject;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export const Video: FC<VideoProps> = ({
  video,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  if (video.videoType === "youtube" && video.youtubeUrl) {
    const videoId = /\?v=([^&]+)/.exec(video.youtubeUrl)?.[1];
    if (!videoId) return null;

    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&loop=${loop ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&rel=0&playsinline=1`}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media; web-share"
          style={{ border: "none" }}
        />
      </div>
    );
  }

  if (video.videoType === "file" && video.videoFile?.asset?.url) {
    const videoUrl = video.videoFile.asset.url;
    const posterImage = video.poster;

    return (
      <div className={`relative w-full h-full ${className}`}>
        {showPoster && posterImage && (
          <div className="absolute inset-0 z-10">
            <Image
              image={posterImage as any}
              alt={video.alt || ""}
              className="w-full h-full"
              imageClassName="opacity-85"
            />
            {!isPlaying && (
              <button
                onClick={() => {
                  setIsPlaying(true);
                  setShowPoster(false);
                }}
                className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 hover:bg-black/30 transition-colors"
                aria-label="Play video"
              >
                <svg
                  className="w-20 h-20 text-white opacity-90"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        )}
        <video
          src={videoUrl}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          className="w-full h-full object-cover opacity-85"
          onPlay={() => {
            setIsPlaying(true);
            setShowPoster(false);
          }}
          onEnded={() => {
            if (!loop) {
              setIsPlaying(false);
              setShowPoster(true);
            }
          }}
        />
      </div>
    );
  }

  return null;
};

