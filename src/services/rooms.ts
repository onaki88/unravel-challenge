import { Room, Media } from "@/types";

export function mapRawToRooms(raw: any): Room[] {
  let variants: any[] = [];
  raw.rooms_by_serial_no[0].rooms.forEach((r: any) => {
    variants.push(
      r.variants.reduce((prev: any, curr: any) => {
        const variant = {
          ...curr,
          hotel_room_type_code: r.room_type_code,
          hotel_properties: r.properties,
          hotel_name: r.name,
          hotel_location: raw.hotel_details.address
            ? `${raw.hotel_details.address.city}, ${raw.hotel_details.address.country}`
            : "",
        };
        return {
          ...prev,
          ...variant,
        };
      })
    );
  });

  let rooms: Room[] = [];
  variants.forEach((r: any) => {
    let media: Media = {};
    if (r.hotel_properties.video_url) {
      Object.assign(media, { video_url: r.hotel_properties.video_url.med });
    }

    if (r.hotel_properties.room_images) {
      Object.assign(media, {
        room_images: r.hotel_properties.room_images[0].image_urls,
      });
    }

    let room: Room = {
      id: r.variant_id,
      name: r.hotel_name, //`${r.hotel_name} - ${r.name}`,
      amenities: r.display_properties.map((p: any) => p.value),
      rating: 4, // to do
      location: `${raw.hotel_details.address.city}, ${raw.hotel_details.address.country}`,
      price: r.total_price.discounted_price || r.total_price.total_price,
      currency: r.total_price.currency,
      discount: r.total_price.promo_list[0].offer_title || "",
      priceWithoutDiscount: r.total_price.total_price,
      priceInfo: r.price_info,
      media: media,
    };
    rooms.push(room);
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
