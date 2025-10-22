import { useCallback, useEffect, useMemo, useState } from "react";

import { cn, debounce } from "@/utils";
import { useIO } from "@/hooks";

import { Loader2, RefreshCw } from "lucide-react";

import {
  Button,
  Skeleton,
  Alert,
  AlertDescription,
  AlertTitle,
  RoomCard,
} from "@/components";

import type { Room } from "@/types";

import { mockFetchRooms } from "@/services";

const PAGE_SIZE = 16;

export const RoomListingView = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true); // dummy
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useMemo(
    () =>
      debounce(async (next: number) => {
        if (loading || !hasNext) return;
        try {
          setLoading(true);
          setError(null);
          const res = await mockFetchRooms(next, PAGE_SIZE);
          setRooms((prev) => [...prev, ...res.data]);
          setHasNext(res.hasNext);
          setPage(next + 1);
        } catch (e: any) {
          setError(e?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }, 200),
    [loading, hasNext]
  );

  useEffect(() => {
    loadPage(0);
  }, []);

  const sentinelRef = useIO(
    (e) => {
      if (e.isIntersecting && !loading && hasNext) loadPage(page);
    },
    { rootMargin: "800px" }
  );

  const retry = useCallback(() => {
    if (!loading) loadPage(page);
  }, [loadPage, page, loading]);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Couldn’t load more rooms</AlertTitle>
          <AlertDescription className="flex items-center gap-3">
            <span>{error}</span>
            <Button
              onClick={retry}
              variant="secondary"
              size="sm"
              className="gap-1"
            >
              <RefreshCw className="h-4 w-4" /> Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {rooms.map((r) => (
          <div key={r.id} className="h-full">
            <RoomCard room={r} />
          </div>
        ))}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`skeleton_${i}`}>
                <div className="card rounded-2xl">
                  <div className="p-4">
                    <div className="aspect-[3/2] w-full mb-3">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <Skeleton className="h-4 w-1/2 mt-2" />
                    <Skeleton className="h-4 w-full mt-1" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div
        ref={sentinelRef as any}
        className="flex items-center justify-center py-8"
      >
        {hasNext ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2
              className={cn("h-4 w-4 animate-spin", !loading && "hidden")}
            />
            <span>
              {loading ? "Loading more rooms…" : "Scroll to load more"}
            </span>
          </div>
        ) : (
          <div className="text-sm text-gray-500">You’ve reached the end.</div>
        )}
      </div>
    </>
  );
};
