import React, { useCallback, useState } from "react";

import { cn } from "@/utils";
import { useVisibility } from "@/hooks";

import { Skeleton } from "@/components";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  srcSet?: string;
};

export const LazyImage = React.memo(function LazyImage({
  src,
  alt,
  className,
  sizes,
  srcSet,
}: LazyImageProps) {
  const [mountedSrc, setMountedSrc] = useState<string | undefined>();
  const onVisibleChange = useCallback(
    (v: boolean) => v && setMountedSrc(src),
    [src]
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
      {mountedSrc && (
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
          src={mountedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          srcSet={srcSet}
        />
      )}
    </div>
  );
});
