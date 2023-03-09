import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useMemo } from "react";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const router = useRouter();
  const events = useMemo(() => getAllEvents(), []);
  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}
