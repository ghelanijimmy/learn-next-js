import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useMemo } from "react";

export default function AllEventsPage() {
  const events = useMemo(() => getAllEvents(), []);
  return (
    <div>
      <EventsSearch />
      <EventList items={events} />
    </div>
  );
}
