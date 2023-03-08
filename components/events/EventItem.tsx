import { Event } from "@/components/events/types";
import Link from "next/link";

export default function EventItem({ event }: { event: Event }) {
  return (
    <li>
      <Link href={`/events/${event.id}`}>
        {event.title}
      </Link>
    </li>
  );
}
