import { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface VideoPlayerProps {
  videoUrl: string | null;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset video when URL changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

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
