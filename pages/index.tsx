import { useMemo } from "react";
import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";

export default function Home() {
  const featuredEvents = useMemo(getFeaturedEvents, []);
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
