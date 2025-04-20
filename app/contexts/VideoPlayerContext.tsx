import { createContext, useContext, useState, useCallback } from 'react';

interface VideoPlayerContextType {
  currentTime: number;
  videoStartTime: string | null;
  setCurrentTime: (time: number) => void;
  setVideoStartTime: (time: string | null) => void;
  getRealWorldTime: () => Date | null;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);

export function VideoPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState<string | null>(null);

  const getRealWorldTime = useCallback(() => {
    if (!videoStartTime) return null;
    const startDate = new Date(videoStartTime);
    return new Date(startDate.getTime() + currentTime * 1000);
  }, [currentTime, videoStartTime]);

  return (
    <VideoPlayerContext.Provider
      value={{
        currentTime,
        videoStartTime,
        setCurrentTime,
        setVideoStartTime,
        getRealWorldTime,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
}
