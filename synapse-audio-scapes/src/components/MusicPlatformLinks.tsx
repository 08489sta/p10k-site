
import React from "react";
import { Button } from "@/components/ui/button";

interface MusicPlatform {
  name: string;
  url: string;
  icon: string;
}

const platforms: MusicPlatform[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/1Y8YN3x6cXmS7kLFceFyXd",
    icon: "🎧",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/ca/artist/prodigy10k/1459669522",
    icon: "🍎",
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/prodigy10k",
    icon: "☁️",
  },
];

const MusicPlatformLinks = () => {
  const handlePlatformClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-3 flex flex-col gap-2">
      <h2 className="text-white text-sm font-medium mb-2 text-center">Listen on:</h2>
      {platforms.map((platform) => (
        <Button
          key={platform.name}
          variant="ghost"
          className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white flex items-center justify-start gap-2 transition-all"
          onClick={() => handlePlatformClick(platform.url)}
        >
          <span>{platform.icon}</span>
          <span>{platform.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default MusicPlatformLinks;
