import React, { useMemo } from "react";

import { MapPin, BadgePercentIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardAction,
  Button,
  Badge,
  LazyVideo,
  LazyImage,
  Rating,
} from "@/components";

import { formatPrice } from "@/utils";

import type { Room } from "@/types";

type RoomCardProps = { room: Room };

export const RoomCard = React.memo(function RoomCard({ room }: RoomCardProps) {
  const mediaEl = useMemo(() => {
    if (room.media.video_url)
      return (
        <LazyVideo
          src={room.media.video_url}
          poster={room.media.room_images?.[0]}
        />
      );

    if (room.media.room_images?.length) {
      const primary = room.media.room_images[0]!;
      const srcSet = [
        `${primary} 320w`,
        `${primary} 640w`,
        `${primary} 960w`,
      ].join(", ");
      return (
        <LazyImage
          src={primary}
          alt={room.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          srcSet={srcSet}
        />
      );
    }

    return null;
  }, [room]);

  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow rounded-2xl h-full p-0">
      <a href="#room-details-page-url" title="Room Title">
        {mediaEl}
        <CardContent className="px-0">
          <CardTitle className="text-base sm:text-lg mt-4 px-4 leading-none">
            <p className="text-xs text-gray-400 font-light tracking-wide mb-2">
              {room.amenities.join(", ")}
            </p>
            <h3>{room.name}</h3>
          </CardTitle>
          <CardDescription className="flex flex-col gap-2 mt-1 px-4 pb-4">
            <Rating rating={4} size={12} />
            <div className="flex gap-1 items-center">
              <MapPin strokeWidth={1} className="w-4 h-4 text-gray-500" />
              <span className="font-normal text-xs text-gray-500">
                {room.location}
              </span>
            </div>
            <div className="flex gap-1 items-baseline">
              {room.discount !== "" && (
                <Badge className="mr-1">
                  <BadgePercentIcon />
                  {room.discount}
                </Badge>
              )}
              {/*room.discount !== "" && (
                <div className="text-xs text-gray-500">
                  from{" "}
                  <span className="line-through">
                    {formatPrice(room.priceWithoutDiscount, room.currency)}
                  </span>
                </div>
              )*/}
              <span className="text-sm text-accent font-semibold text-base">
                {formatPrice(room.price, room.currency)}
              </span>
            </div>
            <div className="mt-1">
              <p className="text-xs text-gray-400 font-light tracking-wide">
                {room.priceInfo}
              </p>
              <p className="text-xs text-gray-400 font-light tracking-wide">
                Includes taxes & fees
              </p>
            </div>
          </CardDescription>
          {/*<CardAction className="justify-self-stretch border-t border-t-border px-4 mb-4">
          <Button className="w-full mt-3">See More!</Button>
        </CardAction>*/}
        </CardContent>
      </a>
    </Card>
  );
});
