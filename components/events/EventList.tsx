import { Event } from "@/components/events/types";
import EventItem from "@/components/events/EventItem";
import styles from "./event-list.module.css";

export default function EventList({ items }: { items: Event[] }) {
  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem {...event} key={event.id} />
      ))}
    </ul>
  );
}
