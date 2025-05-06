import React, { useCallback, useRef, useState, useEffect } from "react";
import SplineScene from "./SplineScene";
import ChainSynapseOverlay from "./ChainSynapseOverlay";
import MusicPlatformLinks from "./MusicPlatformLinks";
import { toast } from "sonner";

// Updated to the working Spline scene URL
const SPLINE_SCENE_URL = "https://prod.spline.design/PB74wodAUF7e35YU/scene.splinecode";

const musicPlatforms = {
  spotify: "https://open.spotify.com/artist/1Y8YN3x6cXmS7kLFceFyXd",
  appleMusic: "https://music.apple.com/ca/artist/prodigy10k/1459669522",
  soundcloud: "https://soundcloud.com/prodigy10k"
};

const AudioScape: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDragging = useRef(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/BOOMIN ft. 347Aidan.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // Add event listeners
    audio.addEventListener('play', () => {
      console.log('Audio started playing');
      setIsPlaying(true);
    });
    
    audio.addEventListener('pause', () => {
      console.log('Audio paused');
      setIsPlaying(false);
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      toast.error('Error playing audio');
    });

    // Cleanup
    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (!hasInteracted.current) {
      hasInteracted.current = true;
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        toast.error('Error playing audio');
      });
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          toast.error('Error playing audio');
        });
      }
    }
    toast(isPlaying ? "Music paused" : "Music playing");
  };

  const handleSplineLoad = useCallback((spline: any) => {
    // Log available objects for debugging
    console.log("Spline scene loaded");
    
    // Setup event handlers for spline objects
    if (spline) {
      try {
        // Find objects by name - these names should match what's in your Spline scene
        const spotifyRecord = spline.findObjectByName("spotify_record");
        const appleMusicRecord = spline.findObjectByName("apple_record");
        const soundcloudRecord = spline.findObjectByName("soundcloud_record");
        const laptop = spline.findObjectByName("laptop");
        const speakers = spline.findObjectByName("speakers");
        const mouse = spline.findObjectByName("mouse");
        const keyboard = spline.findObjectByName("keyboard");

        console.log('Found objects:', {
          spotifyRecord: !!spotifyRecord,
          appleMusicRecord: !!appleMusicRecord,
          soundcloudRecord: !!soundcloudRecord,
          laptop: !!laptop,
          speakers: !!speakers,
          mouse: !!mouse,
          keyboard: !!keyboard
        });
        
        // Add drag start/end handlers to prevent unwanted clicks during drags
        spline.addEventListener('mousedown', () => {
          isDragging.current = true;
        });
        
        spline.addEventListener('mouseup', () => {
          isDragging.current = false;
        });
        
        if (spotifyRecord && typeof spotifyRecord.addEventListener === 'function') {
          spotifyRecord.addEventListener('click', () => {
            if (!isDragging.current) {
              window.open(musicPlatforms.spotify, '_blank');
              toast("Opening Spotify");
            }
          });
        }
        
        if (appleMusicRecord && typeof appleMusicRecord.addEventListener === 'function') {
          appleMusicRecord.addEventListener('click', () => {
            if (!isDragging.current) {
              window.open(musicPlatforms.appleMusic, '_blank');
              toast("Opening Apple Music");
            }
          });
        }
        
        if (soundcloudRecord && typeof soundcloudRecord.addEventListener === 'function') {
          soundcloudRecord.addEventListener('click', () => {
            if (!isDragging.current) {
              window.open(musicPlatforms.soundcloud, '_blank');
              toast("Opening SoundCloud");
            }
          });
        }

        // Add click handlers for audio control objects
        [laptop, speakers, mouse, keyboard].forEach(obj => {
          if (obj && typeof obj.addEventListener === 'function') {
            obj.addEventListener('click', () => {
              if (!isDragging.current) {
                togglePlayPause();
              }
            });
          }
        });
      } catch (error) {
        console.error('Error setting up Spline event handlers:', error);
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-screen bg-black">
      <button
        onClick={togglePlayPause}
        className="absolute top-4 left-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
      <SplineScene splineUrl={SPLINE_SCENE_URL} onLoad={handleSplineLoad} />
      <ChainSynapseOverlay />
      <MusicPlatformLinks />
    </div>
  );
};

export default AudioScape;
