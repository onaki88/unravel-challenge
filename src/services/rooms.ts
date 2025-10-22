import { Room, Media } from "@/types";

export function mapRawToRooms(raw: any): Room[] {
  let rooms: Room[] = [];

  raw.rooms_by_serial_no[0].rooms.forEach((r: any) => {
    r.variants.forEach((v: any) => {
      let media: Media = {};
      if (r.properties.video_url) {
        Object.assign(media, { video_url: r.properties.video_url.med });
      }

      if (r.properties.room_images) {
        Object.assign(media, {
          room_images: r.properties.room_images[0].image_urls,
        });
      }

      let room: Room = {
        id: v.variant_id,
        name: `${r.name} - ${v.name}`,
        amenities: v.display_properties.map((p: any) => p.value),
        rating: 4, // to do
        location: `${raw.hotel_details.address.city}, ${raw.hotel_details.address.country}`,
        price: v.total_price.discounted_price || v.total_price.total_price,
        currency: v.total_price.currency,
        discount: v.total_price.promo_list[0].offer_title || "",
        priceWithoutDiscount: v.total_price.total_price,
        priceInfo: v.price_info,
        media: media,
      };
      rooms.push(room);
    });
  });

  return rooms;
}

export async function loadRoomsFromJson(): Promise<Room[]> {
  try {
    const res = await fetch("/rooms.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch /rooms.json");
    const raw = await res.json();
    const mapped = mapRawToRooms(raw);
    return mapped.length ? mapped : [];
  } catch (err) {
    console.warn("Failed to fetch /rooms.json, ", err);
    return [];
  }
}

export async function mockFetchRooms(page: number, pageSize: number) {
  let ALL_ROOMS: Room[] = await loadRoomsFromJson();
  await new Promise((r) => setTimeout(r, 550));
  if (Math.random() < 0.06) throw new Error("Network hiccup. Please retry.");
  const s = page * pageSize;
  const e = Math.min(s + pageSize, ALL_ROOMS.length);
  return { data: ALL_ROOMS.slice(s, e), hasNext: e < ALL_ROOMS.length } as {
    data: Room[];
    hasNext: boolean;
  };
}
