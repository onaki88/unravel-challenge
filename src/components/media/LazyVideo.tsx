import React, { useCallback, useRef, useState } from "react";

import { cn } from "@/utils";
import { useVisibility } from "@/hooks";

import { Skeleton } from "@/components";

type LazyVideoProps = { src: string; poster?: string; className?: string };

export const LazyVideo = React.memo(function LazyVideo({
  src,
  poster,
  className,
}: LazyVideoProps) {
  const [visible, setVisible] = useState(false);
  const [mountedSrc, setMountedSrc] = useState<string | undefined>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onVisibleChange = useCallback(
    (v: boolean) => {
      setVisible(v);
      if (v && !mountedSrc) setMountedSrc(src);
      if (!videoRef.current) return;
      if (v) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    },
    [src, mountedSrc]
  );
  const visRef = useVisibility(onVisibleChange, "200px");

  return (
    <div
      ref={visRef as any}
      className={cn(
        "relative w-full overflow-hidden rounded-t-xl aspect-[3/2]",
        className
      )}
    >
      {!mountedSrc && (
        <div className="w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover rounded-t-xl",
          !mountedSrc && "hidden"
        )}
        playsInline
        muted
        loop
        preload="none"
        controls={false}
        poster={poster}
        src={mountedSrc}
      />
    </div>
  );
});
