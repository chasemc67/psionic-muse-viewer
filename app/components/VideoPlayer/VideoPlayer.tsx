import { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useVideoPlayer } from '~/contexts/VideoPlayerContext';

interface VideoPlayerProps {
  videoUrl: string | null;
  videoStartTime: string | null;
}

export function VideoPlayer({ videoUrl, videoStartTime }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setCurrentTime, setVideoStartTime } = useVideoPlayer();

  // Reset video when URL changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  // Update video start time when it changes
  useEffect(() => {
    setVideoStartTime(videoStartTime);
  }, [videoStartTime, setVideoStartTime]);

  // Update current time when video time changes
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  if (!videoUrl) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Session Video</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">No video uploaded</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Session Video</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md overflow-hidden">
          <video
            ref={videoRef}
            className="w-full"
            controls
            controlsList="nodownload"
            playsInline
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
}
