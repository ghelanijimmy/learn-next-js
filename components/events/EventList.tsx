import { Event } from "@/components/events/types";
import EventItem from "@/components/events/EventItem";

export default function EventList({ items }: { items: Event[] }) {
  return (
    <ul>
      {items.map((event) => (
        <li key={event.id}>
          <EventItem event={event} />
        </li>
      ))}
    </ul>
  );
}
