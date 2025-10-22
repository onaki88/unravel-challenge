import { RoomListingView } from "@/views";
import { AppHeader } from "@/components";

export default function App() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-26">
        <RoomListingView />
      </main>
    </>
  );
}
